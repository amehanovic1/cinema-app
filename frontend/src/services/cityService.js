import { api } from "./api";

export async function getCities() {
    try {
        const response = await api.get("/cities");
        return response.data;
    }
    catch (error) {
        console.log("Error fetching cities:", error);
        throw error;
    }
}