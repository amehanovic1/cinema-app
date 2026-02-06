package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieDraftDto;
import com.cinebh.app.entity.Movie;
import com.cinebh.app.entity.MovieDraft;
import com.cinebh.app.enums.MovieRatingSource;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MovieDraftMapper {

    ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    default MovieDraftDto toDto(MovieDraft movieDraft) {
        if (movieDraft == null) return null;

        MovieDraftDto dto = objectMapper.convertValue(movieDraft.getData(), MovieDraftDto.class);

        dto.setId(movieDraft.getId());
        dto.setStep(movieDraft.getStep().name());

        return dto;
    }

    default MovieRatingSource movieRatingDtoToMovieRating(String source) {
        return MovieRatingSource.fromString(source);
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "genres", ignore = true)
    @Mapping(target = "projections", ignore = true)
    Movie toMovie(MovieDraftDto draftDto);
}
