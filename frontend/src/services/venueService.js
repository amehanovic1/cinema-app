import { api } from "./api";

export async function getAllVenues({ page, size }) {
    try {
        const response = await api.get("/venues", { 
            params: { page, size } 
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching venues:", error);
        throw error;
    }
}

export async function getVenuesByCityId({ cityId }) {
    try {
        const response = await api.get("/venues/by-city", { 
            params: { cityId } 
        });
        return response.data;
    }
    catch (error) {
        console.log("Error fetching venues:", error);
        throw error;
    }
}