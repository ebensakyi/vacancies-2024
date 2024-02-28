"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

const Menu = ({menus}:any) => {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const save = async () => {
    try {
      if (name == "") return toast.error("Data not saved. Fill the form");
      const data = {
        name,
        icon,
      };
      const response = await axios.post("/api/admin/menu", { data });
      if (response.status == 200) {
        setName("");
       // Router.reload(window.location.pathname);
        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) {
      console.log(error)

    }

  };
  return (
    <>
    <div className="col-xl-6">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">ADD </h4>
        </div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <div className="mb-4 position-relative">
                    <label htmlFor="jobName">
                      Name: <span className="danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e:any) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <div className="mb-4 position-relative">
                    <label htmlFor="jobName">
                      Icon path: <span className="danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e:any) => {
                        setIcon(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="save">
                    Add <span className="danger"></span>
                  </label>
                  <br />

                  <button
                    type="button"
                    className="btn btn-success add"
                    onClick={(e:any) => {
                      e.preventDefault();
                      save();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div className="col-xl-6">
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">LIST </h4>
      </div>
      <div className="card-body">

          <div className="table-responsive">
            <table className="table mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Icon</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((data:any) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>{data.icon}</td>

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

export default Menu;
