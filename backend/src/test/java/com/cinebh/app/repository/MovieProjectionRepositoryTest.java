package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieProjection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase( replace = AutoConfigureTestDatabase.Replace.NONE )
public class MovieProjectionRepositoryTest {

    @Autowired
    private MovieProjectionRepository movieProjectionRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CinemaHallRepository cinemaHallRepository;

    @Test
    void testFindByMovieIdAndProjectionDate () {
        var movie = movieRepository.findAll().getFirst();
        movie.setProjectionStartDate(LocalDate.of(2025,11,20));
        movie.setProjectionEndDate(LocalDate.of(2025,11,30));
        movieRepository.save(movie);

        var cinemaHall = cinemaHallRepository.findAll().getFirst();

        var projectionDate = LocalDate.of(2025, 11, 25);
        var projectionTime = LocalTime.of(18,0);
        MovieProjection movieProjection = new MovieProjection();
        movieProjection.setMovie(movie);
        movieProjection.setProjectionDate(projectionDate);
        movieProjection.setProjectionTime(projectionTime);
        movieProjection.setCinemaHall(cinemaHall);
        movieProjectionRepository.save(movieProjection);

        var projections = movieProjectionRepository
                .findByMovieIdAndProjectionDate(movie.getId(), projectionDate);

        projections.forEach(projection -> {
            assertEquals(movie.getId(), projection.getMovie().getId());
            assertEquals(projectionDate, projection.getProjectionDate());
            assertEquals(projectionTime, projection.getProjectionTime());
        });
    }
}
