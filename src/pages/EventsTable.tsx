import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import './EventsTable.css';

interface Event {
    date_start: string;
    date_end: string;
    title: string;
    price_detail: string | null;
    price_type: string;
}

const EventsTable: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]); 
    const navigate = useNavigate();

    useEffect(() => {
        getEvents().then()
    }, []);

    const getEvents = async () => {
        const storedStartDate = localStorage.getItem('startDate');
        const storedEndDate = localStorage.getItem('endDate');

        if (storedStartDate && storedEndDate) {
            try {
                const response = await axios.get('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=70');

                const filteredEvents = response.data.results.filter((event: any) => {
                    const eventStartDate = new Date(event.date_start);
                    const eventEndDate = new Date(event.date_end);
                    const selectedStartDate = new Date(storedStartDate);
                    const selectedEndDate = new Date(storedEndDate);

                    return eventStartDate >= selectedStartDate && eventEndDate <= selectedEndDate;
                });

                setEvents(filteredEvents);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        } else {
            navigate('/');
        }

    }
    const parseDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
    }

    function parsePrice(priceString: string | null) {
        if (!priceString) {
            return '';
        }
        const match = priceString.match(/Prix\s*:\s*(\d+)/);
        if (match) {
            return `Prix: ${match[1]}€`;
        }
        return '';
    }


    return (
        <div>
        <button onClick={() => navigate('/')}>Retour</button>
        <table className="events-table">
            <thead>
            <tr>
                <th>Date de Début</th>
                <th>Titre</th>
                <th>Tarif</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event, index) => (
                <tr key={index}>
                    <td>{parseDate(event.date_start) || ''}</td>
                    <td>{event.title || ''}</td>
                    <td>{event.price_type === 'gratuit' ? 'Gratuit' : parsePrice(event.price_detail) || 'non spécifié'}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default EventsTable;