package com.cinebh.app.service;

import com.cinebh.app.dto.booking.BookingCheckoutDto;
import com.cinebh.app.dto.booking.ReservationRequestDto;
import com.cinebh.app.dto.booking.BookingResponseDto;
import com.cinebh.app.entity.User;

import java.util.UUID;

public interface BookingService {

    BookingResponseDto createBookingSession(User currentUser);

    BookingResponseDto updateSeatSelection(ReservationRequestDto requestDto);

    BookingResponseDto reserve(UUID bookingId);

    BookingCheckoutDto getBookingById(UUID bookingId);

    BookingResponseDto confirmPayment(UUID bookingId);
}
