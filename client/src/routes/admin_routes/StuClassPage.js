import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import StuClass from '../../pages/admin/StuClass';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/stuClass"
                    element={
                        <>
                            <Dashboard />
                            <StuClass />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
