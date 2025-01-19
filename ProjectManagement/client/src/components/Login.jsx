import React, { useState} from 'react';
import { useAuth } from '../hooks/authProvider';
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth(); // Destructure the login method from useAuth

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(username.trim() === '' || password.trim() === '')
        {
            setErrorMessage("Username and password are required.");
            return;
        }

        try {
            await login(username, password);
            setErrorMessage(null); // Clear any previous error messages
            navigate('/tasks');
        }
        catch(error) {
            console.error("Error during login: ", error);
            setErrorMessage("Login failed. Please try again.");
        }
        
    }
    return (
        <div>
            <h1>Login</h1>
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
                <button type="submit" className='button-large' id='btnLogin'>Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    )
};

export default Login;
