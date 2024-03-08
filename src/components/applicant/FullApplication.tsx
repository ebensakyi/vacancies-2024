"use client"
import ReactHtmlParser from "react-html-parser";

import { useRef, useEffect } from "react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/constants";
import { redirect } from "next/navigation";

const FullApplication = ({ data }: any) => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(LOGIN_URL);
    }
  })
  return (
    <div id="layout-wrapper">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <button
                    className="btn btn-warning add"
                    onClick={() => {
                      const printContents =
                        document.getElementById("printableArea").innerHTML;
                      const originalContents = document.body.innerHTML;
                      document.body.innerHTML = printContents;
                      window.print();
                      document.body.innerHTML = originalContents;
                    }}
                  >
                    {" "}
                    <i className="fa fa-fw fa-print" />
                    Print application
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12" >

                {/* <div className="card">
                  <div className="card-header"> */}
                {/* <h4 className="card-title">ADD</h4> */}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="card">
                    <br />


                    <hr />
                    <div className="row">
                      <div className="col-lg-12 " id="printableArea"> <h3 className="row align-items-center justify-content-center">
                        {data?.application?.response?.positions.map((pos: any) => {
                          return <h6 key={pos.Job.id}>{pos.Job.name}</h6>
                        })}

                      </h3>
                        <div>
                          <img
                            src="/logo.png"
                            alt=""
                            height="120"
                            width="110"
                            className="logo logo-dark"
                          />
                          <br />
                          <h3 className="row align-items-center justify-content-center">

                            {`${data?.application?.response?.fullApplication?.User?.firstName}  ${data?.application?.response?.fullApplication?.User?.otherNames || ""}  ${data?.application?.response?.fullApplication?.User?.surname || ""
                              }`}
                          </h3>
                        </div>
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-id-badge" />
                              <span className="hide-menu">
                                PERSONAL PARTICULARS
                              </span>
                            </h4>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  {/* <center>
                                <div
                                  style={{
                                    width: 400,
                                    borderStyle: "double",
                                    borderWidth: 2,
                                    borderColor: "black",
                                  }}
                                >
                                  <h3 style={{ marginTop: 10 }}>
                                    {jobs.map((j:any) => {
                                      let job = `${j.Job.name}, `;
                                      job = job.substring(0, job.length - 1);
                                      return job;
                                    })}
                                  </h3>
                                </div>
                              </center> */}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="firstName"> First name :</label>
                                  <input
                                    type="text"
                                    className="form-control "
                                    required
                                    id="firstName"
                                    name="firstName"
                                    defaultValue={data?.application?.response?.fullApplication?.User?.firstName}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="surName"> Surname :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="surName"
                                    defaultValue={data?.application?.response?.fullApplication?.User?.surname}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="otherName">
                                    {" "}
                                    Other name(s) :{" "}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="otherName"
                                    value={data?.application?.response?.fullApplication?.User?.otherNames}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="presentAddress">
                                    {" "}
                                    Present address :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="presentAddress"
                                    value={data?.application?.response?.fullApplication?.User?.Personal.presentAddress}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="dateBirth">
                                    {" "}
                                    Date of birth :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="dateBirth"
                                    value={moment(data?.application?.response?.fullApplication?.User?.Personal.dob).format("DD-MM-YYYY")}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="sex"> Sex : </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="sex"
                                    defaultValue={data?.application?.response?.fullApplication?.User?.Personal.Sex.name}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="hometown">Hometown :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="homeTown"
                                    defaultValue={data?.application?.response?.fullApplication?.User?.Personal.hometown}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="placeBirth">
                                    {" "}
                                    Place of birth :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="placeBirth"
                                    defaultValue={data?.application?.response?.fullApplication?.User?.Personal.birthPlace}
                                    readOnly
                                  />{" "}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="maritalStatus">
                                    {" "}
                                    Marital status :
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    defaultValue={data?.application?.response?.fullApplication?.User?.Personal.MaritalStatus.name}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="childrenNumber">
                                    {" "}
                                    Number of children :
                                    <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="childrenNumber"
                                    required
                                    defaultValue={data?.application?.response?.fullApplication?.User?.Personal.childrenNumber}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="emailAddress">
                                    {" "}
                                    Email Address :
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control email-inputmask"
                                    required
                                    id="emailAddress"
                                    defaultValue={data?.application?.response?.fullApplication?.User?.email}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="phoneNumber">
                                    Phone Number : <span className="danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control phone-inputmask"
                                    id="phoneNumber"
                                    required
                                    defaultValue={data?.application?.response?.fullApplication?.User?.phoneNumber}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="residenceTel">
                                    {" "}
                                    Tel Residence / Other number :{" "}
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control phone-inputmask"
                                    id="residenceTel"
                                    required
                                    defaultValue={data?.application?.response?.fullApplication?.User?.Personal.residenceTel}
                                    readOnly
                                  />
                                </div>
                              </div>
                              {/* <div className="col-md-4">
                                    <div className="form-group">
                                      <label htmlFor="haveKids">
                                        {" "}
                                        Do you have any kids:
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control phone-inputmask"
                                        id="residenceTel"
                                        required
                                        defaultValue={data?.application?.response?.fullApplication?.User?.Personal.haveKids}
                                        readOnly
                                      />
                                      
                                      <div className="invalid-tooltip">
                                        Children is required
                                      </div>
                                    </div>
                                  </div> */}
                            </div>

                            <div className="row">
                              <div className="col-sm-3">
                                <div className="form-group">
                                  <label htmlFor="exampleInputuname">
                                    Number of children
                                  </label>
                                  <div className="input-group mb-3">
                                    <input
                                      type="number"
                                      className="form-control"

                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      required
                                      data-error="Number of children is required."
                                      defaultValue={data?.application?.response?.fullApplication?.User?.Personal.childrenNumber}

                                    />

                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-3">
                                <div className="form-group">
                                  <label htmlFor="exampleInputuname">
                                    Number of Sons & Ages
                                  </label>
                                  <div className="input-group mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="sonNumber"
                                      id="sonNumber"
                                      aria-label="Username"
                                      aria-describedby="basic-addon1"
                                      required
                                      data-error="Number of children is required."
                                      defaultValue={data?.application?.response?.fullApplication?.User?.Personal.sonsInfo}

                                    />

                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-3">
                                <div className="form-group">
                                  <label htmlFor="exampleInputuname">
                                    Number of Daughters & Ages
                                  </label>
                                  <div className="input-group mb-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="daughterNumber"
                                      id="daughterNumber"
                                      aria-label="daughterNumber"
                                      aria-describedby="basic-addon1"
                                      required
                                      defaultValue={data?.application?.response?.fullApplication?.User?.Personal.daughtersInfo}

                                    />

                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-book" />
                              <span className="hide-menu">
                                {" "}
                                DETAILS OF EDUCATION
                              </span>
                            </h4>
                          </div>
                          <div className="card-body">
                            {/* row */}
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="table-responsive">
                                  <table
                                    className="table full-color-table "
                                    id="educationTable"
                                  >
                                    <thead>
                                      <tr>
                                        <th hidden>Id</th>
                                        <th>Education Level</th>
                                        <th>Institution</th>
                                        <th>Start</th>
                                        <th>End</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data?.application?.response?.fullApplication?.User?.SchoolAttended.map((e: any) => (
                                        <tr key={e.id}>
                                          <td>{e.EducationLevel.name}</td>
                                          <td>{e.institutionName}</td>
                                          <td>{e.institutionStart}</td>
                                          <td>{e.institutionEnd}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="row">
                          <div className="col-lg-12">
                            <div className="card">
                              <div className="card-header bg-info">
                                <h4 className="m-b-0 text-white">
                                  <i className="ti-write" />
                                  <span className="hide-menu">EXAMINATIONS TAKEN</span>
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table
                                    className="table full-color-table "
                                    id="examinationTable"
                                  >
                                    <thead>
                                      <tr>
                                        <th>Year</th>
                                        <th>Exam</th>
                                        <th>Subject</th>
                                        <th>Grade</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data?.application?.response?.fullApplication?.User?.GradesObtained.map((e: any) => (
                                        <tr key={e.id}>
                                          <td>{e.year}</td>
                                          <td>{e.ExamType.name}</td>
                                          <td>{e.Subject.name}</td>
                                          <td>{e.Grade.name}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-book" />
                              <span className="hide-menu"> CERTIFICATIONS</span>
                            </h4>
                          </div>
                          <div className="card-body">
                            {/* row */}
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="table-responsive">
                                  <table className="table full-color-table ">
                                    <thead>
                                      <tr>
                                        <th>Institution</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Certificate</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data?.application?.response?.fullApplication?.User?.Certificate.map((e: any) => (
                                        <tr key={e.id}>
                                          <td>{e.institution}</td>
                                          <td>{e.from}</td>
                                          <td>{e.to}</td>
                                          <td>{e.certificateObtained}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-briefcase" />
                              <span className="hide-menu">
                                DETAILS OF EMPLOYMENT
                              </span>
                            </h4>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table
                                className="table full-color-table"
                                id="employmentTable"
                              >
                                <thead>
                                  <tr>
                                    <th>Organization</th>
                                    <th>Position</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Salary</th>
                                    <th>Reason for leaving</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.application?.response?.fullApplication?.User?.Employment.map((e: any) => (
                                    <tr key={e.id}>
                                      <td>{e.organizationName}</td>
                                      <td>{e.position}</td>
                                      <td>{e.start}</td>
                                      <td>{e.end}</td>
                                      <td>{e.salary}</td>
                                      <td>{e.leavingReason}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-star" />
                              <span className="hide-menu">PUBLICATION</span>
                            </h4>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table
                                className="table full-color-table "
                                id="referenceTable"
                              >
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Title</th>
                                    <th>Url</th>
                                    <th>Authors</th>
                                    <th>Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.application?.response?.fullApplication?.User?.Publication.map((e: any) => (
                                    <tr key={e.id}>
                                      <td>{e.date}</td>
                                      <td>{e.title}</td>
                                      <td>{e.url}</td>
                                      <td>{e.authors}</td>
                                      <td>{e.description}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-star" />
                              <span className="hide-menu">
                                WHY DO YOU WANT TO JOIN?
                              </span>
                            </h4>
                          </div>
                          <div className="card-body">
                            {ReactHtmlParser(data?.application?.response?.fullApplication?.User?.Essay.essay)}
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-star" />
                              <span className="hide-menu">REFERENCES</span>
                            </h4>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table
                                className="table full-color-table "
                                id="referenceTable"
                              >
                                <thead>
                                  <tr>
                                    <th hidden>Id</th>
                                    <th>Name</th>
                                    <th>Occupation</th>
                                    <th>Address</th>
                                    <th>Phone number</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.application?.response?.fullApplication?.User?.Reference.map((e: any) => (
                                    <tr key={e.id}>
                                      <td>{e.name}</td>
                                      <td>{e.occupation}</td>
                                      <td>{e.address}</td>
                                      <td>{e.phone}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header bg-info">
                      <h4 className="m-b-0 text-white">
                        <i className="ti-star" />
                        <span className="hide-menu">OTHER DETAILS</span>
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="bonded">
                              Are you bonded to serve any government or other
                              employers? :
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              required
                              id="bonded"
                              name="firstName"
                              defaultValue={
                                data?.application?.response?.fullApplication?.User?.Bonded ? data?.application?.response?.fullApplication?.User?.Bonded.YesNo.value : null
                              }
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="details">
                              Give details if you are bonded to serve any
                              government or other employers :
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              required
                              id="details"
                              defaultValue={
                                data?.application?.response?.fullApplication?.User?.Bonded ? data?.application?.response?.fullApplication?.User?.Bonded.details : null
                              }
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="bonded">
                              Do you object to any contact being made with your
                              present employers? :
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              required
                              id="bonded"
                              name="firstName"
                              defaultValue={
                                data?.application?.response?.fullApplication?.User?.Confirmation
                                  ? data?.application?.response?.fullApplication?.User?.Confirmation.YesNo.value
                                  : null
                              }
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default FullApplication;
