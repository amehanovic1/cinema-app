package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieDto;
import com.cinebh.app.entity.Movie;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {MovieImageMapper.class, GenreMapper.class})
public interface MovieMapper {

    MovieDto toDto(Movie movie);
}
