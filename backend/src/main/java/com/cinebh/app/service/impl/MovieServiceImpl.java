package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.entity.Movie;
import com.cinebh.app.mapper.MovieMapper;
import com.cinebh.app.repository.MovieRepository;
import com.cinebh.app.service.MovieService;
import com.cinebh.app.specification.MovieSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import com.cinebh.app.util.PaginationUtil;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;


    @Override
    public PageDto<MovieDto> getCurrentlyShowingMovies(
            String title, UUID cityId, UUID venueId, UUID genreId,
            LocalDate date, LocalTime time, Pageable pageable) {

        boolean hasFilter = (title != null && !title.isEmpty()) ||
                cityId != null || venueId != null || genreId != null ||
                date != null || time != null;

        if(hasFilter) {
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

    private PageDto<MovieDto> mapToPaginatedResponse(Page<Movie> page) {
        return PaginationUtil.buildPaginatedResponse(page.map(movieMapper::toDto));
    }
}
