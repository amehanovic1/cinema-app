package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface MovieProjectionRepository extends JpaRepository<MovieProjection, UUID>, JpaSpecificationExecutor<MovieProjection> {
}
