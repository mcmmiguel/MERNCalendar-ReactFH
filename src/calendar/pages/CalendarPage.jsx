import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { CalendarEvent, CalendarModal, FabAddNew, NavBar } from "../";
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUIStore } from '../../hooks';
import { FabDelete } from '../components/FabDelete';

export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUIStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event, start, end, isSelected) => {

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

        const style = {
            backgroundColor: isMyEvent ? '#347cf7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
        };

        return {
            style
        }
    }

    const onDoubleClick = () => {
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
