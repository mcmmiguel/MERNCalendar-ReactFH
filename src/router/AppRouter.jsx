import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

    const { checkAuthToken, status } = useAuthStore();
    // const authStatus = 'not-authenticated';

    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === 'checking') {
        return (
            <h3>Cargando</h3>
        )
    }


    return (
        <Routes>
            {
                (status !== 'authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to='/auth/login' />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            <Route path="/*" element={<Navigate to='/' />} />
                        </>
                    )
            }

        </Routes>
    )
}
