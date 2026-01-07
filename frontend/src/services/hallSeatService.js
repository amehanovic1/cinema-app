import { api } from "./api";

export async function getCinemaHallSeats(hallId) {
    try {
        const response = await api.get(`/hall-seats/${hallId}`);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching hall seats:", error);
        throw error;
    }
}