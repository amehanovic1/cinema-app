package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieImageResponse;
import com.cinebh.app.entity.MovieImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MovieImageMapper {

    MovieImageResponse toResponse(MovieImage movieImage);
}
