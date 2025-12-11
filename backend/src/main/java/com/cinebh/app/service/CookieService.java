package com.cinebh.app.service;

import com.cinebh.app.enums.Token;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface CookieService {

    String getTokenFromCookie(HttpServletRequest request, Token tokenType);

    void addTokenToCookie(HttpServletResponse response, Token tokenType, String token, long maxAge);

    void deleteTokenFromCookie(HttpServletResponse response, Token tokenType);
}
