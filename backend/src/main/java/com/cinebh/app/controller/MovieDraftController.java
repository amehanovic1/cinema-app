package com.cinebh.app.controller;

import com.cinebh.app.dto.MovieDraftSummaryDto;
import com.cinebh.app.dto.PageDto;
import com.cinebh.app.service.MovieDraftService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/movie-drafts")
public class MovieDraftController {

    private final MovieDraftService movieDraftService;

    @GetMapping
    public PageDto<MovieDraftSummaryDto> getAllDrafts(
            @PageableDefault(page = 0, size = 5, sort = "updatedAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return movieDraftService.getAllDrafts(pageable);
    }

    @PostMapping("/publish")
    public ResponseEntity<Void> publish(@RequestBody List<UUID> draftIds) {
        movieDraftService.publish(draftIds);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/archive")
    public ResponseEntity<Void> archive(@RequestBody List<UUID> draftIds) {
        movieDraftService.archive(draftIds);
        return ResponseEntity.ok().build();
    }
}
