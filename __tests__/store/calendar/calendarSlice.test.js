import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {

    test('Debe de regresar el estado por defecto', () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);

    });

    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state).toEqual(calendarWithActiveEventState);

    });

    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent = {
            id: '3',
            start: new Date('2023-10-25 13:00:00'),
            end: new Date('2023-10-25 18:00:00'),
            title: 'Evento de agregado!!',
            notes: 'Agregando nuevo evento...',
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);

    });

    test('onUpdateEvent debe de actualizar el evento', () => {

        const updatedEvent = {
            id: '1',
            start: new Date('2023-10-25 13:00:00'),
            end: new Date('2023-10-25 18:00:00'),
            title: 'Evento de actualización',
            notes: 'Actualizando el evento...',
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);

    });

    test('onDeleteEvent debe de borrar el evento activo', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.activeEvent).toBeNull();
        expect(state.events.length).toBe(1);
        expect(state.events).not.toContain(events[0]);

    });

    test('onLoadEvents debe de establecer los eventos', () => {

        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.events).toEqual(events);
        expect(state.isLoadingEvents).toBeFalsy();

        const newState = calendarSlice.reducer(state, onLoadEvents(events));
        expect(newState.events.length).toBe(events.length);

    });

    test('onLogoutCalendar debe de limpiar el estado', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);

    });



});