import { api } from "./api";

export async function getReservedSeatsForProjection(projectionId) {
    try {
        const response = await api.get(`/tickets/reserved-seats/${projectionId}`);
        return response.data;
    }
    catch (error) {
        console.log("Error fetching hall seats:", error);
        throw error;
    }
}