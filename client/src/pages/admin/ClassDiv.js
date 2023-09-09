import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/admin_css/Table.css';

export default function ClassDiv() {

  const [classDivData, setClassDivData] = useState([]);

  //ADD CLASS_DIV DATA

  const [addClassDiv, setAddClassDiv] = useState({
    division: ""
  });

  useEffect(() => {
    fetchClassDivData();
  }, []);

  const fetchClassDivData = () => {
    axios
      .get('http://localhost:5000/classdiv')
      .then((response) => {
        setClassDivData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching classDiv data in classDiv.js:', error);
      });
  };

  const handleClassDivChange = (event) => {
    const { name, value } = event.target;
    setAddClassDiv((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveClassDivData = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/classdiv', addClassDiv)
      .then(() => {
          fetchClassDivData();
          setAddClassDiv({
            division: ""
          });
        
      })
      .catch((error) => {
        console.log('Error adding data in classDiv.js:', error);
      });
  };
  
    //DELETE CLASS_DIV DATA

  const handleDelete = (deleteId) => {
    const confirmDelete = window.confirm("Do you want to delete this data?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/classdiv/${deleteId}`)
        .then(() => {
          fetchClassDivData();
        })
        .catch((error) => {
          console.log('Error deleting classDiv data in classDiv.js:', error);
        });
    }
  };
 
  //EDIT CLASS_DIV DATA
  const [classDivEdit, setclassDivEdit] = useState({
    division: ""
  });
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setclassDivEdit((prevEdit) => ({
      ...prevEdit,
      [name]: value
    }));
  }

  const handleclassDivEdit = (editId) => {
  axios
    .get(`http://localhost:5000/classdiv/${editId}`)
    .then((response) => {
      setclassDivEdit(response.data[0]);
    })
    .catch((error) => {
      console.log('Error fetching classDiv data:', error);

    });
};

const handleSaveEditData = (div_id) => {
  axios.put(`http://localhost:5000/classdiv/${div_id}`, classDivEdit)
    .then(() => {
      fetchClassDivData();
    })
    .catch((error) => {
      console.log('Error updating classDiv data:', error);

    });
};

  return (
    <>
{/* ADD DATA MODEL */}
<div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form method="post"  onSubmit={saveClassDivData}>
              <div className="modal-header" style={{ backgroundColor: '#5CAEBE', color: '#fff' }}>
                <h1 className="modal-title fs-5" id="exampleModalLabel">ADD STUUDENT CLASS</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
               
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">division:</label>
                  <input type="text" className="form-control" name="division" placeholder="Enter  division..." onChange={handleClassDivChange} />
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
                <label htmlFor="inputPassword5" className="form-label">division</label>
                <input type="text" className="form-control" name='division'  onChange={handleEditChange} value={classDivEdit.division} />
              </div>

              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleSaveEditData(classDivEdit.div_id) }}>Save</button>
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
          <h1 className='text-center w-100'  style={{color: "#5caebe"}}><b>CLASS DIVISION</b>
          <button type="button" className="btn btn-info text-white rounded-pill fw-bolder px-4 me-5 mt-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
            + ADD CLASS_DIV
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
            <th width="10%"  style={{color: "#5caebe"}}>Division</th>
            <th width="15%"><i class="fa-solid fa-gear"  style={{color: "#5caebe"}}></i></th>

          </tr>
        </thead>
        <tbody>
            {
              classDivData.map((classDiv) => {
                return (
                  <tr key={classDiv.div_id}>
                    <th>{classDiv.div_id}</th>
                    <td>{classDiv.division}</td>

                    <td>
                      <div className="dropdown">
                        <button className='btn' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <span>
                            <li>
                              <button type='button' className='dropdown-item' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleclassDivEdit(classDiv.div_id) }}><i class="fa-solid fa-user-pen" style={{ color: "#259745" }}></i> Edit</button>

                              <button type='button' className='dropdown-item btn btn-danger' onClick={() => { handleDelete(classDiv.div_id) }}><i class="fa-solid fa-trash-can" style={{ color: "#E53E30" }}></i> Delete</button>
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
