"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaritalStatus = ({maritalStatuses}:any) => {
  const [name, setName] = useState("");

  const save = async () => {
    try {
      if (name == "") return toast.error("Data not saved. Enter marital status");

      const response = await axios.post("/api/admin/marital-status", { data: name });
      if (response.status == 1) {
        setName("");
       // Router.reload(window.location.pathname);
        return toast.success("Data saved successfully");
      }
      if (response.status == 0) return toast.error("Data not saved");
    } catch (error) {

    }

  };
  return (
    <>
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
      <div className="col-xl-6">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">ADD</h4>
          </div>
          <div className="card-body">
            <form method="POST">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <div className="mb-6 position-relative">
                        <label htmlFor="grade">
                          MaritalStatus : <span className="danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control required"
                          value={name}
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
                          onClick={(e:any) => {
                            e.preventDefault();
                            save();
                          }}
                          className="btn btn-success  add"
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
                  {maritalStatuses.map((sex:any) => {
                    return (
                      <tr key={sex.id}>
                        <td>{sex.id}</td>
                        <td>{sex.name}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm waves-effect waves-light"
                          >
                            <i className="dripicons-trash" />
                          </button>
                        </td>
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

export default MaritalStatus;
