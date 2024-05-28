import React from 'react';
import { Link } from 'react-router-dom';

function InstructorDashboard() {
    return (
        <div>
            <h1>Instructor Dashboard</h1>
            <Link to="/instructor/create-course">Create Course</Link>
            <br></br>
            <Link to="/instructor/manage-courses">Manage Courses</Link>
            <br></br>

            <Link to="/instructor/manage-enrollments">Manage Enrollments</Link>
            <br></br>
            <Link to="/instructor/search-courses">Search Courses</Link>

        </div>
    );
}

export default InstructorDashboard;
