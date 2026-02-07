package com.cinebh.app.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class MovieDraftRequestDto {
    private String step;
    private Map<String, Object> data;
}
