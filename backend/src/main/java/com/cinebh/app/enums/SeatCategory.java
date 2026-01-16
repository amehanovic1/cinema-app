package com.cinebh.app.enums;

import lombok.Getter;

@Getter
public enum SeatCategory {
    regular("Regular"),
    vip("VIP"),
    love("Love");

    private final String displayName;

    SeatCategory(String displayName) {
        this.displayName = displayName;
    }
}
