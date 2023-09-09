import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Students from '../../pages/admin/Students';
import Dashboard from '../../pages/admin/Dashboard';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/students"
                    element={
                        <>
                            <Dashboard />
                            <Students />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
