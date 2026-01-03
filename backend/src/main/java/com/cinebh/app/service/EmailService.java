package com.cinebh.app.service;

public interface EmailService {

    void sendEmail(String to, String subject, String text, String template);

    void sendUserVerificationEmail(String email, String verificationCode);

    void sendUserVerificationSuccessEmail(String email);
}
