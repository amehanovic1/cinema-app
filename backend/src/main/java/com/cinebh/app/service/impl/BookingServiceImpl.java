package com.cinebh.app.service.impl;

import com.cinebh.app.dto.booking.BookingRequestDto;
import com.cinebh.app.dto.booking.BookingResponseDto;
import com.cinebh.app.entity.*;
import com.cinebh.app.enums.BookingStatus;
import com.cinebh.app.repository.*;
import com.cinebh.app.service.BookingService;
import com.cinebh.app.service.EmailService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final TicketRepository ticketRepository;
    private final MovieProjectionRepository movieProjectionRepository;
    private final HallSeatRepository hallSeatRepository;
    private final EmailService emailService;

    @Transactional
    @Override
    public BookingResponseDto createBookingSession(User user) {
        try {
            Booking booking = new Booking();
            booking.setUser(user);
            booking.setStatus(BookingStatus.lock);
            booking.setTicketCount(0);
            booking.setExpiresAt(LocalDateTime.now().plusMinutes(5));

            Booking saved = bookingRepository.save(booking);
            return new BookingResponseDto(true, "Booking session initialized", saved.getId());
        } catch (Exception e) {
            return new BookingResponseDto(false, "Failed to start booking session", null);
        }
    }

    @Transactional
    @Override
    public BookingResponseDto updateSeatSelection(BookingRequestDto requestDto) {
        try {
            Booking booking = bookingRepository.findById(requestDto.getBookingId())
                    .orElseThrow(() -> new RuntimeException("Session not found"));

            if (booking.getExpiresAt().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Session expired");
            }

            Optional<Ticket> existingTicket = ticketRepository.findByBookingIdAndHallSeatIdAndProjectionId(requestDto.getBookingId(), requestDto.getSeatId(), requestDto.getProjectionId());

            if (existingTicket.isPresent()) {
                ticketRepository.delete(existingTicket.get());
                int newCount = booking.getTicketCount() - 1;
                booking.setTicketCount(newCount);
                bookingRepository.save(booking);
            } else {
                List<UUID> reservedSeats = ticketRepository.findAllSeatIdsByProjectionId(requestDto.getProjectionId());

                if (reservedSeats.contains(requestDto.getSeatId())) {
                    return new BookingResponseDto(false, "Seat already taken", booking.getId());
                }

                MovieProjection projection = movieProjectionRepository.findById(requestDto.getProjectionId())
                        .orElseThrow(() -> new EntityNotFoundException("Projection not found"));
                HallSeat hallSeat = hallSeatRepository.findById(requestDto.getSeatId())
                        .orElseThrow(() -> new EntityNotFoundException("Hall seat not found"));

                Ticket ticket = new Ticket();
                ticket.setBooking(booking);
                ticket.setProjection(projection);
                ticket.setHallSeat(hallSeat);
                ticketRepository.save(ticket);

                booking.setTicketCount(booking.getTicketCount() + 1);
            }
            bookingRepository.save(booking);
            return new BookingResponseDto(true, "Seat selection updated successfully", booking.getId());
        } catch (Exception e) {
            return new BookingResponseDto(false, "Failed to update seat selection", requestDto.getBookingId());
        }
    }

    @Transactional
    @Override
    public BookingResponseDto reserve(UUID bookingId) {
        try {
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Session not found"));

            booking.setStatus(BookingStatus.reserved);

            Ticket ticket = booking.getTickets().stream().findFirst()
                    .orElseThrow(() -> new RuntimeException("No tickets found for this booking"));

            MovieProjection projection = ticket.getProjection();
            booking.setExpiresAt(projection.getProjectionDate().atTime(projection.getProjectionTime()).minusHours(1));
            bookingRepository.save(booking);

            emailService.sendBookingDetailsEmail(booking);

            return new BookingResponseDto(true, "Reservation confirmed", booking.getId());
        } catch (Exception e) {
            return new BookingResponseDto(false, "Reservation failed", bookingId);
        }
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void clearExpiredBookings() {
        LocalDateTime now = LocalDateTime.now();

        log.info("Booking Cleanup Scheduler Started");
        log.info("Current Time: {}", now);

        try {
            int deletedCount = bookingRepository.deleteByExpiresAtBeforeAndStatusNot(
                    now,
                    BookingStatus.paid
            );

            if (deletedCount > 0) {
                log.info("Action: Deleted {} expired bookings.", deletedCount);
            } else {
                log.info("Action: No expired bookings found to delete.");
            }

        } catch (Exception e) {
            log.error("Error occurred during cleanup: {}", e.getMessage());
        }
        log.info("Booking Cleanup Scheduler Finished");
    }
}
