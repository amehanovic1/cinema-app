package com.cinebh.app.service.impl;

import com.cinebh.app.entity.RefreshToken;
import com.cinebh.app.entity.User;
import com.cinebh.app.repository.RefreshTokenRepository;
import com.cinebh.app.repository.UserRepository;
import com.cinebh.app.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

@RequiredArgsConstructor
@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${jwt.refresh-token.expiration}")
    private Long refreshTokenExpiry;

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    @Override
    public String createRefreshToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String token = generateSecureToken();

        RefreshToken refreshToken = RefreshToken.builder()
                .tokenHash(hashToken(token))
                .expiresAt(Instant.now().plusMillis(refreshTokenExpiry))
                .isRevoked(false)
                .user(user)
                .build();

        refreshTokenRepository.save(refreshToken);

        return token;
    }

    private String generateSecureToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] bytes = new byte[32];
        secureRandom.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    public String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing refresh token", e);
        }
    }

    @Transactional
    @Override
    public RefreshToken verifyRefreshToken(String refreshToken) {
        RefreshToken token = refreshTokenRepository
                .findByTokenHash(hashToken(refreshToken))
                .orElseThrow(() -> new RuntimeException("Refresh token not found!"));

        if(token.getIsRevoked()) {
            throw new RuntimeException("Refresh token revoked!");
        }

        if(token.getExpiresAt().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired!");
        }

        return token;
    }

    @Override
    public void revokeToken(RefreshToken token) {
        token.setIsRevoked(true);
        refreshTokenRepository.save(token);
    }

    @Override
    public void deleteToken(RefreshToken token) {
        refreshTokenRepository.delete(token);
    }

    @Override
    public Long getRefreshExpiration() {
        return refreshTokenExpiry;
    }

}
