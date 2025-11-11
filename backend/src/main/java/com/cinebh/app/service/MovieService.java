package com.cinebh.app.service;

import com.cinebh.app.dto.MovieResponse;
import com.cinebh.app.dto.PaginatedResponse;
import org.springframework.data.domain.Pageable;

public interface MovieService {

    PaginatedResponse<MovieResponse> getCurrentlyShowingMovies(Pageable pageable);

    PaginatedResponse<MovieResponse> getUpcomingMovies(Pageable pageable);
}
