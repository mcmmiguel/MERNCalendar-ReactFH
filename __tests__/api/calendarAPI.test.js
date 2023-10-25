import calendarAPI from "../../src/api/calendarAPI";


describe('Pruebas en el calendarAPI', () => {

    test('Debe de tener la configuración por defecto', () => {
        const { defaults } = calendarAPI;
        expect(defaults.baseURL).toBe(process.env.VITe_API_URL);
    });

    test('Debe de tener el x-token en el header de todas las peticiones', async () => {

        const token = 'abc1234aak';

        localStorage.setItem('token', token);
        const resp = await calendarAPI.get('/auth')
            .then((resp) => resp)
            .catch((resp) => resp);

        expect(resp.config.headers['x-token']).toBe(token);

    });

});