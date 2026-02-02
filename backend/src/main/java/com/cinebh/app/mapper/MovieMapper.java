package com.cinebh.app.mapper;

import com.cinebh.app.dto.GenreDto;
import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.entity.Movie;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.Comparator;

@Mapper(
        componentModel = "spring",
        uses = {
                MovieImageMapper.class,
                GenreMapper.class,
                MovieWriterMapper.class,
                MovieCastMapper.class,
                MovieRatingMapper.class,
                CinemaHallMapper.class
        })
public interface MovieMapper {

    @Mapping(target = "venues", expression = "java(movie.getProjections().stream().map(p -> p.getCinemaHall().getVenue().getName()).distinct().toList())")
    MovieDto toDto(Movie movie);

    @AfterMapping
    default void sortGenres(@MappingTarget MovieDto movieDto) {
        if (movieDto.getGenres() != null) {
            movieDto.setGenres(movieDto.getGenres().stream()
                    .sorted(Comparator.comparing(GenreDto::getName))
                    .toList());
        }
    }
}
