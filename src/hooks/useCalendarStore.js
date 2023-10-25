import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarAPI from '../api/calendarAPI';
import { convertEventsToDateEvents } from '../helpers';
export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        if (calendarEvent._id) {
            // Actualizando
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando
            const { data } = await calendarAPI.post('/events', calendarEvent);
            console.log(data);


            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        }
    };

    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarAPI.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    const startDeletingEvent = () => {
        // TODO LLEGAR AL BACKEND
        dispatch(onDeleteEvent());
    }


    return {
        // Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Métodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }
};