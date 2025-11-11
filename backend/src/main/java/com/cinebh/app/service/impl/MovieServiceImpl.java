package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.entity.Movie;
import com.cinebh.app.mapper.MovieMapper;
import com.cinebh.app.repository.MovieRepository;
import com.cinebh.app.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.cinebh.app.util.PaginationUtil;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;


    @Override
    public PageDto<MovieDto> getCurrentlyShowingMovies(Pageable pageable) {
        return mapToPaginatedResponse(movieRepository.findCurrentlyShowing(LocalDate.now(), pageable));
    }

    @Override
    public PageDto<MovieDto> getUpcomingMovies(Pageable pageable) {
        return mapToPaginatedResponse(movieRepository.findByProjectionStartDateAfter(LocalDate.now(), pageable));
    }

    private PageDto<MovieDto> mapToPaginatedResponse(Page<Movie> page) {
        return PaginationUtil.buildPaginatedResponse(page.map(movieMapper::toDto));
    }
}
