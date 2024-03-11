'use client'
import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";
import axios from "axios";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import _ from "lodash";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { ADMIN_LOGIN_URL } from "@/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SingleApplication = ({ data }: any) => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(ADMIN_LOGIN_URL);
    }
  })
  let cookie = Cookies.get("rt") || "";
  let menu = cookie.charAt(cookie.length - 1);

  const [rejected, setRejected] = useState(0);
  const [shortlisted, setShortlisted] = useState(0);
  const [rejectReason, setRejectReason] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');



  const handleShortlisting = async () => {
    try {
      const data = {
        rejected,
        shortlisted,
        rejectReason,
        appId: id,
      };
      const response = await axios.post(
        "/api/admin/broadsheet/shortlist",
        {
          data,
        }
      );
      //console.log("response: " + JSON.stringify(response.data));
      // Router.reload(window.location.pathname);

      let { status } = response;
      if (status== 200) {   
           toast.success(`Application vetted successfully`);

        return router.refresh();
      }
    } catch (error) { }
  };

  const addRejectReason = async (id: any) => {
    setRejectReason([...rejectReason, id]);
  };

  const removeRejectReason = async (id: any) => {
    let filtered = await rejectReason.filter((rr) => rr !== id);
    setRejectReason(filtered);
  };
  return (
    <div id="layout-wrapper">
      {/* <Header /> */}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
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
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">APPLICATION</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">APPLICATION</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Shortlist here</h4>
                          <p className="card-title-desc">
                            Select either shortlist or reject and give a reason
                          </p>

                          <div className="table-responsive">
                            <table className="table mb-0 table-bordered">
                              <thead>
                                <tr>
                                  <th>Action</th>
                                  <th>Note</th>
                                  <th>Reason for rejection</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="text-success">
                                  <td>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="formrow-customCheck"
                                        checked={shortlisted == 0 ? false : true}
                                        onChange={(e: any) => {
                                          let state = e.target.checked;
                                          if (state) {
                                            setRejected(0);
                                            setRejectReason([]);
                                            return setShortlisted(1);
                                          }
                                          setRejected(1);
                                          setShortlisted(0);
                                        }}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formrow-customCheck"
                                      >
                                        Shortlist
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    {!shortlisted ? "Not shortlisted" : "Shortlisted"}
                                  </td>
                                  <td></td>
                                </tr>

                                <tr className="text-danger">
                                  <td>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="formrow-customCheck"
                                        checked={rejected == 1 ? true : false}
                                        onChange={(e: any) => {
                                          let state = e.target.checked;
                                          if (state) {
                                            setShortlisted(0);
                                            return setRejected(1);
                                          }
                                          setRejected(0);
                                          setShortlisted(1);
                                        }}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="formrow-customCheck"
                                      >
                                        Reject
                                      </label>
                                    </div>
                                  </td>
                                  <td>{!rejected ? "Not rejected" : "Rejected"}</td>
                                  {rejected ? (
                                    <td>
                                      {data?.rejectReasons?.response.map((rr: any) => (
                                        <div key={rr.id}>
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="formrow-customCheck"
                                            onChange={(e: any) => {
                                              let isChecked = e.target.checked;
                                              if (isChecked) {
                                                return addRejectReason(rr.id);
                                              }
                                              removeRejectReason(rr.id);
                                            }}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="formrow-customCheck"
                                          >
                                            {" "}
                                            {rr.reason}
                                          </label>
                                          <br />
                                        </div>
                                      ))}
                                    </td>
                                  ) : (
                                    <td></td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                            <br />
                            <div
                              className="form-actions mt-10"
                              style={{ textAlign: "end" }}
                            >
                              <button
                                className="btn btn-success add"
                                type="button"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  handleShortlisting();
                                }}
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      {data?.application?.shortlisted != -1 ? (
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-title">Shortlist details</h4>

                            <div className="table-responsive">
                              <table className="table mb-0 table-bordered">
                                <thead>
                                  <tr>
                                    <th>Status</th>
                                    <th>Reason for rejection</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {data?.application?.response?.shortlisted == 1 ? (
                                        <span
                                          className="badge bg-success"
                                          style={{ padding: 10 }}
                                        >
                                          Shortlisted
                                        </span>
                                      ) : (
                                        <span
                                          className="badge bg-danger"
                                          style={{ padding: 10 }}
                                        >
                                          Rejected
                                        </span>
                                      )}
                                    </td>
                                    {data?.application?.shortlisted == 0 ? (
                                      <td>
                                        {data?.application?.RejectReason.map((r: any) => {
                                          return (
                                            <li
                                              style={{
                                                listStyleType: "none",
                                              }}
                                            >
                                              <ul>{r.Reason.reason}</ul>
                                            </li>
                                          );
                                        })}
                                      </td>
                                    ) : null}
                                  </tr>
                                </tbody>
                              </table>
                              <br />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <button className="btn btn-warning add"
                    onClick={() => {
                      const printContents = document.getElementById('printableArea').innerHTML;
                      const originalContents = document.body.innerHTML;
                      document.body.innerHTML = printContents;
                      window.print();
                      document.body.innerHTML = originalContents;
                    }}>            <i className="fa fa-fw fa-print" />
                    Print application</button>

                  <div id="printableArea">
                    <div className="row">
                      <div className="col-lg-12 ">
                        <center>
                          <img
                            src="/logo.png"
                            alt=""
                            height="120"
                            width="110"
                            className="logo logo-dark"
                          />
                          <br />
                          <h3>
                            {_.startCase(_.lowerCase(data?.application?.response?.User.firstName))}{" "}
                            {_.startCase(_.lowerCase(data?.application?.response?.User.otherNames || ""))}{" "}
                            {_.startCase(_.lowerCase(data?.application?.response?.User.surname))}

                          </h3>
                        </center>
                        <div className="card">
                          <div className="card-header bg-info">
                            <h4 className="m-b-0 text-white">
                              <i className="ti-id-badge" />
                              <span className="hide-menu">PERSONAL PARTICULARS</span>
                            </h4>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <center>
                                    <div
                                      style={{
                                        width: 400,
                                        borderStyle: "double",
                                        borderWidth: 2,
                                        borderColor: "black",
                                      }}
                                    >
                                      <h3 style={{ marginTop: 10 }}>
                                        {data?.application?.response?.Job.name}
                                      </h3>
                                    </div>
                                  </center>
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
                                    defaultValue={data?.application?.response?.User.firstName}
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
                                    defaultValue={data?.application?.response?.User.surname}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="otherName"> Other name(s) : </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="otherName"
                                    defaultValue={data?.application?.response?.User.otherNames}
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
                                    defaultValue={data?.application?.response?.User.Personal.address}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="dateBirth"> Date of birth :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={data?.application?.response?.User.Personal.dob}
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
                                    defaultValue={data?.application?.response?.User.Personal.Sex.name}
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
                                    defaultValue={data?.application?.response?.User.Personal.hometown}
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="placeBirth"> Place of birth :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="placeBirth"
                                    defaultValue={data?.application?.response?.User.Personal.birthPlace}
                                    readOnly
                                  />{" "}
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="maritalStatus"> Marital status :</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    required
                                    defaultValue={
                                      data?.application?.User?.Personal?.MaritalStatus?.name
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="childrenNumber">
                                    {" "}
                                    Number of children :<span className="danger">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="childrenNumber"
                                    required
                                    defaultValue={
                                      data?.application?.User?.Personal?.childrenNumber
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="form-group">
                                  <label htmlFor="emailAddress"> Email Address :</label>
                                  <input
                                    type="email"
                                    className="form-control email-inputmask"
                                    required
                                    id="emailAddress"
                                    defaultValue={data?.application?.response?.User.email}
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
                                    defaultValue={data?.application?.response?.User.phoneNumber}
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
                                    defaultValue={data?.application?.response?.User.Personal.residenceTel}
                                    readOnly
                                  />
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
                              <span className="hide-menu"> DETAILS OF EDUCATION</span>
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
                                      {data?.application?.response?.User?.SchoolAttended.map((e: any) => (
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

                    <div className="row">
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
                                  {data?.application?.response?.User?.GradesObtained?.map((e: any) => (
                                    <tr key={e.id}>
                                      <td>{e.IndexNumber.examYear}</td>
                                      <td>{e.IndexNumber.ExamType.name}</td>
                                      <td>{e.subject}</td>
                                      <td>{e.grade}</td>
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
                                      {data?.application?.response?.User.Certificate.map((e: any) => (
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
                              <span className="hide-menu">DETAILS OF EMPLOYMENT</span>
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
                                  {data?.application?.response?.User.Employment.map((e: any) => (
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
                    {/* {menu == 1 ? ( */}
                    <>
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
                                    {data?.application?.response?.User.Publication.map((e: any) => (
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
                              {data?.application?.response?.User.Essay ? ReactHtmlParser(data?.application?.response.User.Essay.essay) : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                    {/* ) : null} */}

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
                                  {data?.application?.response?.User.Reference.map((e: any) => (
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
                    <div className="row">
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
                              <div className="col-md-4">
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
                                      data?.application?.response?.User.Bonded
                                        ? data?.application?.response?.User.Bonded.YesNo.value
                                        : null
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                              {data?.application?.response?.User.Bonded.bonded == 1 ?
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="details">
                                      Give details if you are bonded to serve any government
                                      or other employers :
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      required
                                      id="details"
                                      defaultValue={
                                        data?.application?.response?.User.Bonded
                                          ? data?.application?.response?.User.Bonded.details
                                          : null
                                      }
                                      readOnly
                                    />
                                  </div>
                                </div> : <></>}
                              <div className="col-md-4">
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
                                      data?.application?.response?.User.Confirmation
                                        ? data?.application?.response?.User.Confirmation.YesNo.value
                                        : null
                                    }
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-4">
                                <div className="form-group">
                                  <label htmlFor="contactObjection">
                                    Do you currently work with WAEC? :
                                  </label>
                                  <select
                                    disabled

                                    className="custom-select form-control"
                                    id="validationTooltip02"
                                    name="contactObjection"
                                    required
                                    value={data?.application?.response?.User.Confirmation.workWaec}

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
                              {data?.application?.response?.User.Confirmation.workWaec == 1 ?
                                <div className="col-sm-4" id="bondedDetailsDiv">
                                  <div className="form-group">
                                    <label htmlFor="exampleInputuname">
                                      Enter your staff ID
                                    </label>
                                    <div className="input-group mb-3">
                                      <input
                                        readOnly
                                        type="text"
                                        className="form-control"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        value={data?.application?.response?.User.Confirmation.staffId}

                                      />
                                    </div>
                                  </div>
                                </div> : <></>}
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
        </div>
      </div>
    </div>
  );
};

export default SingleApplication;
