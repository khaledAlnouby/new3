import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CreateReview() {
    const { courseId } = useParams();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1);
    const [studentId, setStudentId] = useState('');

    const handleReviewChange = (e) => setReview(e.target.value);
    const handleRatingChange = (e) => setRating(e.target.value);
    const handleStudentIdChange = (e) => setStudentId(e.target.value);

    const handleSubmit = async () => {
        const payload = {
            courseId,
            comment: review,
            rating: parseInt(rating),
            studentId: parseInt(studentId)
        };
        try {
            const response = await axios.post('http://localhost:8084/api/reviews', payload);
            alert('Review added successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding review:', error);
            alert('Failed to add review');
        }
    };
    return (
        <div>
            <h2>Write a Review for Course ID: {courseId}</h2>
            <textarea value={review} onChange={handleReviewChange} placeholder="Write your review here..." />
            <br /><br />
            Enter your Student ID :     
            <input 
                type="number" 
                value={studentId} 
                onChange={handleStudentIdChange} 
                placeholder="Student ID" 
            />
            <br /><br /><br></br>
            <select value={rating} onChange={handleRatingChange}>
                {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                ))}
            </select>
            <br></br><br></br>
            <button onClick={handleSubmit}>Submit Review</button>
        </div>
    );
}

export default CreateReview;
