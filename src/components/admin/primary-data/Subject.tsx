"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";

const Subject = ({ data }: any) => {
  const router = useRouter()

  const [name, setName] = useState("");
  const [examType, setExamType] = useState("");
  const [subjectType, setSubjectType] = useState("");


  
  const save = async () => {
    try {
      if (examType == "" || name == ""||   subjectType=="")
        return toast.error("Data not saved. Fill the form");
      const data = {
        name,
        examType,
        subjectType,
      };
      const response = await axios.post("/api/primary-data/subject", { data });
      if (response.status == 200) {
        setName("");
        setSubjectType("");
        setExamType("");

        router.refresh()
        return toast.success("Data saved successfully");
      }
      if (response.status != 200)  return toast.error("Data not saved");
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
                  <h4 className="mb-0">SUBJECT</h4>
                </div>
              </div>
            </div>
            <div className="row" >

                <div className="col-xl-7">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">ADD </h4>
                    </div>
                    <div className="card-body">
                      <form method="POST">
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <div className="mb-3 position-relative">
                                  <label htmlFor="examType">
                                    Examination type : <span className="danger">*</span>
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    required
                                    onChange={(e: any) => {
                                      setExamType(e.target.value);
                                    }}
                                  >
                                    <option value="">Select exam type</option>
                                    {data?.examTypes?.response?.map((data: any) => {
                                      return (
                                        <option key={data.id} value={data.id}>
                                          {data.name}
                                        </option>
                                      );
                                    })}{" "}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <div className="mb-3 position-relative">
                                  <label htmlFor="examType">
                                    Subject type : <span className="danger">*</span>
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    required
                                    onChange={(e: any) => {
                                      setSubjectType(e.target.value);
                                    }}
                                  >
                                    <option value="">Select subject type</option>
                                    {data?.subjectTypes?.response?.map((data: any) => {
                                      return (
                                        <option key={data.id} value={data.id}>
                                          {data.name}
                                        </option>
                                      );
                                    })}{" "}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <div className="mb-3 position-relative">
                                  <label htmlFor="grade">
                                    Name of subject : <span className="danger">*</span>
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

                            <div className="col-md-2">
                              <div className="form-group">
                                <div className="mb-2 position-relative">
                                  <label htmlFor="addToTable">
                                    Add <span className="danger"></span>
                                  </label>
                                  <br />
                                  <button
                                    type="button"
                                    className="btn btn-success  add"
                                    onClick={(e: any) => {
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

                <div className="col-lg-5" >
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">SUBJECTS</h4>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive" style={{height:300,  "overflowY": "scroll"}}>
                        <table
                          className="table full-color-table full-info-table"
                          id="datatable"
                        >
                          <thead>
                            <tr>
                              {/* <th>Id</th> */}

                              <th>Subject</th>
                              <th>Subject type</th>

                              <th>Exam type</th>
                              <th>Remove</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.subjects?.response?.map((data: any) => {
                              return (
                                <tr key={data.id}>
                                  {/* <td>{data.id}</td> */}
                                  <td>{data.name}</td>
                                  <td>{data.SubjectType.name}</td>
                                  <td>{data.ExamType.name}</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subject;
