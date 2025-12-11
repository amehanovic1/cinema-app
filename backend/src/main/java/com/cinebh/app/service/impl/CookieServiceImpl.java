package com.cinebh.app.service.impl;

import com.cinebh.app.enums.Token;
import com.cinebh.app.service.CookieService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

@Service
public class CookieServiceImpl implements CookieService {

    @Value("${cookie.secure}")
    private boolean secure;

    @Value("${cookie.http-only}")
    private boolean httpOnly;

    @Value("${cookie.same-site}")
    private String sameSite;

    @Override
    public String getTokenFromCookie(HttpServletRequest request, Token tokenType) {
        Cookie cookie = WebUtils.getCookie(request, tokenType.getTokenName());
        if(cookie != null) {
            return cookie.getValue();
        }
        return null;
    }

    @Override
    public void addTokenToCookie(HttpServletResponse response, Token tokenType, String token, long maxAge) {
        ResponseCookie cookie = ResponseCookie.from(tokenType.getTokenName(), token)
                .httpOnly(httpOnly)
                .secure(secure)
                .path("/")
                .maxAge(maxAge / 1000)
                .sameSite(sameSite)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }

    @Override
    public void deleteTokenFromCookie(HttpServletResponse response, Token tokenType) {
        ResponseCookie cookie = ResponseCookie.from(tokenType.getTokenName(), "")
                .httpOnly(httpOnly)
                .secure(secure)
                .path("/")
                .maxAge(0)
                .sameSite(sameSite)
                .build();

        response.addHeader("Set-Cookie", cookie.toString());
    }
}
