
"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ApplicationMenu from "../ApplicationMenu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { LOGIN_URL } from "@/constants";

const Employment = ({ data }: any) => {
   const router =  useRouter()
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })
    const currentYear = new Date().getFullYear();
    const years = [];

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

    for (let year = currentYear; year >= 1990; year--) {
        years.push(year);
    }

    const addEmployment = async () => {
        try {
            let end = endYear + "-" + endMonth;
            let start = startYear + "-" + startMonth;
           
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
                startMonth == "" ||
                endMonth == "" ||
                startYear == "" ||
                endYear == "" ||
                salary == "" ||
                position == ""
            )
                return toast.error("Please fill the form");

            if (endYear != "9999" && leavingReason == "") {
                return toast.error("Please enter reason for leaving");
            }
            if (startYear > endYear) {
                return toast.error("Start year cannot be greater than end year");
            }

            const response = await axios.post("/api/applicant/employment", {
                data,
            });

            let { status } = response;
            if (status == 200) {
                setOrganizationName("");
                setPosition("");
                setSalary("");
                setStartMonth("");
                setEndMonth("");
                setStartYear("");
                setEndYear("");
                setLeavingReason("");
                // setTodate(false);
                // setEmployments([...employments, response.data.data]);

                router.refresh()

                return toast.success("Employment added successfully");
            }

            if (status != 200) return toast.error("Employment not saved");
        } catch (error) {
            console.log(error);
            return toast.error("A server error occurred");
        }
    };

    const removeEmployment = async (id: any) => {
        try {
            const filtered = employments.filter((go: any) => go?.id !== id);
            const response = await axios.delete(`/api/applicant/employment`, {
                data: id,
            });
            router.refresh()

        } catch (error) {
            return toast.error("A server error occurred");
        }
    };

    const next = async () => {
        //check stafftype, show either essay or publications
        if(data?.employments?.response.length > 0) {
          await router.push(
              `/applicant/essay?next=true`
          );
          return
  
        }
  
  
          return toast.error("Enter at least one certificate before clicking next");
      };
    
    
    return (
        <div id="layout-wrapper">
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">EMPLOYMENT </h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ApplicationMenu whichLink="employment" />

                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
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
                                                        onChange={(e: any) => {
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
                                                            onChange={(e: any) => {
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
                                                            value={startYear}
                                                            onChange={(e) => {
                                                                setStartYear(e.target.value);
                                                            }}
                                                        >
                                                            <option value="">Select Year</option>
                                                            {years.map((year) => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))}
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
                                                            onChange={(e: any) => {
                                                                setEndMonth(e.target.value);
                                                                if(e.target.value=="99"){                                                                    
                                                                    setEndYear("9999")
                                                                }
                                                            }}
                                                        >
                                                            <option value="">Month</option>
                                                            <option value="99">To Date</option>
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
                                                            value={endYear}
                                                            onChange={(e) => {
                                                                setEndYear(e.target.value);
                                                                if (endYear == "9999") {
                                                                    setLeavingReason("")
                                                                }
                                                            }}
                                                        >
                                                            <option value="">Select Year</option>
                                                            <option value="9999">To Date</option>

                                                            {years.map((year) => (
                                                                <option key={year} value={year}>
                                                                    {year}
                                                                </option>
                                                            ))}
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
                                                        onChange={(e: any) => {
                                                            setPosition(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="salary">
                                                        Monthly Salary(GHS) : <span style={danger}>*</span>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control required"
                                                        id="salary"
                                                        name="salary"
                                                        value={salary}
                                                        maxLength={6}
                                                        onChange={(e: any) => {
                                                            setSalary(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {endYear != "9999" ?
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="leaveReason">
                                                            Reason for leaving  : <span style={danger}>*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control required"
                                                            id="leaveReason"
                                                            name="leaveReason"
                                                            value={leavingReason}
                                                            onChange={(e: any) => {
                                                                setLeavingReason(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div> : <></>}
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
                                                        {data?.employments?.response?.map((e: any) => (
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
                                        <Link href="/applicant/certifications" type="button" className="btn btn-success">
                                            Previous
                                        </Link>
                                        {/* {menu == "1" ? (
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={() => {
                                                    next("toEssay");
                                                }}
                                            >
                                                Next
                                            </button>
                                        ) : ( */}


                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={() => {
                                                next();
                                            }}
                                        >
                                            Next
                                        </button>
                                        {/* )} */}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const danger = { color: "red" };
export default Employment;
