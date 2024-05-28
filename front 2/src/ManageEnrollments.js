import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageEnrollments.css'; // Import your CSS file for styling

function ManageEnrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [filteredEnrollments, setFilteredEnrollments] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // Fetch all enrollments from the API
        const fetchEnrollments = async () => {
            try {
                const response = await axios.get('http://localhost:8083/api/enrollments');
                setEnrollments(response.data || []);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
                setError('Error fetching enrollments. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    useEffect(() => {
        // Filter enrollments by courseId if courseId is provided
        if (courseId) {
            setFilteredEnrollments(enrollments.filter(enrollment => enrollment.courseId.toString() === courseId));
        } else {
            setFilteredEnrollments(enrollments);
        }
    }, [courseId, enrollments]);

    const handleStatusChange = async (id, courseId, newStatus) => {
        try {
            // Update the enrollment status
            const enrollmentResponse = await axios.put(`http://localhost:8083/api/enrollments/${id}`, { status: newStatus });
            if (enrollmentResponse.status === 200 && newStatus === 'ACCEPTED') {
                // Only proceed to increment the course count if the status is ACCEPTED
                const courseResponse = await axios.patch(`http://localhost:8082/api/courses/increment-enrollment/${courseId}`);
                if (courseResponse.status === 200) {
                    alert('Enrollment accepted and course count updated!');
                } else {
                    throw new Error(`Failed to increment course count, server responded with status: ${courseResponse.status}`);
                }
            } else {
                throw new Error(`Failed to update enrollment status, server responded with status: ${enrollmentResponse.status}`);
            }
        } catch (error) {
            console.error('Detailed error:', error.response || error);
            alert('Error updating enrollment status or course count: ' + (error.response?.data?.message || error.message));
        }
    };
    
    
    

    return (
        <div className="manage-enrollments-container">
            <h2>Manage Enrollments</h2>
            <input
                type="text"
                value={courseId}
                onChange={e => setCourseId(e.target.value)}
                placeholder="Filter by Course ID"
            />
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <ul>
                {filteredEnrollments.map(enrollment => (
                    <li key={enrollment.id}>
                        <strong>Student ID:</strong> {enrollment.studentId} <br />
                        <strong>Course ID:</strong> {enrollment.courseId} <br />
                        <strong>Status:</strong> {enrollment.status} <br />
                        <button onClick={() => handleStatusChange(enrollment.id, enrollment.courseId, 'ACCEPTED')}>Accept</button>
                        <button onClick={() => handleStatusChange(enrollment.id, enrollment.courseId ,'REJECTED')}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageEnrollments;
