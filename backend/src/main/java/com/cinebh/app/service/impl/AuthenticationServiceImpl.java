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
import jakarta.mail.MessagingException;
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

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final EmailVerificationCodeRepository verificationCodesRepository;

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
        String code = generateVerificationCode();
        saveAndSendCode(savedUser, code);

        return AuthResponseDto.builder()
                .isVerified(false)
                .success(true)
                .message("Registration successful. Verification code sent to email.")
                .build();
    }

    public AuthResponseDto verify(VerifyRequestDto verifyRequestDto) {
        String email = verifyRequestDto.getEmail().trim();
        AuthResponseDto status = checkUserStatus(email);
        if (status != null) return status;

        User user = userRepository.findByEmail(email).get();
        EmailVerificationCode verificationCodes = verificationCodesRepository.findByUser(user)
                .orElse(null);

        if (verificationCodes == null) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("Verification code not found. Please request a new one.")
                    .build();
        }

        if (verificationCodes.getExpiresAt().isBefore(Instant.now())) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("Verification code has expired. Please request a new one.")
                    .build();
        }

        if (!passwordEncoder.matches(verifyRequestDto.getVerificationCode(), verificationCodes.getCodeHash())) {
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

        AuthResponseDto status = checkUserStatus(email);
        if(status != null) return status;

        User user = userRepository.findByEmail(email).get();

        Optional<EmailVerificationCode> activeCode = verificationCodesRepository
                .findByUserAndExpiresAtAfter(user, Instant.now());

        if(activeCode.isPresent()) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("A verification code is already active. Please check your email.")
                    .build();
        }

        String code = generateVerificationCode();

        saveAndSendCode(user, code);

        return AuthResponseDto.builder()
                .isVerified(false)
                .success(true)
                .message("Verification code sent to email.")
                .build();
    }

    private AuthResponseDto checkUserStatus(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if(optionalUser.isEmpty()) {
            return AuthResponseDto.builder()
                    .isVerified(false)
                    .success(false)
                    .message("No account found with this email.")
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

        return null;
    }

    private void saveAndSendCode(User user, String code) {
        EmailVerificationCode verificationCodes = verificationCodesRepository.findByUser(user)
                .orElseGet(() -> {
                    EmailVerificationCode codes = new EmailVerificationCode();
                    codes.setUser(user);
                    return codes;
                });

        verificationCodes.setCodeHash(passwordEncoder.encode(code));
        verificationCodes.setExpiresAt(Instant.now().plus(15, ChronoUnit.MINUTES));
        verificationCodesRepository.save(verificationCodes);

        sendVerificationEmail(user.getEmail(), code);
    }

    public void sendVerificationEmail(String email, String verificationCode) {
        String subject = "Account Activation";
        try {
            emailService.sendVerificationEmail(email, subject, verificationCode);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private String generateVerificationCode() {
        SecureRandom secureRandom = new SecureRandom();
        int code = secureRandom.nextInt(10000);
        return String.format("%04d", code);
    }

}
