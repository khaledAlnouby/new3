import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        affiliation: '',
        yearsOfExperience: '',
        bio: '',
        role: ''  
    });
    const Navigate =useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', formData);
            console.log('User registered:', response.data);
            Navigate('/login'); 
        } catch (error) {
            console.error('Registration error:', error.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <label>Affiliation:
                <input type="text" name="affiliation" value={formData.affiliation} onChange={handleChange} />
            </label>
            <label>Years of Experience:
                <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
            </label>
            <label>Bio:
                <textarea name="bio" value={formData.bio} onChange={handleChange} />
            </label>
            <label>Role:
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="">Select a role</option>
                    <option value="ADMIN">Admin</option>
                    <option value="INSTRUCTOR">Instructor</option>
                    <option value="STUDENT">Student</option>
                </select>
            </label>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
