"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sex = ({data}:any) => {
  const [name, setName] = useState("");

  const save = async () => {
    try {
      if (name == "") return toast.error("Data not saved. Enter sex");

      const response = await axios.post("/api/admin/sex", { data: name });
      if (response.data.statusCode == 1) {
        setName("");
       // Router.reload(window.location.pathname);
        return toast.success("Data saved successfully");
      }
      if (response.data.statusCode == 0) return toast.error("Data not saved");
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
                          Sex : <span className="danger">*</span>
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
    </>
  );
};

export default Sex;
