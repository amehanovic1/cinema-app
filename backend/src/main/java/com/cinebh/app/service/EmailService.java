package com.cinebh.app.service;

import org.thymeleaf.context.Context;

import java.util.UUID;


public interface EmailService {

    void sendEmail(String to, String subject, Context context, String template);

    void sendUserVerificationEmail(String email, String verificationCode);

    void sendUserVerificationSuccessEmail(String email);

    void sendBookingDetailsEmail(UUID bookingId);
}
