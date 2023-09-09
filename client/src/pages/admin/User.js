import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function User() {

  const [userData, setUserData] = useState([]);

  //ADD USER DATA

  const [addUser, setAddUser] = useState({
    user_name: ""
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get('http://localhost:5000/user')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching user data in user.js:', error);
      });
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setAddUser((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveUserData = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/user', addUser)
      .then(() => {
          fetchUserData();
          setAddUser({
            user_name: ""
          });
        
      })
      .catch((error) => {
        console.log('Error adding data in user.js:', error);
      });
  };
  
    //DELETE user DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/user/${deleteId}`)
        .then(() => {
          fetchUserData();
        })
        .catch((error) => {
          console.log('Error deleting user data in user.js:', error);
        });
    }
  };
 
  //EDIT user DATA
  const [userEdit, setUserEdit] = useState({
    user_name: ""
  });
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setUserEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  }

  const handleUserEdit = (editId) => {
  axios
    .get(`http://localhost:5000/user/${editId}`)
    .then((response) => {
      setUserEdit(response.data[0]);
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
};

const handleSaveEditData = (user_id) => {
  axios.put(`http://localhost:5000/user/${user_id}`, userEdit)
    .then(() => {
      fetchUserData();
    })
    .catch((error) => {
      console.log('Error updating user data:', error);
    });
};

  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={saveUserData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD USER</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">user_name:</label>
                  <input type="text" className="form-control" name="user_name" placeholder="Enter  user_name..." onChange={handleUserChange} />
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT USER</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
             
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">user_name</label>
                <input type="text" className="form-control" name='user_name'  onChange={handleEditChange} value={userEdit.user_name} />
              </div>

              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(userEdit.user_id) }}>Save</button>
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
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>USER MASTER</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD USER
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
            <th width="10%"  style={{color: "#5caebe"}}>User_name</th>
            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>

          </tr>
        </thead>
        <tbody>
            {
              userData.map((user) => {
                return (
                  <tr key={user.user_id}>
                    <th>{user.user_id}</th>
                    <td>{user.user_name}</td>

                    <td>
                      <div className="dropdown">
                        <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <span>
                            <li>
                              <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleUserEdit(user.user_id) }}><i class="fa-solid fa-user-pen" style={{ color: "#259745" }}></i> Edit</button>

                              <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(user.user_id) }}><i class="fa-solid fa-trash-can" style={{ color: "#E53E30" }}></i> Delete</button>
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
