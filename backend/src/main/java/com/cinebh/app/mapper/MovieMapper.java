package com.cinebh.app.mapper;

import com.cinebh.app.dto.GenreDto;
import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.entity.Movie;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.Comparator;

@Mapper(componentModel = "spring", uses = {MovieImageMapper.class, GenreMapper.class})
public interface MovieMapper {

    MovieDto toDto(Movie movie);

    @AfterMapping
    default void sortGenres(Movie movie, @MappingTarget MovieDto movieDto) {
        if (movieDto.getGenres() != null ) {
            movieDto.setGenres(movieDto.getGenres().stream()
                    .sorted(Comparator.comparing(GenreDto::getName))
                    .toList());
        }
    }
}
