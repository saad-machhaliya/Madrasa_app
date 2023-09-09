import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function AllClass() {
  const [stuClassData, setStuClassData] = useState([]);
  const [allClassData, setAllClassData] = useState([]);
  const [addAllClass, setAddAllClass] = useState({
    class_id: "",
    month_duration: "",
    year: ""
  });

  const [allClassEdit, setAllClassEdit] = useState({
    all_class_id: "",
    class_id: "",
    month_duration: "",
    year: ""
  });

  useEffect(() => {
    fetchStuClassData();
    fetchAllClassData();
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
// FETCH ALL_CLASS DATA

  const fetchAllClassData = () => {
    axios
      .get('http://localhost:5000/allclass')
      .then((response) => {
        setAllClassData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching allClass data in Allclass.js:', error);
      });
  };

  const handleAllClassChange = (event) => {
    const { name, value } = event.target;
    setAddAllClass((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleClassSelect = (event) => {
    setAddAllClass((prevData) => ({
      ...prevData,
      class_id: event.target.value
    }));
  };

  const saveAllClassData = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/allclass', addAllClass)
      .then(() => {
        fetchAllClassData();
        setAddAllClass({
          class_id: "",
          month_duration: "",
          year: ""
        });
      })
      .catch((error) => {
        console.log('Error adding data in allClass.js:', error);
      });
  };

  // DELETE ALL_CLASS DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/allclass/${deleteId}`)
        .then(() => {
          fetchAllClassData();
        })
        .catch((error) => {
          console.log('Error deleting allClass data in allclass.js:', error);
        });
    }
  };

  // EDIT ALL_CLASS DATA

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setAllClassEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };

  const handleAllClassEdit = (editId) => {
    axios
      .get(`http://localhost:5000/allclass/${editId}`)
      .then((response) => {
        setAllClassEdit(response.data[0]);
      })
      .catch((error) => {
        console.log('Error fetching allClass data:', error);
      });
  };

  const handleSaveEditData = (all_class_id) => {
    axios.put(`http://localhost:5000/allclass/${all_class_id}`, allClassEdit)
      .then(() => {
        fetchAllClassData();
      })
      .catch((error) => {
        console.log('Error updating allClass data:', error);
        alert("Class_id may already exist in the storage. Please enter a valid class_id.");
      });
  };

  const handleEditClassChange = (event) => {
    const { name, value } = event.target;
    setAllClassEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  };


  const getClassNames = (classId) => {
    const classInfo = stuClassData.find((classInfo) => classInfo.class_id === classId);
    return classInfo ? classInfo.class_name : '';
  };
  
  
  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={saveAllClassData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD CLASS</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               
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
                  <label htmlFor="exampleFormControlInput1" className="form-label">month_duration:</label>
                  <input type="text" className="form-control" name="month_duration" placeholder="Enter  month_duration..." onChange={handleAllClassChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">year:</label>
                  <input type="text" className="form-control" name="year" placeholder="Enter  year..." onChange={handleAllClassChange} />
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
                <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT CLASS</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Class Name:</label>
                    <select className="form-select" name="class_id" aria-label="Default select example" value={allClassData.class_id}  onChange={handleEditClassChange}>
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
                <label htmlFor="inputPassword5" className="form-label">month_duration:</label>
                <input type="text" className="form-control" name='month_duration'  onChange={handleEditChange} value={allClassEdit.month_duration} />
              </div>
              <div className="modal-body">
                <label htmlFor="inputPassword5" className="form-label">year:</label>
                <input type="text" className="form-control" name='year'  onChange={handleEditChange} value={allClassEdit.year} />
              </div>

              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(allClassEdit.all_class_id) }}>Save</button>
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
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>ALL CLASS</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD CLASS
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
            <th width="10%"  style={{color: "#5caebe"}}>Month_duration</th>
            <th width="10%"  style={{color: "#5caebe"}}>Year</th>
            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>

          </tr>
        </thead>
        <tbody>
          {
            allClassData.map((allClass) => {
              return (
                <tr key={allClass.all_class_id}>
                  <th>{allClass.all_class_id}</th>
                  <td>{getClassNames(allClass.class_id)}</td>
                  <td>{allClass.month_duration}</td>
                  <td>{allClass.year}</td>


                  <td>
                    <div className="dropdown">
                      <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <span>
                        <li>
                          <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleAllClassEdit(allClass.all_class_id) }}><i class="fa-solid fa-user-pen" style={{color: "#259745"}}></i> Edit</button>

                          <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(allClass.all_class_id) }}><i class="fa-solid fa-trash-can" style={{color: "#E53E30"}}></i> Delete</button>
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
