import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, NavBar } from "../";
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';
import { FabDelete } from '../components/FabDelete';

export const CalendarPage = () => {

    const { openDateModal } = useUIStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#347cf7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        };

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        // console.log('DoubleClick', event);
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveEvent(event);
    }

    const onViewChangd = (event) => {
        localStorage.setItem('lastView', event);

    }

    useEffect(() => {
        startLoadingEvents();
    }, [])

    return (
        <>
            <NavBar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChangd}
            />

            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    )
}
