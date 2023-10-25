import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarAPI from '../api/calendarAPI';
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


            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        }
    };

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
        startSavingEvent,
        startDeletingEvent,
    }
};