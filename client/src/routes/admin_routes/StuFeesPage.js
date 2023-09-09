import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import StuFees from '../../pages/admin/StuFees';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/stufees"
                    element={
                        <>
                            <Dashboard />
                            <StuFees />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
