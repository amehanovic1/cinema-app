import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/genres";

export async function getGenres() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching genres:", error);
        throw error;
    }
}