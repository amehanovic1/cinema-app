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
}
