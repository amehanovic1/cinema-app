package com.cinebh.app.service;

import com.cinebh.app.dto.MovieDraftSummaryDto;
import com.cinebh.app.dto.PageDto;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface MovieDraftService {

    PageDto<MovieDraftSummaryDto> getAllDrafts(Pageable pageable);

    void publish(List<UUID> draftIds);

    void archive(List<UUID> draftIds);
}
