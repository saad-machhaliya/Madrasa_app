import React, { useEffect } from 'react';

export default function DashMain() {
    useEffect(() => {
        function activeLink() {
          list.forEach((item) => {
            item.classList.remove("hovered");
          });
          this.classList.add("hovered");
        }
    
        const list = document.querySelectorAll(".navigation li");
        list.forEach((item) => item.addEventListener("mouseover", activeLink));
    
        const toggle = document.querySelector(".toggle");
        const navigation = document.querySelector(".navigation");
        const main = document.querySelector(".main");
    
        const toggleClickHandler = () => {
          navigation.classList.toggle("active");
          main.classList.toggle("active");
        };
    
        toggle.addEventListener("click", toggleClickHandler);
    
        return () => {
          list.forEach((item) => item.removeEventListener("mouseover", activeLink));
          toggle.removeEventListener("click", toggleClickHandler);
        };
      }, []); // Empty dependency array ensures the effect runs only once on mount
    
  return (
    <>
      {/* ========================= Main ==================== */}
      <div className="main">
      <div className="topbar">
        <div className="toggle">
          <ion-icon name="menu-outline" />
        </div>
        <div className="search">
          <label>
            <input type="text" placeholder="Search here" />
            <ion-icon name="search-outline" />
          </label>
        </div>
        <div className="user">
          <img src="assets/imgs/customer01.jpg" alt="" />
        </div>
      </div>

    <div className="cardBox">
        <div className="card">
          <div>
            <div className="numbers">1,504</div>
            <div className="cardName">Daily Views</div>
          </div>
          <div className="iconBx">
            <ion-icon name="eye-outline" />
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">80</div>
            <div className="cardName">Sales</div>
          </div>
          <div className="iconBx">
            <ion-icon name="cart-outline" />
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">284</div>
            <div className="cardName">Comments</div>
          </div>
          <div className="iconBx">
            <ion-icon name="chatbubbles-outline" />
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">$7,842</div>
            <div className="cardName">Earning</div>
          </div>
          <div className="iconBx">
            <ion-icon name="cash-outline" />
          </div>
        </div>
      </div>
      {/* ================ Order Details List ================= */}
      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Recent Orders</h2>
            <a href="#" className="btn">
              View All
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Payment</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Star Refrigerator</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status delivered">Delivered</span>
                </td>
              </tr>
              <tr>
                <td>Dell Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td>
                  <span className="status inProgress">In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Star Refrigerator</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status delivered">Delivered</span>
                </td>
              </tr>
              <tr>
                <td>Dell Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td>
                  <span className="status inProgress">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* ================= New Customers ================ */}
        <div className="recentCustomers">
          <div className="cardHeader">
            <h2>Recent Customers</h2>
          </div>
          <table>
            <tbody>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer02.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer01.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer02.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer01.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer02.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer01.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer01.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    David <br /> <span>Italy</span>
                  </h4>
                </td>
              </tr>
              <tr>
                <td width="60px">
                  <div className="imgBx">
                    <img src="assets/imgs/customer02.jpg" alt="" />
                  </div>
                </td>
                <td>
                  <h4>
                    Amit <br /> <span>India</span>
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
     </div>
    
    </>
  )
}
