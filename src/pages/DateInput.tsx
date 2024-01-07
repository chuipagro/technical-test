import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DateInput.css';

const DateInput: React.FC = () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [isEndDateDisabled, setIsEndDateDisabled] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsEndDateDisabled(!startDate);
        if (!startDate) setEndDate(null); // Reset end date if start date is cleared
    }, [startDate]);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            alert('Veuillez remplir les deux dates.');
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        if (start > end) {
            alert('La date de début doit être antérieure à la date de fin.');
            return;
        }

        if (dayDiff > 3) {
            alert('L’écart entre les deux dates doit être limité à 3 jours.');
            return;
        }

        localStorage.setItem('startDate', startDate);
        localStorage.setItem('endDate', endDate);
        navigate('/events');
    }


    return (
        <form onSubmit={handleSubmit} className="date-input-container">
            <label className="date-label">
                Start Date:
                <input
                    type="date"
                    className="date-input"
                    value={startDate || ''}
                    onChange={handleStartDateChange}
                />
            </label>

            <label className="date-label">
                End Date:
                <input
                    type="date"
                    className="date-input"
                    value={endDate || ''}
                    onChange={handleEndDateChange}
                    disabled={isEndDateDisabled}
                    min={startDate || ''}
                    max={startDate ? new Date(new Date(startDate).getTime() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0] : ''}
                />
            </label>
            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default DateInput;
