"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";

const StaffType = ({ data }: any) => {
  const router = useRouter()

  const [name, setName] = useState("");

  const save = async () => {
    try {
      if (name == "") return toast.error("Data not saved. Enter staff type");

      const response = await axios.post("/api/primary-data/staff-type", { data: name });
      if (response.status == 200) {
        setName("");
        router.refresh()
        return toast.success("Data saved successfully");
      }
      if (response.status == 200)  return toast.error("Data not saved");
    } catch (error) {

    }

  };
  return (
    <div id="layout-wrapper">
      {/* <Header /> */}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">STAFF</h4>
                </div>
              </div>
            </div>
            <div className="row" >

              <div className="col-lg-6">
                {" "}
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
                          <div className="col-md-8">
                            <div className="form-group">
                              <div className="mb-8 position-relative">
                                <label htmlFor="grade">
                                  Staff type : <span className="danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control required"
                                  value={name}
                                  onChange={(e: any) => {
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
                                  onClick={(e: any) => {
                                    e.preventDefault();
                                    save();
                                  }}
                                  className="btn btn-success btn-md waves-effect waves-light"
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
                            {/* <th>#</th> */}
                            <th>Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.staffTypes?.response?.map((data:any) => {
                            return (
                              <tr key={data.id}>
                                {/* <td>{data.id}</td> */}
                                <td>{data.name}</td>
                                <td>
                                  {" "}
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffType;
