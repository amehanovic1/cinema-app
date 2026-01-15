package com.cinebh.app.specification;

import com.cinebh.app.entity.MovieProjection;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class MovieProjectionSpecification {

    public static Specification<MovieProjection> getSpecification(
            UUID movieId,
            LocalDate date,
            UUID cityId,
            UUID venueId
    )
    {
        return new Specification<MovieProjection>() {
            @Override
            public Predicate toPredicate(Root<MovieProjection> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                query.distinct(true);

                List<Predicate> predicates = new ArrayList<>();

                var hallJoin = root.join("cinemaHall", JoinType.INNER);
                var venueJoin = hallJoin.join("venue", JoinType.INNER);
                var cityJoin = venueJoin.join("city", JoinType.INNER);

                if(movieId != null) {
                    predicates.add(criteriaBuilder.equal(root.get("movie").get("id"), movieId));
                }

                LocalDate filterDate = (date != null) ? date : LocalDate.now();
                predicates.add(criteriaBuilder.equal(root.get("projectionDate"), filterDate));

                if (filterDate.equals(LocalDate.now())) {
                    predicates.add(criteriaBuilder.greaterThan(
                            root.get("projectionTime"), LocalTime.now()));
                }

                if(cityId != null) {
                    predicates.add(criteriaBuilder.equal(
                            cityJoin.get("id"), cityId));
                }

                if(venueId != null) {
                    predicates.add(criteriaBuilder.equal(
                            venueJoin.get("id"), venueId));
                }

                query.orderBy(criteriaBuilder.asc(root.get("projectionTime")));

                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }
        };
    }
}
