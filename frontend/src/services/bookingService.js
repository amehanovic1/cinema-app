import { api } from "./api";

export async function reserve({ userId, projectionId, hallSeatsId }) {
    try {
        const response = await api.post("/booking/reserve",
            { userId, projectionId, hallSeatsId });
        return response.data;
    }
    catch (error) {
        console.log("Booking failed:", error);
        throw error;
    }
}
