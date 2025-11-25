package com.cinebh.app.service.impl;

import com.cinebh.app.dto.CityDto;
import com.cinebh.app.mapper.CityMapper;
import com.cinebh.app.repository.CityRepository;
import com.cinebh.app.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    @Override
    public List<CityDto> getAllCities() {
        return cityRepository.findAll()
                .stream()
                .map(cityMapper::toDto)
                .toList();
    }
}
