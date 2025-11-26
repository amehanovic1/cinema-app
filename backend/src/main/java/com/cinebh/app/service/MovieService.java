package com.cinebh.app.service;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public interface MovieService {

    PageDto<MovieDto> getCurrentlyShowingMovies(
            String title, UUID cityId, UUID venueId, UUID genreId,
            LocalDate date, LocalTime time, Pageable pageable);

    PageDto<MovieDto> getUpcomingMovies(
            String title, UUID cityId, UUID venueId, UUID genreId,
            LocalDate startDate, LocalDate endDate, Pageable pageable);
}
