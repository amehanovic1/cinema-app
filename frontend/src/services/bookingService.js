import { api } from "./api";

export async function makeBooking({ userId, projectionId, hallSeatsId, status }) {
    try {
        const response = await api.post("/booking",
            { userId, projectionId, hallSeatsId, status });
        return response.data;
    }
    catch (error) {
        console.log("Booking failed:", error);
        throw error;
    }
}
