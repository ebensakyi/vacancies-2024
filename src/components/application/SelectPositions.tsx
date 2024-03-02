import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import Link from "next/link";
import ApplicationMenu from "../ApplicationMenu";

const SelectPositions = ({ data }: any) => {
  const [jobs, setJobs] = useState([]);



  const onSelect = async (selectedItem: any) => {
    try {
      //setJobs([...jobs, { jobId: selectedItem }]);

      const data = {
        jobId: selectedItem,
      };
      const response = await axios.post("/api/applicant/select-positions", {
        data,
      });
      if (response.status == 1) {
        //return toast.success(response.data.message);
        return Router.push("/application/select-positions");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemove = async (removedItem: any) => {
    try {
      const filtered = jobs.filter((m: any) => m.jobId !== removedItem);

      setJobs(filtered);

      const data = {
        jobId: removedItem,
      };
      const response = await axios.delete("/api/applicant/select-positions", {
        data,
      });
      if (response.status == 200) {
        // return Router.push("/applicant/select-positions");

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="layout-wrapper">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">SELECT POSITION </h4>
                </div>
              </div>
            </div>
            <div className="row">
              <ApplicationMenu whichLink="references" />
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
                  <h4 className="card-title">POSITIONS</h4>
                </div>
                <div className="card-body">
                  <span className="badge bg-success " style={{ padding: 10 }}>
                    {" "}
                    Select at least one position. Click on the checkbox to select.
                  </span>

                  {/* <h4 className="card-title">Positions</h4>
            <p className="card-title-desc">
              Click on select button to select a position. You can select
              multiple positions.
            </p> */}
                  <table
                    className="table table-striped table-bordered dt-responsive nowrap"
                    style={{
                      borderCollapse: "collapse",
                      borderSpacing: 0,
                      width: "100%",
                    }}
                  >
                    <thead>
                      <tr>
                        <th hidden>#</th>
                        <th>Position</th>
                        <th>Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.jobs?.response?.map((job: any) => {
                        return (
                          <tr key={job.id}>
                            <td hidden>{job.id}</td>
                            <td>{job.name}</td>
                            <td>
                              <div className="form-check form-check-right">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="formCheckRight2"
                                  // checked={
                                  //   selectedPositions.includes(job.id) ? true : false
                                  // }
                                  onChange={(e: any) => {
                                    if (e.target.checked) {
                                      return onSelect(job.id);
                                    }
                                    return onRemove(job.id);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="formCheckRight2"
                                  style={{ color: "green" }}
                                >
                                  Select
                                </label>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="form-actions mt-10">
                    <div className="col-md-12" style={{ textAlign: "end" }}>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <Link href="/application/references">
                          <a type="button" className="btn btn-success">
                            Previous
                          </a>
                        </Link>
                        <Link href="/application/submit-application">
                          <a type="button" className="btn btn-success">
                            Next
                          </a>
                        </Link>
                      </div>
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

export default SelectPositions;
