import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import AllClass from '../../pages/admin/AllClass';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/allclass"
                    element={
                        <>
                            <Dashboard />
                            <AllClass />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
