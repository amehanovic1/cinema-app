package com.cinebh.app.mapper;

import com.cinebh.app.dto.SeatTypeDto;
import com.cinebh.app.entity.SeatType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SeatTypeMapper {

    @Mapping(target = "category", expression = "java(seatType.getCategory().getDisplayName())")
    SeatTypeDto toDto(SeatType seatType);
}
