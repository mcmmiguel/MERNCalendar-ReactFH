import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { addHours } from 'date-fns';

import { CalendarEvent, CalendarModal, NavBar } from "../";
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useUIStore } from '../../hooks';


const events = [{

    title: 'Cumple del jefe',
    notes: 'Comprar el cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Miguel'
    },

}]


export const CalendarPage = () => {

    const { openDateModal } = useUIStore();

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
        console.log('click', event);
    }

    const onViewChangd = (event) => {
        localStorage.setItem('lastView', event);

    }
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
        </>
    )
}
