import React from 'react';
import axios from 'axios';
import CreateReview from './CreateReview';

function CourseDetails({ course }) {
    return (
        <div>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
            <p>Duration: {course.duration}</p>
            <p>Category: {course.category}</p>
            <p>Rating: {course.rating}</p>
        </div>
        
    );
}



export default CourseDetails;
