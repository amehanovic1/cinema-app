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

export async function getMovieDetails(movieId) {
    try {
        const response = await api.get(`/movies/${movieId}`);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching movie details:", error);
        throw error;
    }
}

export async function getArchivedMovies({ page, size }) {
    try {
        const response = await api.get("/movies/archived", {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching archived movies:", error);
        throw error;
    }
}

export async function archiveMovies(movieIds) {
    try {
        const response = await api.post("/movies/archive", movieIds);
        return response.data;
    } catch (error) {
        console.log("Error archiving movies:", error);
        throw error;
    }
}

export async function moveToDrafts(movieIds) {
    try {
        const response = await api.post("/movies/move-to-drafts", movieIds);
        return response.data;
    } catch (error) {
        console.log("Error moving movies to drafts:", error);
        throw error;
    }
}