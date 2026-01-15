package com.cinebh.app.service;

import com.cinebh.app.dto.booking.BookingRequestDto;
import com.cinebh.app.dto.booking.BookingResponseDto;
import com.cinebh.app.entity.User;

import java.util.UUID;

public interface BookingService {

    BookingResponseDto createBookingSession(User currentUser);

    BookingResponseDto updateSeatSelection(BookingRequestDto requestDto);

    BookingResponseDto reserve(UUID bookingId);
}
