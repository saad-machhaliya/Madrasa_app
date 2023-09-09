import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import PaymentInfo from '../../pages/admin/PaymentInfo';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/paymentinfo"
                    element={
                        <>
                            <Dashboard />
                            <PaymentInfo />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
