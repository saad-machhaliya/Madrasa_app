import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function StuClass() {

  const [stuClassData, setStuClassData] = useState([]);

  //ADD STU_CLASS DATA

  const [addStuClass, setAddStuClass] = useState({
    class_name: ""
  });

  useEffect(() => {
    fetchStuClassData();
  }, []);

  const fetchStuClassData = () => {
    axios
      .get('http://localhost:5000/stuclass')
      .then((response) => {
        setStuClassData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching StuClass data in Stuclass.js:', error);
      });
  };

  const handleStuClassChange = (event) => {
    const { name, value } = event.target;
    setAddStuClass((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveStuClassData = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/stuclass', addStuClass)
      .then(() => {
          fetchStuClassData();
          setAddStuClass({
            class_name: ""
          });
        
      })
      .catch((error) => {
        console.log('Error adding data in StuClass.js:', error);
        alert("I THINK CLASS_NAME IS ALLREADY EXIST IN MY STORAGE please enter your true class_name");
      });
  };
  
    //DELETE STU_CLASS DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/stuclass/${deleteId}`)
        .then(() => {
          fetchStuClassData();
        })
        .catch((error) => {
          console.log('Error deleting stuClass data in Stuclass.js:', error);
        });
    }
  };
 
  //EDIT STU_CLASS DATA
  const [stuClassEdit, setStuClassEdit] = useState({
    class_name: ""
  });
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setStuClassEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  }

  const handleStuClassEdit = (editId) => {
  axios
    .get(`http://localhost:5000/stuclass/${editId}`)
    .then((response) => {
      setStuClassEdit(response.data[0]);
    })
    .catch((error) => {
      console.log('Error fetching StuClass data:', error);
    });
};

const handleSaveEditData = (class_id) => {
  axios.put(`http://localhost:5000/stuclass/${class_id}`, stuClassEdit)
    .then(() => {
      fetchStuClassData();
    })
    .catch((error) => {
      console.log('Error updating stuClass data:', error);
      alert("I THINK CLASS_NAME IS ALREADY EXIST IN MY STORAGE please enter your true class_name");
    });
};

  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={saveStuClassData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD STUUDENT CLASS</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">class_name:</label>
                  <input type="text" className="form-control" name="class_name" placeholder="Enter  class_name..." onChange={handleStuClassChange} />
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT STUDENT CLASS</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
             
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">class_name</label>
                <input type="text" className="form-control" name='class_name'  onChange={handleEditChange} value={stuClassEdit.class_name} />
              </div>

              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(stuClassEdit.class_id) }}>Save</button>
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
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>STUDENT CLASS</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD STU_CLASS
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
            <th width="10%"  style={{color: "#5caebe"}}>Class_name</th>
            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>

          </tr>
        </thead>
        <tbody>
            {
              stuClassData.map((stuClass) => {
                return (
                  <tr key={stuClass.class_id}>
                    <th>{stuClass.class_id}</th>
                    <td>{stuClass.class_name}</td>

                    <td>
                      <div className="dropdown">
                        <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <span>
                            <li>
                              <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleStuClassEdit(stuClass.class_id) }}><i class="fa-solid fa-user-pen" style={{ color: "#259745" }}></i> Edit</button>

                              <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(stuClass.class_id) }}><i class="fa-solid fa-trash-can" style={{ color: "#E53E30" }}></i> Delete</button>
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
