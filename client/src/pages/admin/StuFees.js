import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function AllClass() {
  const [stuClassData, setStuClassData] = useState([]);// please do not change in this line
  const [stuData, setStuData] = useState([]);// please do not change in this line

  const [stuFeesData, setStuFeesData] = useState([]);
  const [addStuFees, setAddStuFees] = useState({
    stu_id:"",
    class_id: "",
    amount: "",
    year: ""
  });

  const [stuFeesEdit, setStuFeesEdit] = useState({
    stu_fees_id: "",
    stu_id:"",
    class_id: "",
    amount: "",
    year: ""
  });

  useEffect(() => {
    fetchStuClassData();
    fetchstuFeesData();
    fetchStuData();

  }, []);

// FETCH STU_CLASS DATA
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

  // FETCH STUDENT DATA

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

// start here editig....................

// FETCH ALL_CLASS DATA

  const fetchstuFeesData = () => {
    axios
      .get('http://localhost:5000/stufees')
      .then((response) => {
        setStuFeesData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching stuFees data in stuFees.js:', error);
      });
  };

  const handleStuFeesChange = (event) => {
    const { name, value } = event.target;
    setAddStuFees((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClassSelect = (event) => {
    setAddStuFees((prevData) => ({
      ...prevData,
      class_id: event.target.value
    }));
  };

  const handleStudentSelect = (event) => {
    setAddStuFees((prevData) => ({
      ...prevData,
      stu_id: event.target.value
    }));
  };

  const savestuFeesData = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/stufees', addStuFees)
      .then(() => {
        fetchstuFeesData();
        setAddStuFees({
          stu_id:"",
          class_id: "",
          amount: "",
          year: ""
        });
      })
      .catch((error) => {
        console.log('Error adding data in stuFees.js:', error);
      });
  };

  // DELETE ALL_CLASS DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/stufees/${deleteId}`)
        .then(() => {
          fetchstuFeesData();
        })
        .catch((error) => {
          console.log('Error deleting stufees data in stufees.js:', error);
        });
    }
  };

  // EDIT ALL_CLASS DATA

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setStuFeesEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };

  const handlestuFeesEdit = (editId) => {
    axios
      .get(`http://localhost:5000/stufees/${editId}`)
      .then((response) => {
        setStuFeesEdit(response.data[0]);
      })
      .catch((error) => {
        console.log('Error fetching stufees data:', error);
      });
  };

  const handleSaveEditData = (stu_fees_id) => {
    axios.put(`http://localhost:5000/stufees/${stu_fees_id}`, stuFeesEdit)
      .then(() => {
        fetchstuFeesData();
      })
      .catch((error) => {
        console.log('Error updating stufees data:', error);
        alert("Class_id may already exist in the storage. Please enter a valid class_id.");
      });
  };

  const handleEditClassChange = (event) => {
    const { name, value } = event.target;
    setStuFeesEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };

  const handleEditStudentChange = (event) => {
    const { name, value } = event.target;
    setStuFeesEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };


  const getClassNames = (classId) => {
    const classInfo = stuClassData.find((classInfo) => classInfo.class_id === classId);
    return classInfo ? classInfo.class_name : '';
  };
  
  const getStuNames = (stuId) => {
    const stuInfo = stuData.find((stuInfo) => stuInfo.stu_id === stuId);
    return stuInfo ? stuInfo.f_name : '';
  };
  
  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={savestuFeesData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD STUDENT FEES</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               
              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Name:</label>
                    <select className="form-select" name="student_name" aria-label="Default select example" onChange={handleStudentSelect}>
                        <option value="">Select Student</option>
                        {
                            stuData.map((option) => (
                                <option key={option.stu_id} value={option.stu_id}>
                                    {option.f_name}
                                </option>
                            ))
                        }
                    </select>
                </div>

              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Class Name:</label>
                    <select className="form-select" name="class_name" aria-label="Default select example" onChange={handleClassSelect}>
                        <option value="">Select Class</option>
                        {
                            stuClassData.map((option) => (
                                <option key={option.class_id} value={option.class_id}>
                                    {option.class_name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">amount:</label>
                  <input type="text" className="form-control" name="amount" placeholder="Enter  amount..." onChange={handleStuFeesChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">year:</label>
                  <input type="text" className="form-control" name="year" placeholder="Enter  year..." onChange={handleStuFeesChange} />
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT STUDENT FEES</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
                
              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Student Name:</label>
                    <select className="form-select" name="stu_id" aria-label="Default select example" value={stuFeesEdit.stu_id}  onChange={handleEditStudentChange}>
                        <option value="">Select Student</option>
                        {
                            stuData.map((option) => (
                                <option key={option.stu_id} value={option.stu_id}>
                                    {option.f_name}
                                </option>
                            ))
                        }
                    </select>
                </div>

              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Class Name:</label>
                    <select className="form-select" name="class_id" aria-label="Default select example" value={stuFeesEdit.class_id}  onChange={handleEditClassChange}>
                        <option value="">Select Class</option>
                        {
                            stuClassData.map((option) => (
                                <option key={option.class_id} value={option.class_id}>
                                    {option.class_name}
                                </option>
                            ))
                        }
                    </select>
                </div>
             
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">amount:</label>
                <input type="text" className="form-control" name='amount'  onChange={handleEditChange} value={stuFeesEdit.amount} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">year:</label>
                <input type="text" className="form-control" name='year'  onChange={handleEditChange} value={stuFeesEdit.year} />
              </div>

              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(stuFeesEdit.stu_fees_id) }}>Save</button>
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
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>STUDENT FEES</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD STU_FEES
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
              <th scope="col" width="5%"  style={{color: "#5caebe"}}>Stu_Fees_Id</th>
              <th width="10%"  style={{color: "#5caebe"}}>Student_name</th>
            <th width="10%"  style={{color: "#5caebe"}}>Class_name</th>
            <th width="10%"  style={{color: "#5caebe"}}>amount</th>
            <th width="10%"  style={{color: "#5caebe"}}>Year</th>
            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>

          </tr>
        </thead>
        <tbody>
          {
            stuFeesData.map((allClass) => {
              return (
                <tr key={allClass.stu_fees_id}>
                  <th>{allClass.stu_fees_id}</th>
                  <td>{getStuNames(allClass.stu_id)}</td>
                  <td>{getClassNames(allClass.class_id)}</td>
                  <td>{allClass.amount}</td>
                  <td>{allClass.year}</td>


                  <td>
                    <div className="dropdown">
                      <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <span>
                        <li>
                          <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handlestuFeesEdit(allClass.stu_fees_id) }}><i class="fa-solid fa-user-pen" style={{color: "#259745"}}></i> Edit</button>

                          <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(allClass.stu_fees_id) }}><i class="fa-solid fa-trash-can" style={{color: "#E53E30"}}></i> Delete</button>
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
