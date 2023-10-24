import { useDispatch, useSelector } from 'react-redux';
import calendarAPI from '../api/calendarAPI';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());

        try {

            const { data } = await calendarAPI.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout('Su sesión ha expirado'));

        try {

            const { data } = calendarAPI.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }

    }

    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking());

        try {

            const { data } = await calendarAPI.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }


    return {
        // Propiedades
        errorMessage,
        status,
        user,

        // Métodos
        startLogin,
        checkAuthToken,
        startRegister,
    }
};