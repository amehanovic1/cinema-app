package com.cinebh.app.controller;

import com.cinebh.app.dto.CityDto;
import com.cinebh.app.service.CityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<List<CityDto>> getAllCities() {
        return ResponseEntity.ok(cityService.getAllCities());
    }
}
