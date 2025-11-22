import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/movie-projections";

export async function getProjectionsByFilter(
    { movieId, projectionDate, venue}
) {
    try {
        const response = await axios.get(API_URL, {
            params: { movieId, projectionDate, venue}
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching movie projections:", error);
        throw error;
    }
}