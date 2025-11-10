package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovieImageRepository extends JpaRepository<MovieImage, UUID> {
}
