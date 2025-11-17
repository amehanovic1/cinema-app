package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.mapper.MovieProjectionMapper;
import com.cinebh.app.repository.MovieProjectionRepository;
import com.cinebh.app.service.MovieProjectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MovieProjectionServiceImpl implements MovieProjectionService {

    private final MovieProjectionRepository movieProjectionRepository;
    private final MovieProjectionMapper movieProjectionMapper;

    @Override
    public List<MovieProjectionDto> getByMovieIdAndProjectionDate(UUID movieId, LocalDate projectionDate) {
        return movieProjectionRepository
                .findByMovieIdAndProjectionDate(movieId, projectionDate)
                .stream()
                .map(movieProjectionMapper::toDto)
                .toList();
    }
}
