import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
import calendarAPI from '../api/calendarAPI';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';
export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                // Actualizando
                const { data } = await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            // Creando
            const { data } = await calendarAPI.post('/events', calendarEvent);
            console.log(data);

            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
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