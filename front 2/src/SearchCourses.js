// SearchCourses.js
import React, { useState } from 'react';
import axios from 'axios';

function SearchCourses() {
    const [searchParams, setSearchParams] = useState({
        name: '',
        category: ''
    });
    const [courses, setCourses] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8082/api/courses/search`, {
                params: {
                    name: searchParams.name,
                    category: searchParams.category
                }
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div>
            <h1>MY Platform</h1>
            <h2>Search Courses</h2>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    name="name"
                    placeholder="Search by name"
                    value={searchParams.name}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name="category"
                    placeholder="Search by category"
                    value={searchParams.category}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            {courses.length > 0 ? (
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            <p>Name: {course.name}</p>
                            <p>Duration: {course.duration}</p>
                            <p>Category: {course.category}</p>
                            <p>Capacity: {course.capacity}</p>
                            <p>Rating: {course.rating}</p>
                            <p>Enrolled Students: {course.enrolledStudentsCount}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No courses found.</p>
            )}
        </div>
    );
}

export default SearchCourses;
