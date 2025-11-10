package com.cinebh.app.mapper;

import com.cinebh.app.dto.SeatTypeResponse;
import com.cinebh.app.entity.SeatType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SeatTypeMapper {

    SeatTypeResponse toResponse(SeatType seatType);
}
