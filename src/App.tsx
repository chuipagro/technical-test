import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import DateInput from "../pages/DateInput";
import EventsTable from "../pages/EventsTable";

function App() {
    return (
        <Routes>
            <Route path="/" element={<DateInput />} />
            <Route path="/about" element={<EventsTable />} />
        </Routes>
    );
}

export default App;
