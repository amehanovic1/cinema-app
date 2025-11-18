package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieImageDto;
import com.cinebh.app.entity.MovieImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MovieImageMapper {

    MovieImageDto toDto(MovieImage movieImage);
}
