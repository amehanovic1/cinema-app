package com.cinebh.app.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Token {

    ACCESS("access_token"),
    REFRESH("refresh_token");

    private final String tokenName;
}
