/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import  AuthService from '../services/authService';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(null);
    const [token, setToken] = useState(null);
    const [expires, setExpires] = useState(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    // useEffect: Handle checking for token in local storage
    useEffect(() => {
        console.log("Checking localStorage for token");
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decoded = jwtDecode(storedToken);
            const expires = decoded.exp * 1000; // Convert to ms
            setToken(storedToken);
            setAuthState({ token: storedToken });
            // ✅ Update global auth data
            updateAuthData(storedToken, expires);
        }
        
    }, []);

    //useEffect: Check for token expiration
    useEffect(() => {        
        if (!expires)
            return;
        console.log("Checking for token expiration");
        const remainingTime = expires - Date.now();
        if (remainingTime <= 0) {
            console.log("Token has expired");
            logout();
        }
        else {
            const timeout = setTimeout(() => {
                console.log("Token has expired");
                logout();
            }, remainingTime);
            return clearTimeout(timeout); //cleanup timeout if expires changes
        }
    }, [expires]); // Runs when `expires` is updated.

    const login = async (username, password) => {
        //https://dev.to/miracool/how-to-manage-user-authentication-with-react-js-3ic5
        try {
            var response = await AuthService.login(username, password);
            if (response) {
                const decoded = jwtDecode(response);
                const expires = decoded.exp * 1000; // Convert to ms

                localStorage.setItem('token', response);
                setToken(response); // Update local state for immediate access
                setAuthState({ token: response });
                
                // ✅ Update global auth data
                updateAuthData(response, expires);

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
        setExpires(null);
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

// New function to get the token & expiration globally
let authData = { token: null, expires: null }; // Global variable

export const updateAuthData = (token, expires) => {
    authData.token = token;
    authData.expires = expires;
};

export const getAuthData = () => authData;