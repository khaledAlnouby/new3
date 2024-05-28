import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [editingCourse, setEditingCourse] = useState(null);


    // Fetch courses on component mount
    useEffect(() => {
        axios.get('http://localhost:8082/api/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                setError('Failed to fetch courses.');
            });
    }, []);

    // Function to approve a course
    const approveCourse = (courseId) => {
        axios.post(`http://localhost:8082/api/courses/approve/${courseId}`)
            .then(response => {
                // Update the course status in the list
                setCourses(courses.map(course => 
                    course.id === courseId ? { ...course, status: 'Approved' } : course
                ));
            })
            .catch(error => console.error('Error approving course:', error));
    };
    const editCourse = (updatedCourse) => {
        axios.put(`http://localhost:8082/api/courses/${updatedCourse.id}`, updatedCourse)
            .then(response => {
                setCourses(courses.map(course => 
                    course.id === updatedCourse.id ? response.data : course
                ));
                setEditingCourse(null);  // Close the edit form
            })
            .catch(error => {
                console.error('Error updating course:', error);
                setError('Failed to update course.');
            });
    };

    // delete a course
    const deleteCourse = (courseId) => {
        axios.delete(`http://localhost:8082/api/courses/${courseId}`)
            .then(() => {
                // Remove the course from the list
                setCourses(courses.filter(course => course.id !== courseId));
            })
            .catch(error => console.error('Error deleting course:', error));
    };

    return (
        <div>
            <h1>Course Management</h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course => (
                        <tr key={course.id}>
                            <td>{course.name}</td>
                            <td>{course.category}</td>
                            <td>{course.status}</td>
                            <td>
                                {course.status !== 'Approved' && (
                                    <button onClick={() => approveCourse(course.id)}>Approve</button>
                                )}
                                <button onClick={() => setEditingCourse(course)}>Edit</button>
                                <button onClick={() => deleteCourse(course.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editingCourse && (
                <div>
                    <h2>Edit Course</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        editCourse(editingCourse);
                    }}>
                        <label>
                            Name:
                            <input type="text" value={editingCourse.name} onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })} />
                        </label>
                        <label>
                            Category:
                            <input type="text" value={editingCourse.category} onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })} />
                        </label>
                        <label>
                            Description:
                            <textarea value={editingCourse.description} onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })} />
                        </label>
                        <button type="submit">Save Changes</button>
                        <button onClick={() => setEditingCourse(null)}>Cancel</button>
                    </form>
                </div>
                )}
        </div>
    );
}

export default CourseManagement;
