import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import DateInput from "./pages/DateInput";
import EventsTable from "./pages/EventsTable";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DateInput/>} />
                <Route path="/events" element={<EventsTable />} />
            </Routes>
        </Router>
    );
}

export default App;
