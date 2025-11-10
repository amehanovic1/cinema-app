package com.cinebh.app.mapper;

import com.cinebh.app.dto.GenreResponse;
import com.cinebh.app.entity.Genre;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GenreMapper {

    GenreResponse toResponse(Genre genre);
}
