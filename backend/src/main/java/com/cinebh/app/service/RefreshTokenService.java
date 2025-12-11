package com.cinebh.app.service;

import com.cinebh.app.entity.RefreshToken;

public interface RefreshTokenService {

    String createRefreshToken(String email);

    RefreshToken verifyRefreshToken(String refreshToken);

    void revokeToken(RefreshToken token);

    Long getRefreshExpiration();
}
