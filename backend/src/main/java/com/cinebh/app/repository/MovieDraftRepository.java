package com.cinebh.app.repository;

import com.cinebh.app.entity.MovieDraft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MovieDraftRepository extends JpaRepository<MovieDraft, UUID> {
}
