package com.cinebh.app.service.impl;

import com.cinebh.app.entity.*;
import com.cinebh.app.repository.BookingRepository;
import com.cinebh.app.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final BookingRepository bookingRepository;
    @Value("${mail.from}")
    private String fromEmail;

    private final JavaMailSender emailSender;
    private final SpringTemplateEngine templateEngine;

    @Override
    public void sendEmail(String to, String subject, Context context, String template) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            String html = templateEngine.process(template, context);

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);

            emailSender.send(message);
        } catch (MessagingException e) {
            log.error("Failed to send verification email.", e);
        }
    }


    @Override
    @Async
    public void sendUserVerificationEmail(String email, String verificationCode) {
        Context context = new Context();
        context.setVariable("code", verificationCode);
        sendEmail(email, "Account Activation", context, "verification_email.html");
    }

    @Override
    @Async
    public void sendUserVerificationSuccessEmail(String email) {
        Context context = new Context();
        sendEmail(email, "Account Verified", context, "verification_success_email.html");
    }

    @Override
    @Async
    @Transactional(readOnly = true)
    public void sendBookingDetailsEmail(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found for email"));

        String seats = booking.getTickets().stream()
                .map(t -> t.getHallSeat().getSeatCode())
                .collect(Collectors.joining(", "));

        double totalPrice = booking.getTickets().stream()
                .mapToDouble(t -> t.getHallSeat().getSeatType().getPrice())
                .sum();

        Ticket firstTicket = booking.getTickets().getFirst();
        MovieProjection projection = firstTicket.getProjection();
        CinemaHall hall = projection.getCinemaHall();
        Venue venue = hall.getVenue();
        String cinemaName = hall.getName();
        String venueAddress = venue.getName() + ", " + venue.getStreet() + " " + venue.getStreetNumber() + ", " + venue.getCity().getName();

        Context context = new Context();
        context.setVariable("movieTitle", projection.getMovie().getTitle());
        context.setVariable("projectionDate", projection.getProjectionDate());
        context.setVariable("projectionTime", projection.getProjectionTime());
        context.setVariable("cinemaName", cinemaName);
        context.setVariable("venueAddress", venueAddress);
        context.setVariable("seats", seats);
        context.setVariable("totalPrice", totalPrice);

        User user = booking.getUser();
        String email = user.getEmail();

        sendEmail(email, "Your Cinebh Booking Details", context, "booking_confirmation_email.html");
    }
}
