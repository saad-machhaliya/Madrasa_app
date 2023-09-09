import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import RefundAmount from '../../pages/admin/RefundAmount';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/refundamount"
                    element={
                        <>
                            <Dashboard />
                            <RefundAmount />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
