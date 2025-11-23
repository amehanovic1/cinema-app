import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/movies";

export async function getCurrentlyShowingMovies({ title, city, venue, genre, date, time, page, size }) {
    try {
        const response = await axios.get(`${API_URL}/currently-showing`, {
            params: { title, city, venue, genre, date, time, page, size }
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching currently showing movies:", error);
        throw error;
    }
}

export async function getUpcomingMovies({title, city, venue, genre, startDate, endDate, page, size }) {
    try {
        const response = await axios.get(`${API_URL}/upcoming`, {
            params: { title, city, venue, genre, startDate, endDate, page, size }
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching upcoming movies:", error);
        throw error;
    }
}