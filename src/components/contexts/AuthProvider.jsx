// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the user is authenticated on component mount
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:5000/auth/callback", {
                    credentials: "include", // Ensure cookies are sent with the request
                });
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.data); // Set user data from the backend
                    localStorage.setItem("user", JSON.stringify(userData.data)); // Store user in localStorage
                } else {
                    localStorage.removeItem("user"); // Clear localStorage if not authenticated
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const signInWithGoogle = async () => {
        try {
            // Redirect to Flask's Google OAuth route
            window.location.href = "http://localhost:5000/auth/login";
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    const signOut = async () => {
        try {
            const response = await fetch("http://localhost:5000/logout", {
                method: "POST",
                credentials: "include",
            });

            if (response.ok) {
                setUser(null);
                localStorage.removeItem("user"); // Clear localStorage on sign-out
            }
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                signInWithGoogle,
                signOut,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
