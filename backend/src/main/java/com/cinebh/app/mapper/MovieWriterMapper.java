package com.cinebh.app.mapper;

import com.cinebh.app.entity.MovieWriter;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MovieWriterMapper {

    MovieWriter toDto(MovieWriter movieWriter);
}
