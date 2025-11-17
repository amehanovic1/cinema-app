package com.cinebh.app.specification;

import com.cinebh.app.entity.Movie;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;

public class MovieSpecification {

    public static Specification<Movie> hasTitleLike(String title) {
        if (title == null || title.isEmpty()) return null;
        return (root, criteriaQuery,criteriaBuilder) ->
            criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Movie> hasCity(String city) {
        if (city == null || city.isEmpty()) return null;
        return (root, criteriaQuery,criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.join("projections", JoinType.LEFT)
                                .join("cinemaHall", JoinType.LEFT)
                                .join("venue", JoinType.LEFT)
                                .join("city", JoinType.LEFT)
                                .get("name"), city);
    }

    public static Specification<Movie> hasVenue(String venue) {
        if (venue == null || venue.isEmpty()) return null;
        return (root, criteriaQuery,criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.join("projections", JoinType.LEFT)
                                .join("cinemaHall", JoinType.LEFT)
                                .join("venue", JoinType.LEFT)
                                .get("name"), venue);
    }

    public static Specification<Movie> hasGenre(String genre) {
        if (genre == null || genre.isEmpty()) return null;
        return (root, criteriaQuery,criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.join("genres", JoinType.LEFT)
                                .get("name"), genre);
    }

    public static Specification<Movie> hasDate(LocalDate date) {
        if (date == null) return null;
        return (root, criteriaQuery,criteriaBuilder) ->
                criteriaBuilder.equal(
                        root.join("projections", JoinType.LEFT)
                        .get("projectionDate"), date);
    }


    public static Specification<Movie> hasTime(LocalTime time) {
        if (time == null) return null;
        return (root, criteriaQuery,criteriaBuilder) -> {
            criteriaQuery.distinct(true);
            return criteriaBuilder.equal(
                    root.join("projections", JoinType.LEFT)
                            .get("projectionTime"), time);
        };
    }

    public static Specification<Movie> isCurrentlyShowing() {
        return (root, criteriaQuery,criteriaBuilder) -> {
            LocalDate today = LocalDate.now();
            return criteriaBuilder.and(
                    criteriaBuilder.lessThanOrEqualTo(root.get("projectionStartDate"), today),
                    criteriaBuilder.greaterThanOrEqualTo(root.get("projectionEndDate"), today)
            );
        };
    }

    public static Specification<Movie> isUpcoming() {
        return (root, criteriaQuery,criteriaBuilder) -> {
            LocalDate today = LocalDate.now();
            return criteriaBuilder.greaterThan(root.get("projectionStartDate"), today);
        };
    }
}
