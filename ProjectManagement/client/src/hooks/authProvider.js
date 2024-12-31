/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { authService } from '../services/authService';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();
    const login = async (username, password) => {
        //https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
        try {
            var response = await authService.login(username, password);
            if (response !== null) {
                setToken(response.token);
                
                setAuthState({ token: response });
                navigate('/tasks');
            }
        } catch (error) {
            console.error("Error during login: ", error);            
        }
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

export default AuthProvider;
// 3. Custom hook to use the context
export const useAuth = () => {
    return useContext(AuthContext);
};