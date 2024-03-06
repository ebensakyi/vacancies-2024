
"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import ApplicationMenu from "../ApplicationMenu";
import Link from "next/link";
import { Router } from "next/router";

const Certificate = ({ data }: any) => {
    const currentYear = new Date().getFullYear();
    const years = [];

    const [certifications, setCertifications] = useState([]);
    const [institution, setInstitution] = useState("");
    // const [from, setFrom] = useState();
    // const [to, setTo] = useState();
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    const [startMonth, setStartMonth] = useState("");
    const [endMonth, setEndMonth] = useState("");

    const [certificateObtained, setCertificateObtained] = useState("");
    const [educationLevel, setEducationLevel] = useState("");

    const router = useRouter();

    for (let year = currentYear; year >=1990 ; year--) {
        years.push(year);
    }


    const addCertificate = async () => {
        try {
            if (
                educationLevel == "" ||
                institution == "" ||
                startMonth == "" ||
                startYear == "" ||
                endMonth == "" ||
                endYear == "" ||
                certificateObtained == ""
            )
                return toast.error("Please fill the form");

                if(startYear>endYear){
                    return toast.error("Start year cannot be greater than end year");
                }
            const data = {
                institution: institution.trim(),
                from: startYear + "-" + startMonth,
                to: endYear + "-" + endMonth,
                certificateObtained: certificateObtained.trim(),
                educationLevel,
            };

            const response = await axios.post("/api/applicant/certifications", {
                data,
            });

            let { status } = response.data;
            let savedCert: any = response.data.data;

            if (status == 200) {
                setEducationLevel("");
                setInstitution("");
                setStartMonth("");
                setEndMonth("");
                setStartYear("");
                setEndYear("");
                setCertificateObtained("");

                // setCertifications([...certifications, savedCert]);
                return toast.success("Certificate added successfully");
            }

            if (status != 200) return toast.error("Data not saved");
        } catch (error) { }
    };

    const removeCertificate = async (id: any) => {
        const filtered = certifications.filter((go: any) => go.id !== id);
        const response = await axios.delete(`/api/applicant/certifications`, {
            data: id,
        });
        setCertifications(filtered);
    };

    const next = async () => {
        // let core = await genCode(100);

        const response = await axios.post(
            `/api/applicant/certifications?next=true`
        );

        let isValid = response.data.data;

        // if (isValid) return Router.push("/applicant/employment");

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
                                    <h4 className="mb-0">EDUCATION </h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ApplicationMenu whichLink="certifications" />

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
                                                                    onChange={(e: any) => {
                                                                        setEducationLevel(e.target.value);
                                                                    }}
                                                                >
                                                                    <option value="">Select level</option>
                                                                    {data?.educationLevels?.response?.map((ed: any) => (
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
                                                                    onChange={(e: any) => {
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
                                                                        onChange={(e: any) => {
                                                                            setStartMonth(e.target.value);
                                                                        }}
                                                                        value={startMonth}
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
                                                                        <option value="">Year</option>
                                                                        {years.map((year) => (
                                                                            <option key={year} value={year}>
                                                                                {year}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

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
                                                                        onChange={(e: any) => {
                                                                            setEndMonth(e.target.value);
                                                                        }}
                                                                        value={endMonth}
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
                                                                        onChange={(e) => {
                                                                            setEndYear(e.target.value);
                                                                        }}
                                                                        value={endYear}
                                                                    >
                                                                        <option value="">Year</option>
                                                                        {years.map((year) => (
                                                                            <option key={year} value={year}>
                                                                                {year}
                                                                            </option>
                                                                        ))}
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
                                                                    onChange={(e: any) => {
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
                                                                {certifications.map((co: any) => (
                                                                    <tr key={co.id}>
                                                                        <td>{co?.EducationLevel.name}</td>
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
                                        <Link href="/applicant/education" type="button" className="btn btn-success">
                                            Previous
                                        </Link>
                                        {/* <Link href="/applicant/employment"> */}
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};
const danger = { color: "red" };
export default Certificate;
