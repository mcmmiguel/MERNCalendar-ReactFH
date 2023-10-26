import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react';
import { useUIStore } from '../../src/hooks/useUIStore';
import { store, uiSlice } from '../../src/store';

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState },
        }
    });
}

describe('Pruebas en useUiStore', () => {

    test('Debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUIStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function)
        })

    });

    test('openDateModal debe colocar true en isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: false });
        const { result } = renderHook(() => useUIStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        })

        expect(result.current.isDateModalOpen).toBeTruthy();

    });

    test('closeDateModal debe colocar false en isDateModalOpen', () => {

        const mockStore = getMockStore({ isDateModalOpen: true });
        const { result } = renderHook(() => useUIStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const { closeDateModal } = result.current;

        act(() => {
            closeDateModal();
        })

        expect(result.current.isDateModalOpen).toBeFalsy();

    });

});