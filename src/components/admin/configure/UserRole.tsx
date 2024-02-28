"use client"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";

const UserRole = ({ data }: any) => {


  const [name, setName] = useState("");
  const [accessibleJobs, setAccessibleJobs] = useState([])
  const [accessiblePages, setAccessiblePages] = useState([])

  const save = async () => {
    try {
      if (name == "" || accessibleJobs.length == 0 || accessiblePages.length == 0) return toast.error("Enter user role");

      const response = await axios.post("/api/admin/configure/user-role", { data });
      if (response.status == 200) {
        setName("");
        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) {

    }

  };

  const onSelect = (selectedList: [], selectedItem: any) => {

    // setAccessibleJobs(...accessibleJobs, { 'jobId': selectedItem });
    setAccessibleJobs(selectedItem?.id);

  };

  const onRemove = (selectedList: [], removedItem: any) => {

    // const filtered = accessibleJobs.filter((m) => m?.id !== removedItem?.id);
    setAccessibleJobs(selectedList)

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
                  <h4 className="mb-0">USER ROLES</h4>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-xl-6">
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
                <div className="card border border-">
                  <div className="card-header">
                    <h4 className="card-title">ADD</h4>
                  </div>
                  <div className="card-body">
                    <form method="POST">
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group">
                            <div className="mb-5 position-relative">
                              <label htmlFor="jobName">
                                Role name: <span className="danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                onChange={(e: any) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-4 position-relative">
                              <label htmlFor="policy">
                                Select pages :{" "}
                                <span className="danger">*</span>
                              </label>
                              <Multiselect
                                options={data?.pages?.response}
                                //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                onSelect={onSelect}
                                onRemove={onRemove}
                                displayValue="name"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-4 position-relative">
                              <label htmlFor="policy">
                                Select accessible position(s) :
                                <span className="danger">*</span>
                              </label>
                              <Multiselect
                                options={data?.jobs?.response}
                                //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                onSelect={onSelect}
                                onRemove={onRemove}
                                displayValue="name"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <label htmlFor="save">
                              Add <span className="danger"></span>
                            </label>
                            <br />

                            <button
                              type="button"
                              className="btn btn-success add"
                              onClick={(e: any) => {
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
                <div className="card border border-">
                  <div className="card-header">
                    <h4 className="card-title">LIST</h4>
                  </div>
                  <div className="card-body">
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
                          {data?.userRole?.response?.map((data: any) => {
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

export default UserRole;
