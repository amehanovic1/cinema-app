package com.cinebh.app.mapper;

import com.cinebh.app.dto.CityResponse;
import com.cinebh.app.entity.City;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CityMapper {

    CityResponse toResponse(City city);
}
