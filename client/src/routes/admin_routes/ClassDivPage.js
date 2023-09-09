import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../pages/admin/Dashboard';
import ClassDiv from '../../pages/admin/ClassDiv';


export default function Inbox_route() {
    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/classDiv"
                    element={
                        <>
                            <Dashboard />
                            <ClassDiv />
                        </>
                    }
                />
            </Routes>
        </>
    )
}
