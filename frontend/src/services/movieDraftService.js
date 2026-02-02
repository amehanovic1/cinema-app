import { api } from "./api";

export async function getMovieDrafts({ page, size }) {
    try {
        const response = await api.get("/movie-drafts", {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching movie drafts:", error);
        throw error;
    }
}

export async function publish(draftIds) {
    try {
        await api.post("/movie-drafts/publish", draftIds);
        return true;
    } catch (error) {
        console.log("Error publishing movie drafts:", error);
        throw error;
    }
}

export async function archiveDraft(draftIds) {
    try {
        await api.post("/movie-drafts/archive", draftIds);
        return true;
    } catch (error) {
        console.log("Error archiving movies:", error);
        throw error;
    }
}