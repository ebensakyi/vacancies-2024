"use client"
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { useRouter } from "next/navigation";


const UserRole = ({ data }: any) => {
  const router = useRouter()
  console.log(data);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  // const [accessibleJobs, setAccessibleJobs] = useState([])
  const [accessiblePages, setAccessiblePages] = useState([])

  const save = async () => {
    try {
      if (name == "") {
        return toast.error("Enter user role");
      }
      if (accessiblePages.length == 0) {
        return toast.error("Enter select one or more pages");
      }
      let data = {
        name,
        accessiblePages
      }



      const response = await axios.post("/api/admin/configure/user-role", { data });
      if (response.status == 200) {
        setName("");
        setAccessiblePages([])
        router.refresh()

        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) {

    }

  };

  const deleteUserRole = async (id: any) => {
    try {
      const data = {
        id,

      };


      const response = await axios.delete("/api/admin/configure/user-role", { data });
      if (response.status == 200) {
        router.refresh()

        return toast.success("Data deleted successfully");
      }
      if (response.status != 200) return toast.error("Data not deleted");
    } catch (error) {

    }

  };
  const update = async () => {
    try {
      const data = { id, name, accessiblePages };
      if (name == "" || accessiblePages.length == 0)
        return toast.error("Data not saved. Fill form");

      const response = await axios.put("/api/admin/configure/user-role", { data });
      if (response.status == 200) {
        setId("");
        setName("");
        setAccessiblePages([])
        router.refresh()

        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) {

    }

  };
  const onSelectPages = (selectedList: any, selectedItem: any) => {

    console.log(selectedItem);
    setAccessiblePages(selectedList)

    // setAccessiblePages([...selectedItem, selectedItem]);

  };

  const onRemovePage = (selectedList: [], removedItem: any) => {

    // const filtered = accessibleJobs.filter((m) => m?.id !== removedItem?.id);
    setAccessiblePages(selectedList)

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
                                value={name}
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
                                selectedValues={accessiblePages} // Preselected value to persist in dropdown
                                onSelect={onSelectPages}
                                onRemove={onRemovePage}
                                displayValue="name"
                              />
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-4 position-relative">
                              <label htmlFor="policy">
                                Select accessible position(s) :
                                <span className="danger">*</span>
                              </label>
                              <Multiselect
                                options={data?.jobs?.response}
                                //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                onSelect={onSelectJobs}
                                onRemove={onRemoveJob}
                                displayValue="name"
                              />
                            </div>
                          </div>
                        </div> */}
                        <div className="col-md-2">
                          <div className="form-group">
                            <label htmlFor="save">
                              Add <span className="danger"></span>
                            </label>
                            <br />
                            {id == "" ? <button
                              type="button"
                              className="btn btn-success add"
                              onClick={(e: any) => {
                                e.preventDefault();

                                save();
                              }}
                            >
                              Save
                            </button> : <button
                              type="button"
                              className="btn btn-warning add"
                              onClick={(e: any) => {
                                e.preventDefault();

                                update();
                              }}
                            >
                              Update
                            </button>}

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
                            {/* <th>#</th> */}
                            <th>Name</th>
                            <th>Pages</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.userRoles?.response?.map((data: any) => {
                            return (
                              <tr key={data.id}>
                                {/* <td>{data.id}</td> */}
                                <td>{data.name}</td>
                                <td>{data.PageAccess.map((data: any) => {
                                  return <><span style={{ margin: 10 }}>{data.Page.name}</span> <br /> </>
                                })}</td>


                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm waves-effect waves-light"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setId(data.id)
                                      setName(data.name)

                                      let savedPages = data.PageAccess.map((pa:any) => {
                                        return { id: pa.Page.id, name: pa.Page.name }
                                      })


                                      setAccessiblePages(savedPages)
                                    }}
                                  >
                                    <i className="dripicons-pencil" />
                                  </button>
                                  {" "} {" "}
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm waves-effect waves-light"
                                    onClick={(e) => {
                                      deleteUserRole(data.id)
                                    }}
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
