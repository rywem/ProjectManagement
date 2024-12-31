import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/authService";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();

        if(username.trim() === '' || password.trim() === '')
            return;

        try {
            AuthService.register(username, password);
            setUsername('');
            setPassword('');
            navigate('/login');
        }
        catch (error) {
            console.error("Error during registration: ", error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button type="submit" className='button-large'>Register</button>
            </form> 
        </div>
    )
};

export default Register;