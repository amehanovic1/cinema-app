package com.cinebh.app.controller;

import com.cinebh.app.dto.booking.BookingRequestDto;
import com.cinebh.app.dto.booking.BookingResponseDto;
import com.cinebh.app.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponseDto> createBooking(@RequestBody BookingRequestDto requestDto) {
        return bookingService.createBooking(requestDto);
    }
}
