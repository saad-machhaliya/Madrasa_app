import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import AdminMaster from '../../pages/admin/AdminMaster';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/adminmaster"
                    element={
                        <>
                            <Dashboard />
                            <AdminMaster />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
