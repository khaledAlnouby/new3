import React, { useState } from 'react';
import axios from 'axios';

function CreateCourse() {
    const [courseData, setCourseData] = useState({
        name: '',
        duration: '',
        category: '',
        capacity: '',
        rating: '',
        enrolledStudentsCount: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/courses', courseData);
            console.log('Course created:', response.data);
            setMessage('Course successfully created!');
        } catch (error) {
            console.error('Error creating course:', error);
            setMessage('Failed to create course.');
        }
    };

    return (
        <div>
            <h2>Create a New Course</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={courseData.name} onChange={handleChange} required />
                </label>
                <label>
                    Duration:
                    <input type="text" name="duration" value={courseData.duration} onChange={handleChange} required />
                </label>
                <label>
                    Category:
                    <input type="text" name="category" value={courseData.category} onChange={handleChange} required />
                </label>
                <label>
                    Capacity:
                    <input type="number" name="capacity" value={courseData.capacity} onChange={handleChange} required />
                </label>
                <label>
                    Rating (Initial):
                    <input type="number" step="0.1" name="rating" value={courseData.rating} onChange={handleChange} required />
                </label>
                <button type="submit">Create Course</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateCourse;
