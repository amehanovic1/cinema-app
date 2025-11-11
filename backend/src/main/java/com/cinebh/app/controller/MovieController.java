package com.cinebh.app.controller;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.service.impl.MovieServiceImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieServiceImpl movieService;

    public MovieController(MovieServiceImpl movieServiceImpl) {
        this.movieService = movieServiceImpl;
    }

    @GetMapping("/upcoming")
    public PageDto<MovieDto> getUpcomingMovies(
            @PageableDefault(page = 0, size = 5, sort = "title", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return movieService.getUpcomingMovies(pageable);
    }

    @GetMapping("/currently-showing")
    public PageDto<MovieDto> getCurrentlyShowingMovies(
            @PageableDefault(page = 0, size = 5, sort = "title", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return movieService.getCurrentlyShowingMovies(pageable);
    }
}
