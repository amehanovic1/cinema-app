package com.cinebh.app.service.impl;

import com.cinebh.app.dto.HallSeatDto;
import com.cinebh.app.dto.MovieProjectionDetailsDto;
import com.cinebh.app.dto.booking.BookingCheckoutDto;
import com.cinebh.app.service.BookingService;
import com.cinebh.app.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {

    private final BookingService bookingService;

    @Override
    public Map<String, String> createPaymentIntent(UUID bookingId) {
        try {
            BookingCheckoutDto bookingDetails = bookingService.getBookingById(bookingId);
            MovieProjectionDetailsDto movie = bookingDetails.getProjectionDetails();

            String seats = bookingDetails.getSelectedSeats().stream()
                    .map(HallSeatDto::getSeatCode)
                    .collect(Collectors.joining(", "));

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(Math.round(bookingDetails.getTotalPrice() * 100))
                    .setCurrency("bam")
                    .setDescription("Movie: " + movie.getTitle())
                    .putMetadata("bookingId", bookingId.toString())
                    .putMetadata("movie", movie.getTitle())
                    .putMetadata("projection", movie.getProjectionDate() + " " + movie.getProjectionTime())
                    .putMetadata("seats", seats)
                    .putMetadata("hall", movie.getCinemaHall().getName())
                    .build();

            PaymentIntent intent = PaymentIntent.create(params);

            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());
            return response;

        } catch (StripeException e) {
            throw new RuntimeException("Stripe error for booking");
        } catch (Exception e) {
            throw new RuntimeException("Payment intent failed");
        }
    }
}
