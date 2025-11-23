package com.cinebh.app.service;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalTime;

public interface MovieService {

    PageDto<MovieDto> getCurrentlyShowingMovies(
            String title, String city, String venue, String genre,
            LocalDate date, LocalTime time, Pageable pageable);

    PageDto<MovieDto> getUpcomingMovies(
            String title, String city, String venue, String genre,
            LocalDate startDate, LocalDate endDate, Pageable pageable);
}
