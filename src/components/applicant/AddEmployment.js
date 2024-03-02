import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { genCode } from "../../util/generate-random";

export const AddEmployment = ({ employmentList }) => {
  const [employments, setEmployments] = useState([]);
  const [organizationName, setOrganizationName] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  // const [start, setStart] = useState("");
  // const [end, setEnd] = useState("");

  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [leavingReason, setLeavingReason] = useState("");
  // const [todate, setTodate] = useState(false);

  //let menu = Cookies.get("rt");

  let cookie = Cookies.get("rt") || "";
  let menu = cookie.charAt(cookie.length - 1);

  useEffect(() => {
    setEmployments(employmentList);
  }, [employmentList]);
  const addEmployment = async () => {
    try {
      let end = endYear + "-" + endMonth;
      let start = startYear + "-" + startMonth;
      if (end == "Date-To") {
        end = "Date";
      }
      const data = {
        organizationName,
        start: start,
        end: end,
        position,
        salary,
        leavingReason,
      };

      if (
        organizationName == "" ||
        leavingReason == "" ||
        startMonth == "" ||
        endMonth == "" ||
        startYear == "" ||
        endYear == "" ||
        salary == "" ||
        position == ""
      )
        return toast.error("Please fill the form");

      const response = await axios.post("/api/applicant/employment", {
        data,
      });

      let { statusCode } = response.data;
      if (statusCode == 1) {
        setOrganizationName("");
        setPosition("");
        setSalary("");
        setStartMonth("");
        setEndMonth("");
        setStartYear("");
        setEndYear("");
        setLeavingReason("");
        // setTodate(false);
        setEmployments([...employments, response.data.data]);

        return toast.success("Employment added successfully");
      }

      if (statusCode == 0) return toast.error("Employment not saved");
    } catch (error) {
      console.log(error);
      return toast.error("A server error occurred");
    }
  };

  const removeEmployment = async (id) => {
    try {
      const filtered = employments.filter((go) => go.id !== id);
      const response = await axios.delete(`/api/applicant/employment`, {
        data: id,
      });
      setEmployments(filtered);
    } catch (error) {
      return toast.error("A server error occurred");
    }
  };

  const next = async (id) => {
    let core = await genCode(100);

    try {
      const response = await axios.post(
        `/api/applicant/employment?next=true`
      );

      let isValid = response.data.data;
      if (id == "toRef") {
        if (isValid) return Router.push("/applicant/references?code=" + core);

        return toast.error(
          "Complete this section according to the instructions in green before clicking next"
        );
      } else if (id == "toEssay") {
        if (isValid) return Router.push("/applicant/essay");

        return toast.error(
          "Complete this section according to the instructions in green before clicking next"
        );
      } else {
        return;
      }
    } catch (error) {}
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
          <h4 className="card-title">EMPLOYMENT</h4>
        </div>
        <div className="card-body">
          <span className="badge bg-success " style={{ padding: 10 }}>
            {" "}
            Add all employments here. Order by most recent job. Check the
            current job check box, if you are still at post. Click on (+) to add
            a employment.
          </span>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="organizationName">
                    Name of organization : <span style={danger}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control required"
                    id="organizationName"
                    name="organizationName"
                    value={organizationName}
                    onChange={(e:any) => {
                      setOrganizationName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="period">
                    Start date : <span style={danger}>*</span>
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
                      <option value="2023">2023</option>
                    </select>
                  </div>
                  {/* <input
                    type="month"
                    className="form-control"
                    id="period"
                    name="daterange"
                    value={start}
                    onChange={(e:any) => {
                      setStart(e.target.value);
                    }}
                  /> */}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="period">
                    End date : <span style={danger}>*</span>
                  </label>{" "}
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
                      <option value="To">*To Date</option>
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
                      <option value="Date">*To Date</option>
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
                      <option value="2023">2023</option>

                    </select>
                  </div>
                  {/* <input
                    type="month"
                    className="form-control"
                    id="period"
                    name="daterange"
                    value={end}
                    onChange={(e:any) => {
                      setEnd(e.target.value);
                    }}
                  /> */}
                </div>
                <small className="d-inline-block ms-1" style={danger}>
                  Select "*To Date" for Month and Year if you are
                  currently at post at stated organization
                </small>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="position">
                    Position held : <span style={danger}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control required"
                    id="position"
                    name="position"
                    value={position}
                    onChange={(e:any) => {
                      setPosition(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="salary">
                    Salary(GHS) : <span style={danger}>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control required"
                    id="salary"
                    name="salary"
                    value={salary}
                    maxLength={6}
                    onChange={(e:any) => {
                      setSalary(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="leaveReason">
                    Reason for leaving (Enter to date if you`re still at the
                    entered Organization) : <span style={danger}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control required"
                    id="leaveReason"
                    name="leaveReason"
                    value={leavingReason}
                    onChange={(e:any) => {
                      setLeavingReason(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="addToTable">
                    Add <span style={danger} />
                  </label>
                  <br />
                  <button
                    type="button"
                    id="addToTable"
                    className="btn btn-success  add"
                    onClick={() => {
                      addEmployment();
                    }}
                  >
                    <i className="fas fa-plus-circle" />
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <hr />
          <br /> <br />
          {/* row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th hidden>Id</th>
                      <th>Organization</th>
                      <th>Period</th>
                      <th>Position</th>
                      <th>Salary</th>
                      <th>Reason for leaving</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employments.map((e:any) => (
                      <tr key={e.id}>
                        <td>{e.organizationName}</td>
                        <td>
                          {e.start} to {e.end}
                        </td>
                        <td>{e.position}</td>
                        <td>GHS {e.salary}</td>
                        <td>{e.leavingReason}</td>

                        <td>
                          {" "}
                          <button
                            type="button"
                            id="addToTable"
                            className="btn btn-danger "
                            onClick={() => {
                              removeEmployment(e.id);
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
      <div className="form-actions mt-10">
        <div className="col-md-12" style={{ textAlign: "end" }}>
          <div className="btn-group" role="group" aria-label="Basic example">
            <Link href="/applicant/certifications">
              <a type="button" className="btn btn-success">
                Previous
              </a>
            </Link>
            {menu == "1" ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  next("toEssay");
                }}
              >
                Next
              </button>
            ) : (
              
            
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  next("toRef");
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};
const danger = { color: "red" };
