package com.cinebh.app.service.impl;

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
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    @Value("${mail.from}")
    private String fromEmail;

    private final JavaMailSender emailSender;
    private final SpringTemplateEngine templateEngine;

    @Override
    public void sendEmail(String to, String subject, String text, String template) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            Context context = new Context();
            if(text != null) {
                context.setVariable("code", text);
            }
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
        sendEmail(email, "Account Activation", verificationCode, "verification_email.html");
    }

    @Override
    @Async
    public void sendUserVerificationSuccessEmail(String email) {
        sendEmail(email, "Account Verified", null, "verification_success_email.html");
    }
}
