package com.cinebh.app.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class MovieDraftSummaryDto {
    private UUID id;
    private String step;
    private String title;
    private LocalDate projectionStartDate;
    private LocalDate projectionEndDate;
    private List<MovieImageDto> images;
    private List<String> venues;
}
