import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';


export default function DashboardPage() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard"
                    element={
                        <>
                            <Dashboard />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
