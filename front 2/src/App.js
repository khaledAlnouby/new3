import React from 'react';
import Register from './register';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ManageUsers from './ManageUsers' ; 
import ManageCourse from './CourseManagement' ; 
import ManageCourses from './CourseManagement';
import InstructorDashboard from './InstructorDashboard'; 
import CreateCourse from './CreateCourse'; 
import ManageEnrollments from './ManageEnrollments'; 
import SearchCourses from './SearchCourses';
import StudentDashboard from './StudentDashboard';
function App() {
  return (
    <Router>
    <div>
      <h1>MY platform </h1>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="//admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-courses" element={<ManageCourse />} />
        {/* <Route path="/admin/analytics" element={<AnalyticsDashboard />} /> */}
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/create-course" element={<CreateCourse />} />
        <Route path="/instructor/manage-courses" element={<ManageCourses />} />
        <Route path="/instructor/manage-enrollments" element={<ManageEnrollments />} />
        <Route path="/instructor/search-courses" element={<SearchCourses />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />} />

      </Routes>
    </div>
  </Router>
  );
}

export default App;
