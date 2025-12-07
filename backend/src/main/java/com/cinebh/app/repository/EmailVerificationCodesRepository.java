package com.cinebh.app.repository;

import com.cinebh.app.entity.EmailVerificationCodes;
import com.cinebh.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

public interface EmailVerificationCodesRepository extends JpaRepository<EmailVerificationCodes, UUID> {

    Optional<EmailVerificationCodes> findByUser(User user);

    Optional<EmailVerificationCodes> findByUserAndExpiresAtAfter(User user, Instant now);
}
