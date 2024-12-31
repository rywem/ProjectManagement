import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/authService";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(username.trim() === '' || password.trim() === '')
            return;
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters.");
            return;
        }
        try {
            await AuthService.register(username, password);
            setUsername('');
            setPassword('');
            navigate('/login');
        }
        catch (error) {
            console.error("Error during registration: ", error);
            setErrorMessage("Registration failed. Please try again.");
        }
    };
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <label htmlFor="password">Password</label>
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button type="submit" className='button-large'>Register</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form> 
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    )
};

export default Register;