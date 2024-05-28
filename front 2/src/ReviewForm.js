import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm({ courseId }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:8084/api/reviews`, {
            courseId,
            text: reviewText,
            rating
        });
        alert('Review submitted!');
        setReviewText('');
        setRating(5);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write a review" />
            <input type="number" value={rating} min="1" max="5" onChange={(e) => setRating(e.target.value)} />
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;
