"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Recruitment = ({ staffs }:any) => {
  const [name, setName] = useState("");
  const [staffType, setStaffType] = useState("");

  const save = async () => {
    try {
      if (name == "" || staffType == "")
        return toast.error("Data not saved. Enter sex");

      const response = await axios.post("/api/admin/recruitment", {
        data: { name, staffType },
      });
      if (response.status == 1) {
        setName("");
        setStaffType("");
        // Router.reload(window.location.pathname);
        return toast.success("Data saved successfully");
      }
      if (response.status == 0) return toast.error("Data not saved");
    } catch (error) {}
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
                  <div className="col-md-4">
                    <div className="form-group">
                      <div className="mb-6 position-relative">
                        <label htmlFor="grade">
                          Name : <span className="danger">*</span>
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
                  <div className="col-md-4">
                    <div className="form-group">
                      <div className="mb-3 position-relative">
                        <label className="form-label" htmlFor="note">
                          Staff type : <span className="danger">*</span>
                        </label>
                        <select
                          className="custom-select form-control required"
                          required
                          onChange={(e:any) => {
                            setStaffType(e.target.value);
                          }}
                        >
                          <option value="">Select staff</option>
                          {staffs.map((data:any) => (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
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
            {/* <p className="card-title-desc">
              Use one of two modifier classes to make <code>&lt;thead&gt;</code>
              s appear light or dark gray.
            </p> */}
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Staff type</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {staffs.map((r:any) => {
                    return (
                      <tr key={r.id}>
                        <td>{r.id}</td>
                        <td>{r.code}</td>
                        <td>{r.name}</td>
                        <td>{r.StaffType.name}</td>
                        {/* <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm waves-effect waves-light"
                          >
                            <i className="dripicons-trash" />
                          </button>
                        </td> */}
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

export default Recruitment;
