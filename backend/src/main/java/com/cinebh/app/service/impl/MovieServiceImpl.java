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

@RequiredArgsConstructor
@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;


    @Override
    public PageDto<MovieDto> getCurrentlyShowingMovies(
            String title, String city, String venue, String genre,
            LocalDate date, LocalTime time, Pageable pageable) {

        Specification<Movie> movieSpecification = MovieSpecification.filterCurrentlyShowing(date, time)
                .and(MovieSpecification.filterByTitleCityVenueGenre(title, city, venue, genre));

        return mapToPaginatedResponse(movieRepository.findAll(movieSpecification, pageable));
    }

    @Override
    public PageDto<MovieDto> getUpcomingMovies(
            String title, String city, String venue, String genre,
            LocalDate startDate, LocalDate endDate, Pageable pageable) {

        Specification<Movie> movieSpecification = MovieSpecification.filterUpcoming(startDate, endDate)
                        .and(MovieSpecification.filterByTitleCityVenueGenre(title, city, venue, genre));
        ;
        return mapToPaginatedResponse(movieRepository.findAll(movieSpecification, pageable));
    }

    private PageDto<MovieDto> mapToPaginatedResponse(Page<Movie> page) {
        return PaginationUtil.buildPaginatedResponse(page.map(movieMapper::toDto));
    }
}
