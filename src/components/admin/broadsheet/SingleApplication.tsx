import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import _ from "lodash";

const SingleApplication = ({ application, rejectReasons }) => {
  let cookie = Cookies.get("rt") || "";
  let menu = cookie.charAt(cookie.length - 1);

  const [rejected, setRejected] = useState(0);
  const [shortlisted, setShortlisted] = useState(0);
  const [rejectReason, setRejectReason] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  // console.log("menu",menu);
  // console.log("appl",application);

  const handleShortlisting = async () => {
    try {
      const data = {
        rejected,
        shortlisted,
        rejectReason,
        appId: id,
      };
      const response = await axios.post(
        "/api/admin/shortlist/handle-shortlisting",
        {
          data,
        }
      );
      //console.log("response: " + JSON.stringify(response.data));
      // Router.reload(window.location.pathname);

      let { statusCode } = response.data;
      if (statusCode == 1) {
        return router.push("/admin/shortlist");
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
                                checked={shortlisted}
                                onChange={(e:any) => {
                                  let state = e.target.checked;
                                  if (state) {
                                    setRejected(null);
                                    setRejectReason([]);
                                    return setShortlisted(1);
                                  }
                                  setRejected(1);
                                  setShortlisted(null);
                                }}
                              />
                              <label
                                className="form-check-label"
                                for="formrow-customCheck"
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
                                checked={rejected}
                                onChange={(e:any) => {
                                  let state = e.target.checked;
                                  if (state) {
                                    setShortlisted(null);
                                    return setRejected(1);
                                  }
                                  setRejected(null);
                                  setShortlisted(1);
                                }}
                              />
                              <label
                                className="form-check-label"
                                for="formrow-customCheck"
                              >
                                Reject
                              </label>
                            </div>
                          </td>
                          <td>{!rejected ? "Not rejected" : "Rejected"}</td>
                          {rejected ? (
                            <td>
                              {rejectReasons.map((rr: { id: Key | null | undefined; reason: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
                                <div key={rr.id}>
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="formrow-customCheck"
                                    onChange={(e:any) => {
                                      let isChecked = e.target.checked;
                                      if (isChecked) {
                                        return addRejectReason(rr.id);
                                      }
                                      removeRejectReason(rr.id);
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    for="formrow-customCheck"
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
                        onClick={(e:any) => {
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
              {application.shortlisted != -1 ? (
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
                              {application.shortlisted == 1 ? (
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
                            {application.shortlisted == 0 ? (
                              <td>
                                {application.RejectReason.map((r: { Reason: { reason: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }; }) => {
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
                    {_.startCase(_.lowerCase(application.User.firstName))}{" "}
                    {_.startCase(_.lowerCase(application.User.otherNames || ""))}{" "}
                    {_.startCase(_.lowerCase(application.User.surname))}
                    {/* {`${application.User.firstName}  ${
                    application.User.otherNames || ""
                  }  ${application.User.surname || ""}`} */}
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
                                {application.Job.name}
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
                            defaultValue={application.User.firstName}
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
                            defaultValue={application.User.surname}
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
                            defaultValue={application.User.otherNames}
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
                            defaultValue={application.User.Personal.address}
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
                            defaultValue={application.User.Personal.dob}
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
                            defaultValue={application.User.Personal.Sex.name}
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
                            defaultValue={application.User.Personal.hometown}
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
                            defaultValue={application.User.Personal.birthPlace}
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
                              application.User.Personal.MaritalStatus.name
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
                              application.User.Personal.childrenNumber
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
                            defaultValue={application.User.email}
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
                            defaultValue={application.User.phoneNumber}
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
                            defaultValue={application.User.Personal.residenceTel}
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
                              {application.User.SchoolAttended.map((e:any) => (
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
                          {application.User.GradesObtained.map((e:any) => (
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
                              {application.User.Certificate.map((e:any) => (
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
                          {application.User.Employment.map((e:any) => (
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
                              {application.User.Publication.map((e:any) => (
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
                        {application.User.Essay?ReactHtmlParser(application.User.Essay.essay):""}
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
                          {application.User.Reference.map((e:any) => (
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
                              application.User.Bonded
                                ? application.User.Bonded.YesNo.value
                                : null
                            }
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
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
                              application.User.Bonded
                                ? application.User.Bonded.details
                                : null
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
                              application.User.Confirmation
                                ? application.User.Confirmation.YesNo.value
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
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleApplication;
