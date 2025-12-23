import { api } from "./api";

export async function getGenres() {
    try {
        const response = await api.get("/genres");
        return response.data;
    }
    catch (error) {
        console.log("Error fetching genres:", error);
        throw error;
    }
}