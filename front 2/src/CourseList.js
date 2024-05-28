import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get(`http://localhost:8082/api/courses/search?name=${searchTerm}`);
            setCourses(response.data);
        };
        fetchCourses();
    }, [searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddReview = (courseId) => {
        navigate(`/student-dashboard/create-review/${courseId}`);
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search courses" />
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        <h3>{course.name}</h3>
                        <p>{course.description}</p>
                        <p>Category: {course.category}, Rating: {course.rating}</p>
                        <button onClick={() => handleAddReview(course.id)}>Add Review</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseList;
