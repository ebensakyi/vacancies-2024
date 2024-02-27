import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import Link from "next/link";
import { genCode } from "../../util/generate-random";

export const AddCertification = ({ eduLevels, certificatesList }) => {
  const [certifications, setCertifications] = useState([]);
  const [institution, setInstitution] = useState();
  // const [from, setFrom] = useState();
  // const [to, setTo] = useState();
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  const [startMonth, setStartMonth] = useState();
  const [endMonth, setEndMonth] = useState();

  const [certificateObtained, setCertificateObtained] = useState();
  const [educationLevel, setEducationLevel] = useState();

  useEffect(() => {
    setCertifications(certificatesList);
  }, []);

  const addCertificate = async () => {
    try {
      if (
        educationLevel == null ||
        institution == null ||
        startMonth == null ||
        startYear == null ||
        endMonth == null ||
        endYear == null ||
        certificateObtained == null
      )
        return toast.error("Please fill the form");
      const data = {
        institution:institution.trim(),
        from: startYear + "-" + startMonth,
        to: endYear + "-" + endMonth,
        certificateObtained:certificateObtained.trim(),
        educationLevel,
      };

      const response = await axios.post("/api/application/certifications", {
        data,
      });

      let { statusCode } = response.data;
      let savedCert = response.data.data;

      if (statusCode == 1) {
        setEducationLevel("");
        setInstitution("");
        setStartMonth("");
        setEndMonth("");
        setStartYear("");
        setEndYear("");
        setCertificateObtained("");

        setCertifications([...certifications, savedCert]);
        return toast.success("Certificate added successfully");
      }

      if (statusCode == 0) return toast.error("Data not saved");
    } catch (error) {}
  };

  const removeCertificate = async (id) => {
    const filtered = certifications.filter((go) => go.id !== id);
    const response = await axios.delete(`/api/application/certifications`, {
      data: id,
    });
    setCertifications(filtered);
  };

  const next = async () => {
    let core = await genCode(100);

    const response = await axios.post(
      `/api/application/certifications?next=true`
    );

    let isValid = response.data.data;

    if (isValid) return Router.push("/application/employment?core=" + core);

    return toast.error("Enter at least one certificate before clicking next");
  };

  return (
    <div className="col-xl-12">
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
          <h4 className="card-title">CERTIFICATES</h4>
        </div>
        <div className="card-body">
          <span className="badge bg-success " style={{ padding: 10 }}>
            {" "}
            Add school certificates(BECE, WASSCE, University etc) and other
            certificates here. Click on (+) to add a certificate.
          </span>
          <div className="row">
            <div className="col-lg-12">
              <form method="POST">
                <div className="form-body">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group">
                        <label htmlFor="">
                          Level of education: <span style={danger}>*</span>
                        </label>
                        <select
                          className="form-control "
                          value={educationLevel}
                          onChange={(e:any) => {
                            setEducationLevel(e.target.value);
                          }}
                        >
                          <option value="">Select level</option>
                          {eduLevels.map((ed) => (
                            <option key={ed.id} value={ed.id}>
                              {ed.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="institutionName">
                          Name of institution: <span style={danger}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          id="institutionName"
                          value={institution}
                          onChange={(e:any) => {
                            setInstitution(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label htmlFor="start">
                          Start month/year : <span style={danger}>*</span>{" "}
                        </label>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <select
                            className="form-control"
                            onChange={(e:any) => {
                              setStartMonth(e.target.value);
                            }}
                          >
                            <option value="">Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                          <select
                            className="form-control"
                            onChange={(e:any) => {
                              setStartYear(e.target.value);
                            }}
                          >
                            <option value="">Year</option>
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                          </select>
                        </div>
                        {/* <input
                          type="month"
                          className="custom-select form-control required"
                          id="start"
                          value={from}
                          onChange={(e:any) => {
                            setFrom(e.target.value);
                          }}
                        /> */}
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="form-group">
                        <label htmlFor="end">
                          End month/year : <span style={danger}>*</span>{" "}
                        </label>
                        <br />
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic example"
                        >
                          <select
                            className="form-control"
                            onChange={(e:any) => {
                              setEndMonth(e.target.value);
                            }}
                          >
                            <option value="">Month</option>
                            <option value="01">January</option>
                            <option value="02">February</option>
                            <option value="03">March</option>
                            <option value="04">April</option>
                            <option value="05">May</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                          <select
                            className="form-control"
                            onChange={(e:any) => {
                              setEndYear(e.target.value);
                            }}
                          >
                            <option value="">Year</option>
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                          </select>
                        </div>
                        {/* <input
                          type="month"
                          className="custom-select form-control required"
                          id="end"
                          value={to}
                          onChange={(e:any) => {
                            setTo(e.target.value);
                          }}
                        /> */}
                      </div>
                    </div>
                    {/* <div className="col-md-2">
                          <div className="form-group">
                            <label htmlFor="certPrefix">
                              Type of Certificate :{" "}
                              <span style={danger}>*</span>
                            </label>
                            <select
                              className="custom-select form-control required"
                              id="certPrefix"
                              value={certPrefix}
                            >
                              <option value>Select certificate</option>
                              
                            </select>
                          </div>
                        </div> */}
                    <div className="col-md-2">
                      <div className="form-group">
                        <label htmlFor="certificate">
                          Certificate obtained: <span style={danger}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="certificate"
                          value={certificateObtained}
                          onChange={(e:any) => {
                            setCertificateObtained(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    {/* <div className="col-md-2">
                      <div className="form-group">
                        <label htmlFor="classObtained">
                          className obtained : <span style={danger}>*</span>
                        </label>
                        <select
                          className="custom-select form-control requireddd"
                          id="classObtained"
                          value={classObtained}
                        >
                          <option value>Select className</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="col-md-1">
                      <div className="form-group">
                        <label htmlFor="addToTable">
                          Save <span style={danger} />
                        </label>
                        <br />
                        <button
                          type="button"
                          id="addToTable"
                          className="btn btn-success  add"
                          onClick={() => {
                            addCertificate();
                          }}
                        >
                          <i className="fas fa-plus-circle" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <hr />
              {/* row */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <thead className="table-light">
                        <tr>
                          <th hidden>Id</th>
                          <th>Education Level</th>
                          <th>Institution</th>
                          <th>Start</th>
                          <th>End</th>
                          <th>Certificate</th>
                          {/* <th>className</th> */}
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certifications.map((co) => (
                          <tr key={co.id}>
                            <td>{co.EducationLevel.name}</td>
                            <td>{co.institution}</td>
                            <td>{co.from}</td>
                            <td>{co.to}</td>
                            <td>{co.certificateObtained}</td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-danger "
                                onClick={() => {
                                  removeCertificate(co.id);
                                }}
                              >
                                <i className="fas fa-minus-circle" />
                              </button>
                            </td>
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
      <div className="form-actions mt-10">
        <div className="col-md-12" style={{ textAlign: "end" }}>
          <div className="btn-group" role="group" aria-label="Basic example">
            <Link href="/application/education">
              <a type="button" className="btn btn-success">
                Previous
              </a>
            </Link>
            {/* <Link href="/application/employment"> */}
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                next();
              }}
            >
              Next
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};
const danger = { color: "red" };
