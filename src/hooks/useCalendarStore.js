import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store/calendar/calendarSlice';
export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {


        if (calendarEvent._id) {
            // Actualizando
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // Creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: crypto.randomUUID }))
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