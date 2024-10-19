// src/MyCalendar.js

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './style.css'; // Import custom styles

const MyCalendar = () => {
  const [events, setEvents] = useState([
    { title: 'Event 1', start: '2024-07-10', end: '2024-07-12' },
    { title: 'Event 2', start: '2024-07-15T10:30:00', end: '2024-07-15T12:30:00' },
  ]);

  const handleDateClick = (arg) => {
    // Handle date click (e.g., create a new event)
    const title = prompt('Enter event title:');
    if (title) {
      setEvents([...events, { title, start: arg.dateStr }]);
    }
  };

  const handleEventClick = (info) => {
    // Handle event click (e.g., delete the event)
    if (window.confirm(`Are you sure you want to delete the event '${info.event.title}'?`)) {
      info.event.remove();
    }
  };

  return (
    <div className="my-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
      />
    </div>
  );
};

export default MyCalendar;
