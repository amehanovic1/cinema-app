package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieRatingDto;
import com.cinebh.app.entity.MovieRating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MovieRatingMapper {

    @Mapping(target = "source", expression = "java(movieRating.getSource().getDisplayName())")
    MovieRatingDto toDto(MovieRating movieRating);
}
