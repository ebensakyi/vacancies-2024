"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import ApplicationMenu from "../ApplicationMenu";
import { useRouter } from "next/navigation";

export const SubmitApplication = ({ data }: any) => {
  const router = useRouter()
  const [contactObjection, setContactObjection] = useState("");
  const [bonded, setBonded] = useState("");
  const [bondedDetails, setBondedDetails] = useState("");
  const [confirm, setConfirm] = useState(false);

  const submit = async () => {
    try {
      const data = {
        contactObjection,
        bonded,
        bondedDetails,
      };
      if (!confirm || contactObjection == "" || bonded == "")
        return toast.error(
          "Kindly fill the form and check the confirmation checkbox"
        );
      const response = await axios.post("/api/applicant/submit-application", {
        data,
      });


      let { status } = response;

      if (status == 200) {
        router.push("/applicant/applications");
        return toast.success("Application submitted successfully");
      }
      if (status != 200)
        return toast.error("Application couldn't be submitted");
    } catch (error) {

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
              <ApplicationMenu whichLink="submit-application" />
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
              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">SUBMIT APPLICATION</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="table-responsive table-bordered">
                          <table className="table mb-0 table-primary">
                            <thead className="table-light">
                              <tr>
                                <th hidden>Id</th>
                                <th>Position(s) you are applying for</th>

                              </tr>
                            </thead>
                            <tbody>
                              {data?.selectedJobs?.response?.map((co:any) => (
                                <tr key={co.id}>
                                  <td>{co.Job.name}</td>




                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <form
                        className="needs-validation"
                        noValidate
                        method="POST"
                        id="submission-form"
                      >
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label htmlFor="contactObjection">
                                  Do you object to any contact being made with your
                                  present employers? : <span style={danger}>*</span>
                                </label>
                                <select
                                  className="custom-select form-control"
                                  id="validationTooltip02"
                                  name="contactObjection"
                                  required
                                  value={contactObjection}
                                  onChange={(e: any) => {
                                    setContactObjection(e.target.value);
                                  }}
                                >
                                  <option >Select yes/no</option>
                                  <option value={1}>Yes</option>
                                  <option value={2}>No</option>
                                </select>
                                <div className="invalid-tooltip">
                                  This field is required
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="bonded">
                                  {" "}
                                  Are you bonded to serve any government or other
                                  employers? <span style={danger}>*</span>
                                </label>
                                <select
                                  className="custom-select form-control"
                                  id="validationTooltip02"
                                  name="bonded"
                                  required
                                  value={bonded}
                                  onChange={(e: any) => {
                                    setBonded(e.target.value);
                                  }}
                                >
                                  <option >Select yes/no</option>
                                  <option value={1}>Yes</option>
                                  <option value={2}>No</option>
                                </select>
                                <div className="invalid-tooltip">
                                  This field is required
                                </div>
                              </div>
                            </div>
                            {bonded != ""  ? (
                              <div className="col-sm-4" id="bondedDetailsDiv">
                                <div className="form-group">
                                  <label htmlFor="exampleInputuname">
                                    Give details if you are bonded to serve any
                                    government or other employers
                                  </label>
                                  <div className="input-group mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="bondedDetails"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      value={bondedDetails}
                                      onChange={(e: any) => {
                                        setBondedDetails(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            <div className="col-sm-12">
                              <div className="form-check form-check-right">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="formCheckRight2"
                                  checked={confirm}
                                  onChange={(e: any) => {
                                    setConfirm(e.target.value);
                                  }}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="formCheckRight2"
                                  style={{ color: "red" }}
                                >
                                  I confirm that, I have gone through my application and I am
                                  sure every information is correct. I agree to bear the
                                  consequencies for any wrong information provided.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="form-actions mt-10">
                  <div className="col-md-12" style={{ textAlign: "end" }}>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <Link href="/applicant/references"type="button" className="btn btn-success">
                          Previous
                      </Link>
                      <Link href="/applicant/full-application"target="_blank" type="button" className="btn btn-warning">
                          Preview
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(e: any) => {
                          submit();
                        }}
                      >
                        Submit application
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const danger = { color: "red" };
