package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieProjectionDetailsDto;
import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.entity.*;
import com.cinebh.app.mapper.CinemaHallMapper;
import com.cinebh.app.mapper.MovieProjectionMapper;
import com.cinebh.app.repository.MovieProjectionRepository;
import com.cinebh.app.service.MovieProjectionService;
import com.cinebh.app.specification.MovieProjectionSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MovieProjectionServiceImpl implements MovieProjectionService {

    private final MovieProjectionRepository movieProjectionRepository;
    private final MovieProjectionMapper movieProjectionMapper;
    private final CinemaHallMapper cinemaHallMapper;

    @Override
    public List<MovieProjectionDto> filterMovieProjections(
            UUID movieId, LocalDate projectionDate, UUID cityId, UUID venueId
    ) {
        Specification<MovieProjection> movieProjectionSpecification =
                MovieProjectionSpecification.getSpecification(movieId, projectionDate, cityId, venueId);

        return movieProjectionRepository.findAll(movieProjectionSpecification)
                .stream()
                .map(movieProjectionMapper::toDto)
                .toList();
    }

    @Override
    public MovieProjectionDetailsDto getMovieProjection(UUID id) {
        MovieProjection movieProjection = movieProjectionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie projection not found"));

        return movieProjectionMapper.toDetailsDto(movieProjection);
    }
}
