package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.entity.MovieProjection;
import com.cinebh.app.mapper.MovieProjectionMapper;
import com.cinebh.app.repository.MovieProjectionRepository;
import com.cinebh.app.service.MovieProjectionService;
import com.cinebh.app.specification.MovieProjectionSpecification;
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

    @Override
    public List<MovieProjectionDto> getProjectionsByFilter(
            UUID movieId, LocalDate projectionDate, String venue
    ) {
        Specification<MovieProjection> movieProjectionSpecification =
                MovieProjectionSpecification.getSpecification(movieId, projectionDate, venue);

        return movieProjectionRepository.findAll(movieProjectionSpecification)
                .stream()
                .map(movieProjectionMapper::toDto)
                .toList();
    }
}
