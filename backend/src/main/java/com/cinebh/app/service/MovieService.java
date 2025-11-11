package com.cinebh.app.service;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import org.springframework.data.domain.Pageable;

public interface MovieService {

    PageDto<MovieDto> getCurrentlyShowingMovies(Pageable pageable);

    PageDto<MovieDto> getUpcomingMovies(Pageable pageable);
}
