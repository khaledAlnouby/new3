import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateEnrollment() {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [studentId, setStudentId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch available courses
        axios.get('http://localhost:8082/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses', error));
    }, []);

    const handleCourseChange = (event) => {
        setSelectedCourseId(event.target.value);
    };

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedCourseId || !studentId) {
            setMessage('Please select a course and enter your student ID');
            return;
        }
        try {
            const enrollmentData = {
                courseId: selectedCourseId,
                studentId: parseInt(studentId, 10),
                status: 'PENDING'  // Assuming the default status is 'PENDING'
            };
            const response = await axios.post('http://localhost:8083/api/enrollments', enrollmentData);
            setMessage('Enrollment created successfully!');
            console.log('Enrollment created:', response.data);
        } catch (error) {
            console.error('Error creating enrollment:', error);
            setMessage('Failed to create enrollment');
        }
    };

    return (
        <div>
            <h2>Create Enrollment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Student ID:
                    <input
                        type="number"
                        value={studentId}
                        onChange={handleStudentIdChange}
                        placeholder="Enter your student ID"
                        required
                    />
                </label>
                <label>
                    Select a Course:
                    <select value={selectedCourseId} onChange={handleCourseChange} required>
                        <option value="">Select...</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Enroll</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateEnrollment;
