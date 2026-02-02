package com.cinebh.app.specification;

import com.cinebh.app.entity.Movie;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MovieSpecification {

    public static Specification<Movie> isCurrentlyShowing() {
        return (root, criteriaQuery,criteriaBuilder) -> {
            LocalDate today = LocalDate.now();
            return criteriaBuilder.and(
                    criteriaBuilder.isNull(
                            root.get("archivedAt")),
                    criteriaBuilder.lessThanOrEqualTo(
                            root.get("projectionStartDate"), today),
                    criteriaBuilder.greaterThanOrEqualTo(
                            root.get("projectionEndDate"), today)
            );
        };
    }

    public static Specification<Movie> currentSpecification(
            String title,
            UUID cityId,
            UUID venueId,
            UUID genreId,
            LocalDate date,
            LocalTime time
    )
    {
        return new Specification<Movie>() {
            @Override
            public Predicate toPredicate(Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                criteriaBuilder.conjunction();
                List<Predicate> predicates = new ArrayList<>();

                var projectionJoin = root.join("projections", JoinType.INNER);
                var hallJoin = projectionJoin.join("cinemaHall", JoinType.INNER);
                var venueJoin = hallJoin.join("venue", JoinType.INNER);
                var cityJoin = venueJoin.join("city", JoinType.INNER);

                if (title != null && !title.isEmpty()) {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
                }

                if(cityId != null) {
                    predicates.add(criteriaBuilder.equal(cityJoin.get("id"), cityId));
                }

                if(venueId != null) {
                    predicates.add(criteriaBuilder.equal(venueJoin.get("id"), venueId));
                }

                if(genreId != null) {
                    predicates.add(criteriaBuilder.equal(
                            root.join("genres", JoinType.INNER).get("id"), genreId));
                }

                LocalDate filterDate = (date != null) ? date : LocalDate.now();
                predicates.add(criteriaBuilder.equal(projectionJoin.get("projectionDate"), filterDate));

                if (filterDate.equals(LocalDate.now())) {
                    predicates.add(criteriaBuilder.greaterThan(
                            projectionJoin.get("projectionTime"),
                            LocalTime.now()
                    ));
                }

                if(time != null) {
                    predicates.add(criteriaBuilder.equal(projectionJoin.get("projectionTime"), time));
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        };
    }

    public static Specification<Movie> upcomingSpecification(
            String title,
            UUID cityId,
            UUID venueId,
            UUID genreId,
            LocalDate startDate,
            LocalDate endDate
    )
    {
        return new Specification<Movie>() {
            @Override
            public Predicate toPredicate(Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                criteriaBuilder.conjunction();
                List<Predicate> predicates = new ArrayList<>();

                predicates.add(criteriaBuilder.isNull(root.get("archivedAt")));

                var projectionJoin = root.join("projections", JoinType.INNER);
                var hallJoin = projectionJoin.join("cinemaHall", JoinType.INNER);
                var venueJoin = hallJoin.join("venue", JoinType.INNER);
                var cityJoin = venueJoin.join("city", JoinType.INNER);

                if (title != null && !title.isEmpty()) {
                    predicates.add(criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%"));
                }

                if(cityId != null) {
                    predicates.add(criteriaBuilder.equal(cityJoin.get("id"), cityId));
                }

                if(venueId != null) {
                    predicates.add(criteriaBuilder.equal(venueJoin.get("id"), venueId));
                }

                if(genreId != null) {
                    predicates.add(criteriaBuilder.equal(
                            root.join("genres", JoinType.INNER)
                                    .get("id"), genreId));
                }

                LocalDate today = LocalDate.now();
                predicates.add(criteriaBuilder.greaterThan(root.get("projectionStartDate"), today));
                if(startDate != null && endDate != null) {
                    predicates.add(
                            criteriaBuilder.between(root.get("projectionStartDate"), startDate,  endDate)
                    );
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        };
    }

    public static Specification<Movie> isArchived() {
        return (root, criteriaQuery,criteriaBuilder) -> {
            return criteriaBuilder.and(
                    criteriaBuilder.isNotNull(root.get("archivedAt"))
            );
        };
    }
}
