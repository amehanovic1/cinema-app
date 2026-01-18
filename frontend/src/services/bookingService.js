import { api } from "./api";

export async function createBookingSession() {
    try {
        const response = await api.post("/booking");
        return response.data;
    } catch (error) {
        console.log("Error creating booking session:", error);
        throw error;
    }
}

export async function updateSeatSelection({ bookingId, seatId, projectionId }) {
    try {
        const response = await api.post("/booking/update-seats", {
            bookingId,
            seatId,
            projectionId
        });
        return response.data;
    } catch (error) {
        console.log("Error updating seat selection:", error);
        throw error;
    }
}

export async function reserve(bookingId) {
    try {
        const response = await api.post(`/booking/reserve/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error("Reservation error:", error);
        throw error;
    }
}

export async function getBookingDetails(bookingId) {
    try {
        const response = await api.get(`/booking/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching booking details:", error);
        throw error;
    }
}

export async function confirmPayment(bookingId) {
    try {
        const response = await api.post(`/booking/pay/${bookingId}`);
        return response.data;
    } catch (error) {
        console.error("Error confirming payment on backend:", error);
        throw error;
    }
}