
export const events = [
    {
        id: '1',
        start: new Date('2023-10-25 13:00:00'),
        end: new Date('2023-10-25 18:00:00'),
        title: 'Evento de prueba',
        notes: 'Testing event',
    },
    {
        id: '2',
        start: new Date('2023-10-25 13:00:00'),
        end: new Date('2023-10-25 18:00:00'),
        title: 'Mi cumple',
        notes: 'Hola hola hola',
    }
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: [...events[0]],
}