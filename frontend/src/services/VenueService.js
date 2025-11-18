import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/venues";

export async function getAllVenues(page = 0, size = 4) {
    try {
        const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching venues:", error);
        throw error;
    }
}