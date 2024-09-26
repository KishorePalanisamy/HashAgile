import React from 'react';

const CandidateList = ({ candidates, loading, error }) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Candidate List</h2>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {candidate.name} <br />
                        <strong>College:</strong> {candidate.college} <br />
                        <strong>Year of Passout:</strong> {candidate.yearOfPassout} <br />
                        <strong>Degree:</strong> {candidate.degree} <br />
                        <strong>Skills:</strong> {candidate.skills.join(', ')} <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidateList;
