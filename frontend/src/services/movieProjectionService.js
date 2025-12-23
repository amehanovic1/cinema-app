import { api } from "./api";

export async function filterMovieProjections(
    { movieId, projectionDate, cityId, venueId }
) {
    try {
        const response = await api.get("/movie-projections", {
            params: { movieId, projectionDate, cityId, venueId }
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching movie projections:", error);
        throw error;
    }
}