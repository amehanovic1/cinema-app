import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/movie-projections";

export async function filterMovieProjections(
    { movieId, projectionDate, cityId, venueId }
) {
    try {
        const response = await axios.get(API_URL, {
            params: { movieId, projectionDate, cityId, venueId }
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching movie projections:", error);
        throw error;
    }
}