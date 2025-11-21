import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/venues";

export async function getAllVenues({ page, size }) {
    try {
        const response = await axios.get(API_URL, { 
            params: { page, size } 
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching venues:", error);
        throw error;
    }
}