import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ManageCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8082/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    return (
        <div>
            <h2>Course List</h2>
            {courses.map(course => (
                <div key={course.id}>
                    <p>{course.name} - {course.category} - Enrolled: {course.enrolledStudentsCount}</p>
                </div>
            ))}
        </div>
    );
}

export default ManageCourses;
