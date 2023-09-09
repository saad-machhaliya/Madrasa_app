import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashMain from '../../pages/admin/DashMain';
import Dashboard from '../../pages/admin/Dashboard';


export default function DashMainPage() {
    return (
        <>
            <Routes>
                <Route
                    path="dashboard/dashmain"
                    element={
                        <>
                            <Dashboard />
                            <DashMain />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
