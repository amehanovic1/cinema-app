package com.cinebh.app.enums;

import lombok.Getter;

@Getter
public enum MovieRatingSource {
    imdb("IMDB Rating"),
    rotten_tomatoes("Rotten Tomatoes");

    private final String displayName;

    MovieRatingSource(String displayName) {
        this.displayName = displayName;
    }

    public static MovieRatingSource fromString(String value) {
        if (value == null) return null;
        for (MovieRatingSource source : values()) {
            if (source.displayName.equalsIgnoreCase(value) || source.name().equalsIgnoreCase(value)) {
                return source;
            }
        }
        return null;
    }
}
