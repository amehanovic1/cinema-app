package com.cinebh.app.mapper;

import com.cinebh.app.dto.MovieProjectionDetailsDto;
import com.cinebh.app.dto.MovieProjectionDto;
import com.cinebh.app.entity.Movie;
import com.cinebh.app.entity.MovieImage;
import com.cinebh.app.entity.MovieProjection;
import com.cinebh.app.enums.ImageType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring", uses = {MovieMapper.class})
public interface MovieProjectionMapper {

    @Mapping(source = "movie", target = "movieDto")
    MovieProjectionDto toDto(MovieProjection movieProjection);

    @Mapping(target = "title", source = "movie.title")
    @Mapping(target = "pgRating", source = "movie.pgRating")
    @Mapping(target = "language", source = "movie.language")
    @Mapping(target = "durationInMinutes", source = "movie.durationInMinutes")
    @Mapping(target = "cinemaHall", source = "cinemaHall")
    @Mapping(target = "posterUrl", source = "movie", qualifiedByName = "extractPosterUrl")
    MovieProjectionDetailsDto toDetailsDto(MovieProjection movieProjection);

    @Named("extractPosterUrl")
    default String extractPosterUrl(Movie movie) {
        if (movie == null || movie.getImages() == null) return null;
        return movie.getImages().stream()
                .filter(img -> img != null && ImageType.poster.equals(img.getType()))
                .map(MovieImage::getUrl)
                .findFirst()
                .orElse(null);
    }
}
