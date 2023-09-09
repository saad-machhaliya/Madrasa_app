import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import DashboardPage from './routes/admin_routes/DashboardPage';
import DashMainPage from './routes/admin_routes/DashMainPage';
import StudentsPage from './routes/admin_routes/StudentsPage';
import StuClassPage from './routes/admin_routes/StuClassPage';
import AllClassPage from './routes/admin_routes/AllClassPage';
import ClassDivPage from './routes/admin_routes/ClassDivPage';
import StuFeesPage from './routes/admin_routes/StuFeesPage';
import UserPage from './routes/admin_routes/UserPage';
import PaymentInfoPage from './routes/admin_routes/PaymentInfoPage';
import RefundAmountPage from './routes/admin_routes/RefundAmountPage';
import AdminMasterPage from './routes/admin_routes/AdminMasterPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <App />
    <DashboardPage />
    <DashMainPage />
    <StudentsPage />
    <StuClassPage />
    <AllClassPage />
    <ClassDivPage />
    <StuFeesPage />
    <UserPage />
    <PaymentInfoPage  />
    <RefundAmountPage />
    <AdminMasterPage />
    
  </BrowserRouter>
);

reportWebVitals();
