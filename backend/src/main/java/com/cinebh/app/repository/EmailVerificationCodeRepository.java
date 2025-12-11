package com.cinebh.app.repository;

import com.cinebh.app.entity.EmailVerificationCode;
import com.cinebh.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface EmailVerificationCodeRepository extends JpaRepository<EmailVerificationCode, UUID> {

    Optional<EmailVerificationCode> findByUser(User user);

    Optional<EmailVerificationCode> findByUserAndExpiresAtAfter(User user, Instant now);

    void deleteAllByUser(User user);
}
