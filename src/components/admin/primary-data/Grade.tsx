"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";

const Grade = ({ data }: any) => {
  const router = useRouter()

  const [examType, setExamType] = useState("");
  const [grade, setGrade] = useState("");
  const [interpretation, setInterpretation] = useState();




  const save = async () => {
    try {
      const data = {
        examType,
        grade,
        interpretation,
      };

      if (grade == "" || interpretation == "" || examType == "")
        return toast.error("Data not saved. Fill form");

      const response = await axios.post("/api/admin/grade", { data });
      if (response.status == 200) {
        setGrade("");
        router.refresh();
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
                  <h4 className="mb-0">GRADE</h4>
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
                <div className="col-lg-8">
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
                                    Grade : <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="grade"
                                    onChange={(e: any) => {
                                      setGrade(e.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <div className="mb-3 position-relative">
                                  <label htmlFor="examType">
                                    Examination type : <span className="danger">*</span>
                                  </label>
                                  <select
                                    className="custom-select form-control"
                                    required
                                    id="examType"
                                    onChange={(e: any) => {
                                      setExamType(e.target.value);
                                    }}
                                  >
                                    <option value="">Select exam type</option>
                                    {data?.examTypes?.response.map((data: any) => {
                                      return (
                                        <option key={data.id} value={data.id}>
                                          {data.name}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <div className="mb-3 position-relative">
                                  <label htmlFor="value">
                                    Interpretation: <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control required"
                                    id="interpretation"
                                    onChange={(e: any) => {
                                      setInterpretation(e.target.value);
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

                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">LIST</h4>

                      <div className="table-responsive" style={{height:300,  "overflowY": "scroll"}}>                        <table className="table mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Id</th>
                              <th>Grade</th>
                              <th>Interpretation</th>
                              <th>Exam type</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.grades?.response.map((data: any) => {
                              return (
                                <tr key={data.id}>
                                  <td>{data.id}</td>
                                  <td>{data.name}</td>
                                  <td>{data.interpretation}</td>
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

export default Grade;
