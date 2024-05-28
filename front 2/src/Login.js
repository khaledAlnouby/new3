import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Login.css"

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);
            console.log('Login response:', response.data);
    
            // Access role from the new response structure
            const userRole = response.data.role?.toUpperCase().trim();  // Assuming role is sent correctly
    
            if (userRole) {
                switch (userRole) {
                    case 'ADMIN':
                        navigate('/admin-dashboard');
                        break;
                    case 'INSTRUCTOR':
                        navigate('/instructor-dashboard');
                        break;
                    default:
                        navigate('/Student-Dashboard');  // Default redirect for other roles or if no role is specified
                        break;
                }
            } else {
                console.error('Role data is missing from the login response.');
                setError('Login failed: Missing role data.');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data);
            setError('Failed to login. Please check your credentials.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <label>Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Login</button>
            {error && <p className="login-error">{error}</p>}
        </form>
    );
}

export default Login;
