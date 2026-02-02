package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.entity.Genre;
import com.cinebh.app.entity.Movie;
import com.cinebh.app.entity.MovieDraft;
import com.cinebh.app.entity.User;
import com.cinebh.app.enums.MovieDraftStep;
import com.cinebh.app.mapper.MovieMapper;
import com.cinebh.app.repository.MovieDraftRepository;
import com.cinebh.app.repository.MovieRepository;
import com.cinebh.app.service.MovieService;
import com.cinebh.app.specification.MovieSpecification;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.cinebh.app.util.PaginationUtil;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final ObjectMapper objectMapper;
    private final MovieDraftRepository movieDraftRepository;

    @Override
    public PageDto<MovieDto> getCurrentlyShowingMovies(
            String title, UUID cityId, UUID venueId, UUID genreId,
            LocalDate date, LocalTime time, Pageable pageable) {

        boolean hasFilter = (title != null && !title.isEmpty()) ||
                cityId != null || venueId != null || genreId != null ||
                date != null || time != null;

        if (hasFilter) {
            Specification<Movie> movieSpecification = MovieSpecification.isCurrentlyShowing()
                    .and(MovieSpecification.currentSpecification(title, cityId, venueId, genreId, date, time));
            return mapToPaginatedResponse(movieRepository.findAll(movieSpecification, pageable));
        }

        return mapToPaginatedResponse(
                movieRepository.findAll(MovieSpecification.isCurrentlyShowing(), pageable));
    }

    @Override
    public PageDto<MovieDto> getUpcomingMovies(
            String title, UUID cityId, UUID venueId, UUID genreId,
            LocalDate startDate, LocalDate endDate, Pageable pageable) {

        Specification<Movie> movieSpecification =
                MovieSpecification.upcomingSpecification(title, cityId, venueId, genreId, startDate, endDate);

        return mapToPaginatedResponse(movieRepository.findAll(movieSpecification, pageable));
    }

    @Override
    public MovieDto getMovieDetails(UUID movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found"));

        return movieMapper.toDto(movie);
    }

    @Override
    public PageDto<MovieDto> getArchivedMovies(Pageable pageable) {
        return mapToPaginatedResponse(
                movieRepository.findAll(MovieSpecification.isArchived(), pageable));
    }

    @Transactional
    @Override
    public void archive(List<UUID> movieIds) {
        if (movieIds == null || movieIds.isEmpty()) return;

        for (UUID id : movieIds) {
            Movie movie = movieRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Movie not found"));
            movie.setArchivedAt(LocalDateTime.now());
            movieRepository.save(movie);
        }
    }

    @Transactional
    @Override
    public void moveToDrafts(List<UUID> movieIds) {
        if (movieIds == null || movieIds.isEmpty()) return;

        for (UUID id : movieIds) {
            MovieDraft draft = prepareDraftFromMovie(id);
            movieDraftRepository.save(draft);

            movieRepository.deleteById(id);
        }
    }

    private MovieDraft prepareDraftFromMovie(UUID movieId) {
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found"));

        MovieDto movieDto = movieMapper.toDto(movie);
        Map<String, Object> data = objectMapper.convertValue(movieDto, new TypeReference<>() {});

        if (movie.getGenres() != null) {
            data.put("genres", movie.getGenres().stream()
                    .map(Genre::getId)
                    .toList());
        }

        if (movie.getProjections() != null) {
            var projections = movie.getProjections().stream().map(p -> {
                Map<String, Object> proj = new HashMap<>();
                proj.put("projectionDate", p.getProjectionDate().toString());
                proj.put("projectionTime", p.getProjectionTime().toString());
                proj.put("cinemaHallId", p.getCinemaHall().getId());
                return proj;
            }).toList();
            data.put("projections", projections);
        }

        MovieDraft draft = new MovieDraft();
        draft.setData(data);
        draft.setStep(MovieDraftStep.venues);
        draft.setCreatedAt(LocalDateTime.now());
        draft.setUpdatedAt(LocalDateTime.now());
        draft.setAdmin(getCurrentUser());

        return draft;
    }

    private User getCurrentUser() {
        return (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
    }

    private PageDto<MovieDto> mapToPaginatedResponse(Page<Movie> page) {
        return PaginationUtil.buildPaginatedResponse(page.map(movieMapper::toDto));
    }
}
