package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieCast;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovieCastRepository extends JpaRepository<MovieCast, UUID> {
}
