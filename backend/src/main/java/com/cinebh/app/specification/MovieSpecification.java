package com.cinebh.app.specification;

import com.cinebh.app.entity.Movie;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class MovieSpecification {

    public static Specification<Movie> filterCurrentlyShowing(LocalDate date, LocalTime time) {
        return new Specification<Movie>() {
            @Override
            public Predicate toPredicate(Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                criteriaBuilder.conjunction();
                List<Predicate> predicates = new ArrayList<>();

                var projectionJoin = root.join("projections", JoinType.INNER);
                LocalDate today = LocalDate.now();

                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("projectionStartDate"), today));
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("projectionEndDate"), today));

                if (date != null) {
                    predicates.add(criteriaBuilder.equal(projectionJoin.get("projectionDate"), date));
                }

                if (time != null) {
                    predicates.add(criteriaBuilder.equal(projectionJoin.get("projectionTime"), time));
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        };
    }


    public static Specification<Movie> filterUpcoming(LocalDate startDate, LocalDate endDate) {
        return new Specification<Movie>() {
            @Override
            public Predicate toPredicate(Root<Movie> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);
                criteriaBuilder.conjunction();

                List<Predicate> predicates = new ArrayList<>();
                LocalDate today = LocalDate.now();

                predicates.add(criteriaBuilder.greaterThan(root.get("projectionStartDate"), today));
                if (startDate != null && endDate != null) {
                    predicates.add(criteriaBuilder.between(
                                    root.get("projectionStartDate"), startDate, endDate)
                    );
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        };
    }

    public static Specification<Movie> filterByTitleCityVenueGenre(
            String title,
            String city,
            String venue,
            String genre
    ) {
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

                if (city != null && !city.isEmpty()) {
                    predicates.add(criteriaBuilder.equal(cityJoin.get("name"), city));
                }

                if (venue != null && !venue.isEmpty()) {
                    predicates.add(criteriaBuilder.equal(venueJoin.get("name"), venue));
                }

                if (genre != null && !genre.isEmpty()) {
                    predicates.add(criteriaBuilder.equal(
                            root.join("genres", JoinType.INNER).get("name"), genre));
                }

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        };
    }
}
