import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function AdminMaster() {

  const [adminData, setAdminData] = useState([]);

  //ADD Admin DATA

  const [addAdmin, setAddAdmin] = useState({
    username: "",
    password:""
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = () => {
    axios
      .get('http://localhost:5000/admin')
      .then((response) => {
        setAdminData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching Admin data in Admin.js:', error);
      });
  };

  const handleAdminChange = (event) => {
    const { name, value } = event.target;
    setAddAdmin((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveAdminData = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/admin', addAdmin)
      .then(() => {
          fetchAdminData();
          setAddAdmin({
            username: "",
            password:""
          });
        
      })
      .catch((error) => {
        console.log('Error adding data in Admin.js:', error);
      });
  };
  
    //DELETE Admin DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/admin/${deleteId}`)
        .then(() => {
          fetchAdminData();
        })
        .catch((error) => {
          console.log('Error deleting Admin data in Admin.js:', error);
        });
    }
  };
 
  //EDIT Admin DATA
  const [adminEdit, setAdminEdit] = useState({
    username: "",
    password:""
  });
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setAdminEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  }

  const handleAdminEdit = (editId) => {
  axios
    .get(`http://localhost:5000/admin/${editId}`)
    .then((response) => {
      setAdminEdit(response.data[0]);
    })
    .catch((error) => {
      console.log('Error fetching Admin data:', error);
    });
};

const handleSaveEditData = (admin_id) => {
  axios.put(`http://localhost:5000/admin/${admin_id}`, adminEdit)
    .then(() => {
      fetchAdminData();
    })
    .catch((error) => {
      console.log('Error updating Admin data:', error);
    });
};

  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={saveAdminData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD Admin</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">username:</label>
                  <input type="text" className="form-control" name="username" placeholder="Enter  username..." onChange={handleAdminChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">password:</label>
                  <input type="text" className="form-control" name="password" placeholder="Enter  password..." onChange={handleAdminChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

{/* EDIT DATA MODEL */}
<div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form>
              <div className="modal-header"  style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT ADMIN</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
             
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">username</label>
                <input type="text" className="form-control" name='username'  onChange={handleEditChange} value={adminEdit.username} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">password</label>
                <input type="text" className="form-control" name='password'  onChange={handleEditChange} value={adminEdit.password} />
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(adminEdit.admin_id) }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid body">
        <div className="row">
          <div className="col-lg-2"></div>
          <div className="col-lg-10">
          <div className="custom-table-wrapper">
          <div className='cate-main'>
        <div className='cate-head-main'>
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>ADMIN MASTER</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD ADMIN
          </button>
          </h1>
        </div>
        </div>
      </div>
     {/* table start ....................................... */}
     <div className="table-container" style={{ margin: '20px' }}>
            <table className="table table-hover brand-table">
        <thead>
          <tr>
              <th scope="col" width="5%"  style={{color: "#5caebe"}}>Id</th>
            <th width="10%"  style={{color: "#5caebe"}}>Username</th>
            <th width="10%"  style={{color: "#5caebe"}}>Password</th>

            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>

          </tr>
        </thead>
        <tbody>
            {
              adminData.map((admin) => {
                return (
                  <tr key={admin.admin_id}>
                    <th>{admin.admin_id}</th>
                    <td>{admin.username}</td>
                    <td>{admin.password}</td>

                    <td>
                      <div className="dropdown">
                        <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <span>
                            <li>
                              <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleAdminEdit(admin.admin_id) }}><i class="fa-solid fa-user-pen"  style={{color: "#259745"}}></i>  Edit  </button>

                              <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(admin.admin_id) }}><i class="fa-solid fa-trash-can" style={{ color: "#E53E30" }}></i> Delete</button>
                            </li>
                          </span>
                        </ul>
                      </div>
                    </td>
































































































































                    
                  </tr>
                )
              })
            }

        </tbody>
      </table >
        </div>
          </div>
        </div>
      </div>
    </>
  );
}
