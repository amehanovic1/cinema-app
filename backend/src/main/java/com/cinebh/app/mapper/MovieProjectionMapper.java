package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.entity.MovieProjection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {MovieMapper.class})
public interface MovieProjectionMapper {

    @Mapping(source = "movie", target = "movieDto")
    MovieProjectionDto toDto(MovieProjection movieProjection);
}
