package com.cinebh.app.service;

import com.cinebh.app.dto.booking.BookingRequestDto;
import com.cinebh.app.dto.booking.BookingResponseDto;
import org.springframework.http.ResponseEntity;

public interface BookingService {

    ResponseEntity<BookingResponseDto> createBooking(BookingRequestDto requestDto);
}
