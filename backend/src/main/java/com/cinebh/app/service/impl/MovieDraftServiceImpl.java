package com.cinebh.app.service.impl;

import com.cinebh.app.dto.*;
import com.cinebh.app.entity.*;
import com.cinebh.app.enums.MovieDraftStep;
import com.cinebh.app.mapper.MovieDraftMapper;
import com.cinebh.app.repository.CinemaHallRepository;
import com.cinebh.app.repository.MovieDraftRepository;
import com.cinebh.app.repository.MovieRepository;
import com.cinebh.app.repository.VenueRepository;
import com.cinebh.app.service.MovieDraftService;
import com.cinebh.app.util.PaginationUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class MovieDraftServiceImpl implements MovieDraftService {

    private final MovieDraftRepository movieDraftRepository;
    private final MovieDraftMapper movieDraftMapper;
    private final MovieRepository movieRepository;
    private final EntityManager entityManager;
    private final CinemaHallRepository cinemaHallRepository;
    private final VenueRepository venueRepository;

    @Override
    public PageDto<MovieDraftSummaryDto> getAllDrafts(Pageable pageable) {
        return PaginationUtil.buildPaginatedResponse(
                movieDraftRepository.findAll(pageable).map(draft -> {
                    MovieDraftDto dto = movieDraftMapper.toDto(draft);

                    MovieDraftSummaryDto summary = new MovieDraftSummaryDto();
                    summary.setId(draft.getId());
                    summary.setStep(draft.getStep().name());
                    summary.setTitle(dto.getTitle());
                    summary.setProjectionStartDate(dto.getProjectionStartDate());
                    summary.setProjectionEndDate(dto.getProjectionEndDate());
                    summary.setImages(dto.getImages());
                    if (dto.getProjections() != null) {
                        var venueIds = dto.getProjections().stream()
                                .map(MovieProjectionDto::getVenueId)
                                .filter(Objects::nonNull)
                                .distinct()
                                .toList();

                        summary.setVenues(venueRepository.findAllById(venueIds).stream()
                                .map(Venue::getName)
                                .toList());
                    }
                    return summary;
                })
        );
    }

    @Transactional
    @Override
    public void publish(List<UUID> draftIds) {
        if (draftIds == null || draftIds.isEmpty()) return;

        for (UUID id : draftIds) {
            movieDraftRepository.findById(id).ifPresent(draft -> {
                try {
                    Movie movie = prepareMovieFromDraft(draft);
                    movieRepository.save(movie);
                    movieDraftRepository.delete(draft);
                } catch (Exception e) {
                    log.error("Failed to publish draft with ID {}: {}", id, e.getMessage());
                }
            });
        }
    }

    @Transactional
    @Override
    public void archive(List<UUID> draftIds) {
        if (draftIds == null || draftIds.isEmpty()) return;

        for (UUID id : draftIds) {
            movieDraftRepository.findById(id).ifPresent(draft -> {
                try {
                    Movie movie = prepareMovieFromDraft(draft);
                    movie.setArchivedAt(LocalDateTime.now());
                    movieRepository.save(movie);
                    movieDraftRepository.delete(draft);
                } catch (Exception e) {
                    log.error("Failed to archive draft with ID {}: {}", id, e.getMessage());
                }
            });
        }
    }

    @Transactional
    @Override
    public void save(MovieDraftRequestDto draftDto) {
        User user = getCurrentUser();

        MovieDraft movieDraft = new MovieDraft();

        movieDraft.setStep(MovieDraftStep.valueOf(draftDto.getStep()));
        movieDraft.setData(draftDto.getData());
        movieDraft.setUser(user);

        movieDraftRepository.save(movieDraft);
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }

    private Movie prepareMovieFromDraft(MovieDraft draft) {
        if (draft.getStep() != MovieDraftStep.venues) {
            throw new IllegalStateException("Only drafts with completed venue steps can be processed.");
        }

        MovieDraftDto draftDto = movieDraftMapper.toDto(draft);

        if (draftDto.getProjections() == null || draftDto.getProjections().isEmpty()) {
            throw new IllegalStateException("At least one projection is required to publish");
        }

        for (MovieProjectionDto projectionDto : draftDto.getProjections()) {
            if (projectionDto.getVenueId() == null || projectionDto.getProjectionTime() == null) {
                throw new IllegalStateException("Each projection must have a venue and time");
            }
        }

        Movie movie = movieDraftMapper.toMovie(draftDto);
        movie.setId(null);

        movie.setGenres(draftDto.getGenres().stream()
                .map(id -> entityManager.getReference(Genre.class, id))
                .collect(Collectors.toSet()));

        movie.getCast().forEach(c -> {
            c.setId(null);
            c.setMovie(movie);
        });
        movie.getImages().forEach(i -> {
            i.setId(null);
            i.setMovie(movie);
        });
        movie.getWriters().forEach(w -> {
            w.setId(null);
            w.setMovie(movie);
        });

        if (movie.getRatings() != null) {
            movie.getRatings().forEach(r -> {
                r.setId(null);
                r.setMovie(movie);
            });
        }

        if (draftDto.getProjections() != null ) {

            Set<MovieProjection> generatedProjections = new HashSet<>();
            LocalDate startDate = draftDto.getProjectionStartDate();
            LocalDate endDate = draftDto.getProjectionEndDate();

            for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                for (MovieProjectionDto projDto : draftDto.getProjections()) {
                    MovieProjection p = new MovieProjection();
                    p.setProjectionDate(date);
                    p.setProjectionTime(projDto.getProjectionTime());
                    p.setMovie(movie);

                    UUID hallId = cinemaHallRepository.findFirstByVenueIdOrderByNameAsc(projDto.getVenueId())
                            .map(CinemaHall::getId)
                            .orElse(null);

                    if (hallId != null) {
                        p.setCinemaHall(entityManager.getReference(CinemaHall.class, hallId));
                        generatedProjections.add(p);
                    }
                }
            }
            movie.setProjections(generatedProjections);
        }

        return movie;
    }
}
