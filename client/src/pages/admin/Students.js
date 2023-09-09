import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function Students() {

  const [stuData, setStuData] = useState([]);
  const [viewStuData, setViewStuData] = useState([]);

  //ADD STUDENT DATA

  const [addStudent, setAddStudent] = useState({
    gr_number: "",
    f_name: "",
    m_name: "",
    l_name: "",
    grandf_name: "",
    nick_name: "",
    village:"",
    mobile_number: ""
  });

  useEffect(() => {
    fetchStuData();
  }, []);

  const fetchStuData = () => {
    axios
      .get('http://localhost:5000/students')
      .then((response) => {
        setStuData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching Student data in Students.js:', error);
      });
  };

  const handleStudentChange = (event) => {
    const { name, value } = event.target;
    setAddStudent((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveStudentData = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/students', addStudent)
      .then(() => {
          fetchStuData();
          setAddStudent({
            gr_number: "",
            f_name: "",
            m_name: "",
            l_name: "",
            grandf_name: "",
            nick_name: "",
            village:"",
            mobile_number: ""
          });
        
      })
      .catch((error) => {
        console.log('Error adding data in Student.js:', error);
        alert("I THINK GR_NUMBER OR NICK_NAME IS ALLREADY EXIST IN MY STORAGE please enter your true gr_number or nick_name"); // Alert for general error (if network issue, server down, etc.)
      });
  };
  
    //DELETE STUDENT DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/students/${deleteId}`)
        .then(() => {
          fetchStuData();
        })
        .catch((error) => {
          console.log('Error deleting student data in Students.js:', error);
        });
    }
  };
 
  //EDIT STUDENT DATA
  const [studentEdit, setStudentEdit] = useState({
    gr_number: "",
    f_name: "",
    m_name: "",
    l_name: "",
    grandf_name: "",
    nick_name: "",
    village:"",
    mobile_number: ""
  });
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setStudentEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  }

  const handleStudentEdit = (editId) => {
    axios
      .get(`http://localhost:5000/students/${editId}`)
      .then((response) => {
        setStudentEdit(response.data[0]);
      })
      .catch((error) => {
        console.log('Error fetching Student data:', error);
      });
  }

  const handleSaveEditData = (id) => {
    axios.put(`http://localhost:5000/students/${id}`, studentEdit)
      .then(() => {
        fetchStuData();
      })
      .catch((error) => {
        console.log('Error updating student data:', error);
        alert("I THINK GR_NUMBER OR NICK_NAME IS ALLREADY EXIST IN MY STORAGE please enter your true gr_number or nick_name");
      });
  };
  
  // VIEW STUDENT DATA
  const handleViewData = (id) => {
    axios.get(`http://localhost:5000/student/${id}`)
        .then((response) => {
            setViewStuData(response.data[0]);
            
        })
        .catch((error) => {
            console.log('Error fetching Product data:', error);
        });
};

  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={saveStudentData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD STUDENT</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">gr_number:</label>
                  <input type="text" className="form-control" name="gr_number" placeholder="Enter  gr_number..." onChange={handleStudentChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">f_name:</label>
                  <input type="text" className="form-control" name="f_name" placeholder="Enter  f_name..." onChange={handleStudentChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">m_name:</label>
                  <input type="text" className="form-control" name="m_name" placeholder="Enter  m_name..." onChange={handleStudentChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">l_name:</label>
                  <input type="text" className="form-control" name="l_name" placeholder="Enter  l_name..." onChange={handleStudentChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">grandf_name:</label>
                  <input type="text" className="form-control" name="grandf_name" placeholder="Enter  grandf_name..." onChange={handleStudentChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">nick_name:</label>
                  <input type="text" className="form-control" name="nick_name" placeholder="Enter  nick_name..." onChange={handleStudentChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">village:</label>
                  <input type="text" className="form-control" name="village" placeholder="Enter  village..." onChange={handleStudentChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">mobile_number:</label>
                  <input type="text" className="form-control" name="mobile_number" placeholder="Enter  mobile_number..." onChange={handleStudentChange} />
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT STUDENT</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">gr_number</label>
                <input type="text" className="form-control" name='gr_number' onChange={handleEditChange} value={studentEdit.gr_number} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">f_name</label>
                <input type="text" className="form-control" name='f_name'  onChange={handleEditChange} value={studentEdit.f_name} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">m_name</label>
                <input type="text" className="form-control" name='m_name'  onChange={handleEditChange} value={studentEdit.m_name} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">l_name</label>
                <input type="text" className="form-control" name='l_name'  onChange={handleEditChange} value={studentEdit.l_name} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">grandf_name</label>
                <input type="text" className="form-control" name='grandf_name'  onChange={handleEditChange} value={studentEdit.grandf_name} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">nick_name</label>
                <input type="text" className="form-control" name='nick_name'  onChange={handleEditChange} value={studentEdit.nick_name} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">village</label>
                <input type="text" className="form-control" name='village'  onChange={handleEditChange} value={studentEdit.village} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">mobile_number</label>
                <input type="text" className="form-control" name='mobile_number'  onChange={handleEditChange} value={studentEdit.mobile_number} />
              </div>

              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(studentEdit.stu_id) }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>

{/* VIEW DATA MODEL */}
<div className="modal ade" id="exampleModalView" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <form method="post">
                <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                    <h1 className="modal-title fs-5" id="exampleModalLabel">VIEW STUDENT DATA</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">id:</label>
                        <p className='vew-data'>{viewStuData.stu_id}</p>
                    </div>
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">gr_number:</label>
                        <p className='vew-data'>{viewStuData.gr_number}</p>
                    </div>
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">f_name:</label>
                        <p className='vew-data'>{viewStuData.f_name}</p>
                    </div>
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">m_name:</label>
                        <p className='vew-data'>{viewStuData.m_name}</p>
                    </div>
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">l_name:</label>
                        <p className='vew-data'>{viewStuData.l_name}</p>
                    </div>
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">grandf_name:</label>
                        <p className='vew-data'>{viewStuData.grandf_name}</p>
                    </div>
                    <div className="mb-3 px-2 even-row" >
                        <label htmlFor="exampleFormControlInput1" className="form-label">nick_name:</label>
                        <p className='vew-data'>{viewStuData.nick_name}</p>
                    </div>
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">village:</label>
                        <p className='vew-data'>{viewStuData.village}</p>
                    </div>
                    <div className="mb-3 px-2" style={{ backgroundColor: '#f5f5f5' }}>
                        <label htmlFor="exampleFormControlInput1" className="form-label">mobile_number:</label>
                        <p className='vew-data'>{viewStuData.mobile_number}</p>
                    </div>
                </div>
                <div className="modal-footer" style={{ borderTop: '1px solid #ddd' }}>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>STUDENT MASTER</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD STUDENT
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
              <th scope="col" width="5%"  style={{color: "#5caebe"}}>Stu_id</th>
            <th width="10%"  style={{color: "#5caebe"}}>GR_number</th>
            <th width="15%"  style={{color: "#5caebe"}}>F_name</th>
            <th width="15%"  style={{color: "#5caebe"}}>M_name</th>
            <th width="15%"  style={{color: "#5caebe"}}>L_name</th>
            <th width="15%"  style={{color: "#5caebe"}}>GrandF_name</th>
            <th width="15%"  style={{color: "#5caebe"}}>Nick_name</th>
            <th width="15%"  style={{color: "#5caebe"}}>Village</th>
            <th width="15%"><i class="fa-solid fa-phone" style={{color: "#5caebe"}}></i></th>
            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>


          </tr>
        </thead>
        <tbody>
          {
            stuData.map((student) => {
              return (
                <tr key={student.stu_id}>
                  <th>{student.stu_id}</th>
                  <td data-bs-toggle="modal" data-bs-target="#exampleModalView" onClick={() => { handleViewData(student.stu_id) }}>{student.gr_number}</td>
                  <td>{student.f_name}</td>
                  <td>{student.m_name}</td>
                  <td>{student.l_name}</td>
                  <td>{student.grandf_name}</td>
                  <td>{student.nick_name}</td>
                  <td>{student.village}</td>
                  <td>{student.mobile_number}</td>

                  <td>
                    <div className="dropdown">
                      <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <span>
                        <li>
                          <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleStudentEdit(student.stu_id) }}><i class="fa-solid fa-user-pen" style={{color: "#259745"}}></i> Edit</button>

                          <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(student.stu_id) }}><i class="fa-solid fa-trash-can" style={{color: "#E53E30"}}></i> Delete</button>
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
