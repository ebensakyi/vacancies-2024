"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GradeIntrepretation = ({interpretations}:any) => {
  const [name, setName] = useState("");

  const save = async () => {
    try {
       if (name == "") return toast.error("Data not saved. Enter sex");

    const response = await axios.post("/api/admin/grade-interpretation", { data: name });
    if (response.status == 1) {
      setName("");
      return toast.success("Data saved successfully");
    }
    if (response.status == 0) return toast.error("Data not saved");
    } catch (error) {
      
    }
   
  };
 
  return (
    <>
     <div className="col-xl-12">
       <ToastContainer
        position="top-right"
        autoClose={15000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">ADD</h4>
        </div>
        <div className="card-body">
          <form method="POST">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <div className="mb-3 position-relative">
                      <label htmlFor="grade">
                        Interpretation : <span className="danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control required"
                        placeholder="Eg. Fail, Pass"
                        id="grade"
                  
                        onChange={(e:any) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
               
               

                <div className="col-md-3">
                  <div className="form-group">
                    <div className="mb-3 position-relative">
                      <label htmlFor="addToTable">
                        Add <span className="danger"></span>
                      </label>
                      <br />
                      <button
                        type="button"
                        id="addToTable"
                        className="btn btn-success  add"
                        onClick={(e:any) => {
                          e.preventDefault();
                          save();
                        }}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">LIST</h4>

          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {interpretations.map((data:any) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm waves-effect waves-light"
                        >
                          <i className="dripicons-trash" />
                        </button>
                      </td>{" "}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default GradeIntrepretation;
