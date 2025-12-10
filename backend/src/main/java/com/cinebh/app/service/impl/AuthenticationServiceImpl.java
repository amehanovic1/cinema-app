package com.cinebh.app.service.impl;

import com.cinebh.app.dto.auth.AuthResponseDto;
import com.cinebh.app.dto.auth.EmailRequestDto;
import com.cinebh.app.dto.auth.VerifyRequestDto;
import com.cinebh.app.dto.auth.RegisterRequestDto;
import com.cinebh.app.entity.EmailVerificationCode;
import com.cinebh.app.entity.Role;
import com.cinebh.app.entity.User;
import com.cinebh.app.repository.EmailVerificationCodeRepository;
import com.cinebh.app.repository.RoleRepository;
import com.cinebh.app.repository.UserRepository;
import com.cinebh.app.service.AuthenticationService;
import com.cinebh.app.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final int MAX_VERIFICATION_ATTEMPTS = 5;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final EmailVerificationCodeRepository verificationCodeRepository;

    @Override
    public AuthResponseDto register(RegisterRequestDto request) {
        String email = request.getEmail().trim();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (user.getIsVerified()) {
                return AuthResponseDto.builder()
                        .isVerified(true)
                        .message("This email is already registered. Please log in to continue.")
                        .success(false)
                        .build();
            }
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .message("Account exists but is not verified. Please check email or request a new code.")
                    .success(false)
                    .build();
        }

        Role userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Error: USER role not found!"));

        User newUser = User.builder()
                .email(email)
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(new HashSet<>(Set.of(userRole)))
                .isVerified(false)
                .build();

        User savedUser = userRepository.save(newUser);
        saveAndSendCode(savedUser);

        return AuthResponseDto.builder()
                .isVerified(false)
                .success(true)
                .message("Registration successful. Verification code sent to email.")
                .build();
    }

    public AuthResponseDto verify(VerifyRequestDto verifyRequestDto) {
        String email = verifyRequestDto.getEmail().trim();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isEmpty()) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("Invalid verification code.")
                    .build();
        }

        User user = optionalUser.get();

        if(user.getIsVerified()) {
            return AuthResponseDto.builder()
                    .isVerified(true)
                    .success(false)
                    .message("Account is already verified. Please log in.")
                    .build();
        }

        EmailVerificationCode verificationCode = verificationCodeRepository.findByUser(user)
                .orElse(null);

        if (verificationCode == null || verificationCode.getExpiresAt().isBefore(Instant.now())) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("Invalid verification code. Please request a new code.")
                    .build();
        }


        if (!passwordEncoder.matches(verifyRequestDto.getVerificationCode(), verificationCode.getCodeHash())) {
            verificationCode.setAttemptCount(verificationCode.getAttemptCount() + 1);

            if (verificationCode.getAttemptCount() >= MAX_VERIFICATION_ATTEMPTS) {
                verificationCodeRepository.delete(verificationCode);
                return AuthResponseDto.builder()
                        .isVerified(false)
                        .success(false)
                        .message("Maximum verification attempts exceeded. Please request a new code.")
                        .build();
            }

            verificationCodeRepository.save(verificationCode);
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("Invalid verification code. Please try again.")
                    .build();
        }

        user.setIsVerified(true);
        userRepository.save(user);

        return AuthResponseDto.builder()
                .isVerified(true)
                .success(true)
                .message("Account verified successfully.")
                .build();
    }

    public AuthResponseDto resendCode(EmailRequestDto request) {
        String email = request.getEmail().trim();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("Verification code has been sent if this email is registered.")
                    .build();
        }

        User user = optionalUser.get();

        if (user.getIsVerified()) {
            return AuthResponseDto.builder()
                    .isVerified(true)
                    .success(false)
                    .message("Account is already verified. Please log in.")
                    .build();
        }

        Optional<EmailVerificationCode> activeCode = verificationCodeRepository
                .findByUserAndExpiresAtAfter(user, Instant.now());

        if (activeCode.isPresent()) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("Verification code was recently sent. Please check your email or wait before requesting a new one.")
                    .build();
        }

        saveAndSendCode(user);

        return AuthResponseDto.builder()
                .isVerified(false)
                .success(true)
                .message("Verification code sent. Please check your email.")
                .build();
    }

    private void saveAndSendCode(User user) {
        verificationCodeRepository
                .findByUserAndExpiresAtBefore(user, Instant.now())
                .ifPresent(verificationCodeRepository::delete);

        String code = generateVerificationCode();

        EmailVerificationCode verificationCode = new EmailVerificationCode();
        verificationCode.setUser(user);
        verificationCode.setCodeHash(passwordEncoder.encode(code));
        verificationCode.setExpiresAt(Instant.now().plus(10, ChronoUnit.MINUTES));
        verificationCodeRepository.save(verificationCode);

        emailService.sendUserVerificationEmail(user.getEmail(), code);
    }

    private String generateVerificationCode() {
        SecureRandom secureRandom = new SecureRandom();
        int code = secureRandom.nextInt(10000);
        return String.format("%06d", code);
    }

}
