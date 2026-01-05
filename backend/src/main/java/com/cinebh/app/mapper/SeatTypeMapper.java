package com.cinebh.app.mapper;

import com.cinebh.app.dto.SeatTypeDto;
import com.cinebh.app.entity.SeatType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SeatTypeMapper {

    SeatTypeDto toDto(SeatType seatType);
}
