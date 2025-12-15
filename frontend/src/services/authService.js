import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/auth";

export async function registerUser({ email, password }) {
    try {
        const response = await axios.post(`${API_URL}/register`,
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
        const response = await axios.post(`${API_URL}/login`,
            { email, password },
            { withCredentials: true }
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
        const response = await axios.post(`${API_URL}/verify`,
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
        const response = await axios.post(`${API_URL}/resend-code`,
            { email }
        );
        return response.data;
    }
    catch (error) {
        console.log("Failed to resend code:", error);
        throw error;
    }
}