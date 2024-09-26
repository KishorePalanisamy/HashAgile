import React, { useState } from 'react';

const CandidateForm = ({ fetchCandidates }) => { // Accept fetchCandidates as a prop
    const [formData, setFormData] = useState({
        name: '',
        college: '',
        yearOfPassout: '',
        degree: '',
        skills: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/api/candidates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);

                // Call fetchCandidates to refresh the list immediately after submission
                fetchCandidates();
                
                // Optionally, reset the form
                setFormData({
                    name: '',
                    college: '',
                    yearOfPassout: '',
                    degree: '',
                    skills: '',
                });
            } else {
                console.error('Error submitting data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="college" value={formData.college} onChange={handleChange} placeholder="College" required />
            <input type="text" name="yearOfPassout" value={formData.yearOfPassout} onChange={handleChange} placeholder="Year of Passout" required />
            <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" required />
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CandidateForm;
