import ReactHtmlParser from "react-html-parser";
import Cookies from "js-cookie";
import { jsPDF } from "jspdf";
import * as moment from "moment";

import { useRef, useEffect } from "react";

const FullApplication = ({ data, jobs }) => {
  let rt = Cookies.get("rt");

  const contentRef = useRef();

  // var date = moment(Date.now).format("YYYY-MM-DDT23:59:00.000[Z]");
  // console.log("date ",date);

  let pdfName = `${data.firstName}  ${data.otherNames || ""}  ${
    data.surname || ""
  }`;
  const generatePdf = (content) => {
    const doc = new jsPDF();

    // doc.html(content, 10, 10);
    // doc.save(`${pdfName}.pdf`);
    doc.html(document.body, {
      callback: function (doc) {
        doc.save(`${pdfName}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header">
          {/* <h4 className="card-title">ADD</h4> */}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="card">
              <div className="col-lg-12">
                <div style={{ textAlign: "right", marginTop: 0 }}>
                  {/* <button
                      id="print"
                      type="button"
                      className="btn btn-danger add"
                      onClick={() => {
                        generatePdf();
                      }}
                    >
                      <i className="mdi mdi-file-pdf" />
                      Save as PDf
                    </button> */}

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
              <hr />
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
                        {`${data?.firstName}  ${data?.otherNames || ""}  ${
                          data?.surname || ""
                        }`}
                      </h3>
                    </center>
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
                                    {jobs.map((j) => {
                                      let job = `${j.Job.name}, `;
                                      return job.replace(/,$/, " ");
                                    })}
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
                                defaultValue={data.firstName}
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
                                defaultValue={data.surname}
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
                                defaultValue={data.otherNames}
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
                                defaultValue={data.Personal.address}
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
                                defaultValue={data.Personal.dob}
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
                                defaultValue={data.Personal.Sex.name}
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
                                defaultValue={data.Personal.hometown}
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
                                defaultValue={data.Personal.birthPlace}
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
                                defaultValue={data.Personal.MaritalStatus.name}
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
                                defaultValue={data.Personal.childrenNumber}
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
                                defaultValue={data.email}
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
                                defaultValue={data.phoneNumber}
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
                                defaultValue={data.Personal.residenceTel}
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
                                    <th>From</th>
                                    <th>To</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.SchoolAttended.map((e:any) => (
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
                              {data.GradesObtained.map((e:any) => (
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

                        <div className="table-responsive">
                          <table
                            className="table full-color-table "
                            id="indexNumberTable"
                          >
                            <thead>
                              <tr>
                                <th hidden>Id</th>
                                <th>Exam</th>
                                <th>Year</th>
                                <th>Index Number</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.IndexNumber.map((e:any) => (
                                <tr key={e.id}>
                                  <td>{e.ExamTypeNew.name}</td>
                                  <td>{e.year}</td>
                                  <td>{e.indexNumber}</td>
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
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Certificate</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.Certificate.map((e:any) => (
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
                                <th>From</th>
                                <th>To</th>
                                <th>Salary</th>
                                <th>Reason for leaving</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.Employment.map((e:any) => (
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
                {rt == 1 ? (
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
                                  {data.Publication.map((e:any) => (
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
                            {ReactHtmlParser(data.Essay.essay)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

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
                              {data.Reference.map((e:any) => (
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

                  <label
                    className="form-check-label"
                    htmlFor="formCheckRight2"
                    style={{ color: "red" }}
                  >
                    I confirm that, I have gone through my application and I am
                    sure every information is correct. I agree to bear the
                    consequencies for any wrong information provided.
                    {}
                  </label>
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
                                data.Bonded ? data.Bonded.YesNo.value : null
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
                                data.Bonded ? data.Bonded.details : null
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
                                data.Confirmation
                                  ? data.Confirmation.YesNo.value
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
  );
};

export default FullApplication;
