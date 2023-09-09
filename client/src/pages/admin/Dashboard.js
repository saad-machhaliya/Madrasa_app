import React from 'react';
import '../../css/admin_css/Dashboard.css';


export default function Dashboard() {
  
  return (
   <>
   
   <div className="container-fluid">
    <div className="navigation">
    <div className="nav-content">
      <ul>
        <li>
          <a href="#">
            <span className="icon-logo">
            <i class="fa-solid fa-school" style={{color: "#8DE02C"}}></i>
            </span>
           <h6><b> <span className="title">CHHAPI MADRASA</span></b></h6>
          </a>
        </li>
        <li>
          <a href="/dashboard/dashmain">
            <span className="icon">
              <ion-icon name="home-outline" />
            </span>
            <span className="title">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/students">
            <span className="icon">
              <ion-icon name="people-outline" />
            </span>
            <span className="title">Students</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/stuclass">
            <span className="icon">
            <ion-icon name="storefront-outline"></ion-icon>
            </span>
            <span className="title">Student Class</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/allclass">
            <span className="icon">
            <ion-icon name="storefront-outline"></ion-icon>
            </span>
            <span className="title">All Class</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/classdiv">
            <span className="icon">
            <ion-icon name="storefront-outline"></ion-icon>
            </span>
            <span className="title">Class Division</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/stufees">
            <span className="icon">
            <ion-icon name="cash-outline"></ion-icon>
            </span>
            <span className="title">Student Fees</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/user">
            <span className="icon">
            <ion-icon name="person-circle-outline"></ion-icon>
            </span>
            <span className="title">User Master</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/paymentinfo">
            <span className="icon">
            <ion-icon name="wallet-outline"></ion-icon>
            </span>
            <span className="title">Payment Info</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/refundamount">
            <span className="icon">
            <ion-icon name="wallet-outline"></ion-icon>
            </span>
            <span className="title">Refund Amount</span>
          </a>
        </li>
        <li>
          <a href="/dashboard/adminmaster">
            <span className="icon">
            <ion-icon name="person-outline"></ion-icon>
            </span>
            <span className="title">Admin Master</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

   
      </div>

      {/* ======================= Cards ================== */}
      
   
   </>
  )
}
