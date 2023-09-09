import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import User from '../../pages/admin/User';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/user"
                    element={
                        <>
                            <Dashboard />
                            <User />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
