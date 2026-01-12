package com.cinebh.app.service.impl;

import com.cinebh.app.dto.booking.BookingRequestDto;
import com.cinebh.app.dto.booking.BookingResponseDto;
import com.cinebh.app.entity.*;
import com.cinebh.app.enums.BookingStatus;
import com.cinebh.app.repository.*;
import com.cinebh.app.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final MovieProjectionRepository movieProjectionRepository;
    private final HallSeatRepository hallSeatRepository;

    @Transactional
    @Override
    public ResponseEntity<BookingResponseDto> reserve(BookingRequestDto requestDto) {
        try {
            User user = userRepository.findById(requestDto.getUserId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));

            MovieProjection movieProjection = movieProjectionRepository.findById(requestDto.getProjectionId())
                    .orElseThrow(() -> new EntityNotFoundException("Projection not found"));

            Booking newBooking = new Booking();
            newBooking.setTicketCount(requestDto.getHallSeatsId().size());
            newBooking.setStatus(BookingStatus.reserved);
            newBooking.setUser(user);

            bookingRepository.save(newBooking);

            List<Ticket> ticketList = new ArrayList<>();
            for (UUID hallSeatId : requestDto.getHallSeatsId()) {
                HallSeat hallSeat = hallSeatRepository.findById(hallSeatId)
                        .orElseThrow(() -> new EntityNotFoundException("Hall seat not found"));

                Ticket ticket = new Ticket();
                ticket.setBooking(newBooking);
                ticket.setProjection(movieProjection);
                ticket.setHallSeat(hallSeat);

                ticketList.add(ticket);
            }

            ticketRepository.saveAll(ticketList);

            return ResponseEntity.ok(
                    new BookingResponseDto(true, "Booking successfully created", newBooking.getId())
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new BookingResponseDto(false, "Booking failed", null)
            );
        }
    }
}
