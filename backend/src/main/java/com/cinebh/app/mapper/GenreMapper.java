package com.cinebh.app.mapper;

import com.cinebh.app.dto.GenreDto;
import com.cinebh.app.entity.Genre;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GenreMapper {

    GenreDto toDto(Genre genre);
}
