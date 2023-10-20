import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent } from '../store/calendar/calendarSlice';
export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {


        if (calendarEvent._id) {
            // Actualizando
        } else {
            // Creando
            dispatch(onAddNewEvent({ ...calendarEvent, _id: crypto.randomUUID }))
        }
    };


    return {
        // Propiedades
        events,
        activeEvent,

        // Métodos
        setActiveEvent,
        startSavingEvent,
    }
};