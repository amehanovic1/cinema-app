package com.cinebh.app.controller;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.service.MovieService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/upcoming")
    public PageDto<MovieDto> getUpcomingMovies(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) UUID cityId,
            @RequestParam(required = false) UUID venueId,
            @RequestParam(required = false) UUID genreId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @PageableDefault(page = 0, size = 5, sort = "projectionStartDate", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return movieService.getUpcomingMovies(title, cityId, venueId, genreId, startDate, endDate, pageable);
    }

    @GetMapping("/currently-showing")
    public PageDto<MovieDto> getCurrentlyShowingMovies(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) UUID cityId,
            @RequestParam(required = false) UUID venueId,
            @RequestParam(required = false) UUID genreId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) @DateTimeFormat (pattern = "HH:mm") LocalTime time,
            @PageableDefault(page = 0, size = 5, sort = "title", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return movieService.getCurrentlyShowingMovies(title, cityId, venueId, genreId, date, time, pageable);
    }
}
