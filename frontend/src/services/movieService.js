import { api } from "./api";

export async function getCurrentlyShowingMovies({ title, cityId, venueId, genreId, date, time, page, size }) {
    try {
        const response = await api.get("/movies/currently-showing", {
            params: { title, cityId, venueId, genreId, date, time, page, size }
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching currently showing movies:", error);
        throw error;
    }
}

export async function getUpcomingMovies({ title, cityId, venueId, genreId, startDate, endDate, page, size }) {
    try {
        const response = await api.get("/movies/upcoming", {
            params: { title, cityId, venueId, genreId, startDate, endDate, page, size }
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching upcoming movies:", error);
        throw error;
    }
}

export async function getMovieDetails({ movieId }) {
    try {
        const response = await api.get("/movies/movie-details",
            { movieId: movieId }
        );
        return response.data;
    }
    catch (error) {
        console.log("Error fetching movie details:", error);
        throw error;
    }
}