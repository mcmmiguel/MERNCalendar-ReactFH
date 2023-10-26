import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { testUserCredentials } from '../fixtures/testUser';
import calendarAPI from '../../src/api/calendarAPI';


const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState },
        }
    });
}

describe('Pruebas en useAuthStore', () => {

    beforeEach(() => {
        localStorage.clear();
    })

    test('Debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        });

    });

    test('startLogin debe de realizar el login correctamente', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startLogin } = result.current;

        await act(async () => {
            await startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                name: 'Test User',
                uid: '65396c1195713d34eaf783ee'
            }
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

    });

    test('startLogin debe fallar la autenticación', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startLogin } = result.current;

        await act(async () => {
            await startLogin({ email: 'algo@algo.com', password: 'nada' });
        });

        const { errorMessage, status, user } = result.current;

        expect(localStorage.getItem('token')).toBeNull();
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {},
        });

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        );

    });

    test('startRegister debe de crear un usuario', async () => {

        const newUser = {
            email: 'algo@algo.com',
            password: 'nada',
            name: 'Algo Test'
        };

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startRegister } = result.current;

        const spy = jest.spyOn(calendarAPI, 'post').mockReturnValue({
            data: {
                "ok": true,
                "uid": "65396c1195713d34eaf783ee",
                "name": "Test User",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NTM5NmMxMTk1NzEzZDM0ZWFmNzgzZWUiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjk4MjgyODUwLCJleHAiOjE2OTgyOTAwNTB9.v9YXrSV1OUY5FJmTeFQr3euNNxrxa4OxYDVQ5dV-7wU"
            }
        })

        await act(async () => {
            await startRegister(newUser);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '65396c1195713d34eaf783ee' }
        });

        spy.mockRestore();

    });

    test('startRegister debe fallar la creación', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { startRegister } = result.current;

        await act(async () => {
            await startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: "Ya hay un usuario utilizando ese correo",
            status: "not-authenticated",
            user: {},
        });

    });


});