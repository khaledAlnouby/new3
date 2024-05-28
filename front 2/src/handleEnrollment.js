// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const handleEnrollment = async (courseId, enroll = true) => {
//     try {
//         const url = `http://localhost:8080/api/enrollments/${enroll ? 'enroll' : 'cancel'}/${courseId}`;
//         const response = await axios.post(url, { studentId });
//         alert(`You have successfully ${enroll ? 'enrolled in' : 'withdrawn from'} the course.`);
//     } catch (error) {
//         console.error('Enrollment operation failed:', error);
//     }
// };
