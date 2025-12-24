package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieWriter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovieWriterRepository extends JpaRepository<MovieWriter, UUID> {
}
