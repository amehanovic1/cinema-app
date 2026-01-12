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

export async function getReservedSeatsForProjection(projectionId) {
    try {
        const response = await api.get(`/hall-seats/reserved/${projectionId}`);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching reserved hall seats:", error);
        throw error;
    }
}