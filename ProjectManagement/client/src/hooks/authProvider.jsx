/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import  AuthService from '../services/authService.js';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() =>{
        const storedToken = localStorage.getItem('token');
        if(!storedToken) {
            setToken(storedToken);
            setAuthState({ token: storedToken });
        }
    }, []);

    const login = async (username, password) => {
        //https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
        try {
            var response = await authService.login(username, password);
            if (response !== null) {
                localStorage.setItem('token', response.token);
                setToken(response.token); // Update local state for immediate access
                setAuthState({ token: response });
                navigate('/tasks');
            }
        } catch (error) {
            setErrorMessage("Invalid username or password"); // Update state for UI feedback
            console.error("Error during login: ", error);            
        }
    };

    const logout = () => {
        setAuthState(null);
        localStorage.removeItem("token");
        setToken('');
        navigate("/login");
    }

    const isAuthenticated = () => {     
        if (!token) 
            return false;
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now(); // Check if token is expired
        } catch (e) {
            setErrorMessage("Invalid username or password"); // Update state for UI feedback
            return false;
        }
    };

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