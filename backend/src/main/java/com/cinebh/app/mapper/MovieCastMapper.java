package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieCastDto;
import com.cinebh.app.entity.MovieCast;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MovieCastMapper {

    MovieCastDto toDto(MovieCast movieCast);
}
