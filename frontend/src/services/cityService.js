import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/cities";

export async function getCities() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching cities:", error);
        throw error;
    }
}