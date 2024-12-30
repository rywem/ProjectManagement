import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const login = async (username, password) => {
        //handle login logic here, call authService
    };

    const logout = () => {
        //handle logout logic
    }

    const isAuthenticated = () => {
        // Return true/false based on authState
    }

    return (
        <AuthContext.Provider value={{ authState, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};


// 3. Custom hook to use the context
export const useAuth = () => {
    return useContext(AuthContext);
};