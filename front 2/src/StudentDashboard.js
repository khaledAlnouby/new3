import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import CourseList from './CourseList';
import EnrollmentList from './EnrollmentList';
import SearchCourses from './SearchCourses'; // Import the SearchCourses component
import CreateEnrollment from './CreateEnrollment';
import CreateReview from './CreateReview';


function StudentDashboard({ studentId }) {
    // State to hold the currently selected course for which to write a review
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const selectCourseForReview = (courseId) => {
        setSelectedCourseId(courseId);
    };

    return (
        <div>
            <h1>Student Dashboard</h1>
            <nav>
                <ul>
                    <li><NavLink to="courses">Course List</NavLink></li>
                    <li><NavLink to="enrollments">Enrollment List</NavLink></li>
                    <li><NavLink to="search-courses">Search Courses</NavLink></li>
                    <li><NavLink to="create-enrollment">New Enrollment</NavLink></li>
                </ul>
            </nav>
            <Routes>
                <Route path="courses" element={<CourseList />} />
                <Route path="enrollments" element={<EnrollmentList studentId={studentId} />} />
                <Route path="create-review/:courseId" element={<CreateReview courseId={selectedCourseId} />} />
                <Route path="search-courses" element={<SearchCourses />} />
                <Route path="create-enrollment" element={<CreateEnrollment />} />
                <Route path="create-review/:courseId" element={<CreateReview />} />
            </Routes>
        </div>
    );
}

export default StudentDashboard;
