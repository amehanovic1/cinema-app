import { api } from "./api";

export async function getSeatTypes() {
    try {
        const response = await api.get("/seat-types");
        return response.data;
    }
    catch (error) {
        console.log("Error fetching seat types:", error);
        throw error;
    }
}