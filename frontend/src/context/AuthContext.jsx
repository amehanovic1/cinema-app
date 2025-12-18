import { createContext, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../services/authService";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const login = async ({ email, password }) => {
        await loginUser({ email, password });
        const data = await getCurrentUser();
        setUser(data);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ email, setEmail, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
