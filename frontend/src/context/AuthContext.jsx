import { createContext, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/authService";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch {
            setUser(null);
        }
    }

    useEffect(() => {
        const initilizeAuth = async () => {
            await fetchUser();
            setIsLoading(false);
        }
        initilizeAuth();
    }, [])

    const login = async (credentials) => {
        const res = await loginUser(credentials);
        if (res.success) {
            await fetchUser();
        }
        return res;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
