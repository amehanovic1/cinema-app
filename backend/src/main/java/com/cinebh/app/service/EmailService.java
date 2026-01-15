package com.cinebh.app.service;

import com.cinebh.app.entity.Booking;
import org.thymeleaf.context.Context;


public interface EmailService {

    void sendEmail(String to, String subject, Context context, String template);

    void sendUserVerificationEmail(String email, String verificationCode);

    void sendUserVerificationSuccessEmail(String email);

    void sendBookingDetailsEmail(Booking booking);
}
