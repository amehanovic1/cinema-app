package com.cinebh.app.mapper;

import com.cinebh.app.dto.booking.BookingDto;
import com.cinebh.app.entity.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BookingMapper {

    BookingDto toDto(Booking booking);
}
