"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { ADMIN_LOGIN_URL } from "@/constants";
import { redirect } from "next/navigation";
const SetupPortal = ({ data }: any) => {
  
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(ADMIN_LOGIN_URL);
    }
  })
  const [currentRecruitment, setCurrentRecruitment] = useState("");
  const [currentShortlisting, setCurrentShortlisting] = useState("");

  const save = async () => {
    try {
      if (currentRecruitment == "" || currentShortlisting == "")
        return toast.error("Please set recruitment type and shortlisting type");

      const response = await axios.post("/api/admin/setup-portal", {
        data: { currentRecruitment, currentShortlisting },
      });
      if (response.status == 200) {
        setCurrentRecruitment("");
        setCurrentShortlisting("");

        //Router.reload(window.location.pathname);
        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) { }
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
                  <h4 className="mb-0">SET-UP RECRUITMENT PORTAL</h4>
                </div>
              </div>
            </div>
            <div className="row">
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
              <div className="col-xl-8">
                <div className="card">
                  {/* <div className="card-header">
            <h4 className="card-title">ADD</h4>
          </div> */}
                  <div className="card-body">
                    <form method="POST">
                      <div className="card-body">
                        <div className="alert alert-danger" role="alert">
                          This allows applicants applications to be attached to a right recruitment and shortlisting
                          Wrongfully set-up would wrongfully affect the recruitment
                          process. Make sure you understand what you are doing
                        </div>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <div className="mb-6 position-relative">
                                <label htmlFor="grade">
                                  Select Current Recruitment :
                                  <span className="danger">*</span>
                                </label>
                                <select
                                  className="custom-select form-control "
                                  required
                                  onChange={(e: any) => {
                                    setCurrentRecruitment(e.target.value);
                                  }}
                                >
                                  <option value="">
                                    Select staff you are recruiting
                                  </option>
                                  {data?.recruitments?.response?.map((st: any) => (
                                    <option key={st.id} value={st.id}>
                                      {st.name} - {st?.StaffType?.name}
                                    </option>
                                  ))}{" "}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group">
                              <div className="mb-6 position-relative">
                                <label htmlFor="grade">
                                  Select Current Shortlisting :
                                  <span className="danger">*</span>
                                </label>
                                <select
                                  className="custom-select form-control "
                                  required
                                  onChange={(e: any) => {
                                    setCurrentShortlisting(e.target.value);
                                  }}

                                >
                                  <option value="">Select shortlisting</option>
                                  {data?.recruitments?.response?.map((st: any) => (
                                    <option key={st.id} value={st.id}>
                                      {st.name} - {st.StaffType.name}
                                    </option>
                                  ))}{" "}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-2">
                            <div className="form-group">
                              <div className="mb-3 position-relative">
                                <label htmlFor="addToTable">
                                  Set
                                  <span className="danger"></span>
                                </label>
                                <br />
                                <button
                                  type="button"
                                  onClick={(e: any) => {
                                    e.preventDefault();
                                    save();
                                  }}
                                  className="btn btn-success  add"
                                >
                                  <i className="fas fa-plus-circle"></i>
                                  {""}
                                  Save
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
              <div className="col-xl-4">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Current set-up</h4>
                  </div>
                  <div className="card-body">
                    <form method="POST">
                      <div className="card-body">
                        <div className="row">
                          <span>
                            Recruitment:
                            <h5>{data?.currentSetup?.response?.currentRecruitment
?.Recruitment?.name}</h5>
                          </span>
                          {/* <span>
                            Staff type:
                            <h5>{data?.currentSetup?.response?. }</h5>
                          </span> */}
                          {/* <span>
                            Year:
                          </span> */}
                        </div>
                        <hr />
                        <div className="row">
                          <span>
                            Shortlisting:
                            <h5>{data?.currentSetup?.response?.currentShortlisting
?.Recruitment?.name}</h5>
                          </span>
                          {/* <span>
                            Staff type:
                          </span>
                          <span>
                            Year:
                          </span> */}
                        </div>
                      </div>
                    </form>
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

export default SetupPortal;
