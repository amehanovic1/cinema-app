import { api } from "./api";

export async function registerUser({ email, password }) {
    try {
        const response = await api.post("/auth/register",
            { email, password });
        return response.data;
    }
    catch (error) {
        console.log("Registration failed:", error);
        throw error;
    }
}

export async function loginUser({ email, password }) {
    try {
        const response = await api.post("/auth/login",
            { email, password }
        );
        return response.data;
    }
    catch (error) {
        console.log("Login failed:", error);
        throw error;
    }
}

export async function verifyUser({ email, verificationCode }) {
    try {
        const response = await api.post("/auth/verify",
            { email, verificationCode }
        );
        return response.data;
    }
    catch (error) {
        console.log("Verification failed:", error);
        throw error;
    }
}

export async function resendCode({ email }) {
    try {
        const response = await api.post("/auth/resend-code",
            { email }
        );
        return response.data;
    }
    catch (error) {
        console.log("Failed to resend code:", error);
        throw error;
    }
}

export async function getCurrentUser() {
    try {
        const response = await api.get("/auth/profile");
        return response.data;
    }
    catch (error) {
        console.log("Get user profile failed:", error);
        return null;
    }
}

export async function logoutUser() {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    }
    catch (error) {
        console.log("Logout failed:", error);
        throw error;
    }
}