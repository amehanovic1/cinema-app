package com.cinebh.app.controller;

import com.cinebh.app.dto.booking.BookingCheckoutDto;
import com.cinebh.app.dto.booking.ReservationRequestDto;
import com.cinebh.app.dto.booking.BookingResponseDto;
import com.cinebh.app.entity.User;
import com.cinebh.app.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public ResponseEntity<BookingResponseDto> createBookingSession(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(bookingService.createBookingSession(currentUser));
    }

    @PostMapping("/update-seats")
    public ResponseEntity<BookingResponseDto> updateSeatSelection(@RequestBody ReservationRequestDto requestDto) {
        return ResponseEntity.ok(bookingService.updateSeatSelection(requestDto));
    }

    @PostMapping("/reserve/{bookingId}")
    public ResponseEntity<BookingResponseDto> reserve(@PathVariable UUID bookingId) {
        return ResponseEntity.ok(bookingService.reserve(bookingId));
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<BookingCheckoutDto> getBooking(@PathVariable UUID bookingId) {
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }

    @PostMapping("/pay/{bookingId}")
    public ResponseEntity<BookingResponseDto> confirmPayment(@PathVariable UUID bookingId) {
        return ResponseEntity.ok(bookingService.confirmPayment(bookingId));
    }
}
