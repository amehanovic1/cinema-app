package com.cinebh.app.mapper;

import com.cinebh.app.dto.CityDto;
import com.cinebh.app.entity.City;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CityMapper {

    CityDto toDto(City city);
}
