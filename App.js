import React, { useEffect, useState } from 'react';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';

const App = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/candidates');
            if (!response.ok) {
                throw new Error('Failed to fetch candidates');
            }
            const data = await response.json();
            setCandidates(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates(); // Initial fetch on component mount
    }, []);

    return (
        <div>
            <CandidateForm fetchCandidates={fetchCandidates} />
            <CandidateList candidates={candidates} loading={loading} error={error} />
        </div>
    );
};

export default App;
