import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const EventsTable: React.FC = () => {
    const [events, setEvents] = useState(null);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const startDate = localStorage.getItem('startDate');
        const endDate = localStorage.getItem('endDate');
        if (startDate && endDate) {

            setStartDate(startDate);
            setEndDate(endDate);
        } else {
            navigate('/');
        }
        callAPI().then()
    }, []);
    const callAPI = async () => {
        try {
            const response = await axios.get('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20');
            console.log(response.data);
            setEvents(response.data.results)
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <table>

        </table>
    );
};

export default EventsTable;