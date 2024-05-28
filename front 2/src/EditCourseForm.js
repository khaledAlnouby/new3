import React, { useState } from 'react';
function EditCourseForm({ course, onSave }) {
    const [formData, setFormData] = useState(course);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={formData.name} onChange={handleChange} />
            <input name="category" value={formData.category} onChange={handleChange} />
            <textarea name="description" value={formData.description} onChange={handleChange} />
            <input name="duration" value={formData.duration} onChange={handleChange} />
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} />
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
            <button type="submit">Save Changes</button>
        </form>
    );
}
