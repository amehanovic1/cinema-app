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

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/upcoming")
    public PageDto<MovieDto> getUpcomingMovies(
            @PageableDefault(page = 0, size = 5, sort = "title", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return movieService.getUpcomingMovies(pageable);
    }

    @GetMapping("/currently-showing")
    public PageDto<MovieDto> getCurrentlyShowingMovies(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String venue,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(required = false) @DateTimeFormat (pattern = "HH:mm") LocalTime time,
            @PageableDefault(page = 0, size = 5, sort = "title", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return movieService.getCurrentlyShowingMovies(title, city, venue, genre, date, time, pageable);
    }
}
