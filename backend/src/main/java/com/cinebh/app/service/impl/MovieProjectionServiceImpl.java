package com.cinebh.app.service.impl;

import com.cinebh.app.dto.MovieProjectionDetailsDto;
import com.cinebh.app.dto.CinemaHallDto;
import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.entity.*;
import com.cinebh.app.enums.ImageType;
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

        Movie movie = movieProjection.getMovie();
        CinemaHall cinemaHall = movieProjection.getCinemaHall();

        String posterUrl = movie.getImages().stream()
                .filter(img -> img.getType() == ImageType.poster)
                .findFirst()
                .map(MovieImage::getUrl)
                .orElse(null);


        CinemaHallDto cinemaHallDto = cinemaHallMapper.toDto(cinemaHall);

        return new MovieProjectionDetailsDto(
                movieProjection.getId(),
                movieProjection.getProjectionDate(),
                movieProjection.getProjectionTime(),
                movie.getTitle(),
                movie.getPgRating(),
                movie.getLanguage(),
                movie.getDurationInMinutes(),
                posterUrl,
                cinemaHallDto
        );
    }
}
