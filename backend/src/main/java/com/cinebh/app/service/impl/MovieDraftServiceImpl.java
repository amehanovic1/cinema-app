package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieDraftDto;
import com.cinebh.app.dto.MovieDraftSummaryDto;
import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.entity.*;
import com.cinebh.app.enums.MovieDraftStep;
import com.cinebh.app.mapper.MovieDraftMapper;
import com.cinebh.app.repository.MovieDraftRepository;
import com.cinebh.app.repository.MovieRepository;
import com.cinebh.app.service.MovieDraftService;
import com.cinebh.app.util.PaginationUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MovieDraftServiceImpl implements MovieDraftService {

    private final MovieDraftRepository movieDraftRepository;
    private final MovieDraftMapper movieDraftMapper;
    private final MovieRepository movieRepository;
    private final EntityManager entityManager;

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
                        List<String> venueNames = dto.getProjections().stream()
                                .map(p -> entityManager.find(CinemaHall.class, p.getCinemaHallId()))
                                .filter(Objects::nonNull)
                                .map(hall -> hall.getVenue().getName())
                                .distinct()
                                .toList();

                        summary.setVenues(venueNames);
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
            Movie movie = prepareMovieFromDraft(id);
            movieRepository.save(movie);
            movieDraftRepository.deleteById(id);
        }
    }

    @Transactional
    @Override
    public void archive(List<UUID> draftIds) {
        if (draftIds == null || draftIds.isEmpty()) return;

        for (UUID id : draftIds) {
            Movie movie = prepareMovieFromDraft(id);
            movie.setArchivedAt(LocalDateTime.now());

            movieRepository.save(movie);
            movieDraftRepository.deleteById(id);
        }
    }

    private Movie prepareMovieFromDraft(UUID draftId) {
        MovieDraft draft = movieDraftRepository.findById(draftId)
                .orElseThrow(() -> new EntityNotFoundException("Draft not found with id"));

        if (draft.getStep() != MovieDraftStep.venues) {
            throw new IllegalStateException("Only drafts with completed venue steps can be processed.");
        }

        MovieDraftDto draftDto = movieDraftMapper.toDto(draft);

        if(draftDto.getProjections() == null || draftDto.getProjections().isEmpty()) {
            throw new IllegalStateException("At least one projection is required to publish");
        }

        for (MovieProjectionDto projectionDto : draftDto.getProjections()) {
            if (projectionDto.getCinemaHallId() == null ||
                    projectionDto.getProjectionDate() == null ||
                    projectionDto.getProjectionTime() == null) {
                throw new IllegalStateException("Each projection must have a hall, date and time");
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

        movie.setProjections(draftDto.getProjections().stream().map(dto -> {
            MovieProjection p = new MovieProjection();
            p.setProjectionDate(dto.getProjectionDate());
            p.setProjectionTime(dto.getProjectionTime());
            p.setMovie(movie);
            p.setCinemaHall(entityManager.getReference(CinemaHall.class, dto.getCinemaHallId()));
            return p;
        }).collect(Collectors.toSet()));

        return movie;
    }
}
