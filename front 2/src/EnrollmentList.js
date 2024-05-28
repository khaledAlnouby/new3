import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);
    const [studentId, setStudentId] = useState(''); // State to hold student ID input
    const [error, setError] = useState(null);

    useEffect(() => {
        if (studentId) {  // Fetch enrollments only if studentId is not empty
            const fetchEnrollments = async () => {
                try {
                    const response = await axios.get(`http://localhost:8083/api/enrollments/student/${studentId}`);
                    setEnrollments(response.data);
                } catch (error) {
                    console.error('Error fetching enrollments:', error);
                    setError('Failed to fetch enrollments');
                }
            };
            fetchEnrollments();
        }
    }, [studentId]); // Effect runs when studentId changes

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    };

    const handleCancel = async (enrollmentId) => {
        try {
            await axios.put(`http://localhost:8083/api/enrollments/${enrollmentId}`, { status: 'CANCELLED' });
            setEnrollments(enrollments.filter(enrollment => enrollment.id !== enrollmentId));
        } catch (error) {
            console.error('Error canceling enrollment:', error);
            setError('Failed to cancel enrollment');
        }
    };

    return (
        <div>
            <h2>Your Enrollments</h2>
            <input
                type="text"
                value={studentId}
                onChange={handleStudentIdChange}
                placeholder="Enter your student ID"
            />
            {error && <p className="error">{error}</p>}
            <ul>
                {enrollments.map(enrollment => (
                    <li key={enrollment.id}>
                        <span>- Course ID : {enrollment.courseId} - Status: {enrollment.status}</span>
                        <button onClick={() => handleCancel(enrollment.id)}>Cancel Enrollment</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EnrollmentList;
