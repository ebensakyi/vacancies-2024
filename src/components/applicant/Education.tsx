
"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { redirect, useRouter } from "next/navigation";
import ApplicationMenu from "../ApplicationMenu";
import moment from "moment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/constants";

const Education = ({ data }: any) => {



    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })

    const currentYear = new Date().getFullYear();


    const years = [];

    for (let year = currentYear; year >= 1990; year--) {
        years.push(year);
    }
    const router = useRouter();



    const [educationLevel, setEducationLevel] = useState("");
    const [schoolName, setSchoolName] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");
    /////////////////////////////////////////////////////////////////

    const [examYear, setExamYear] = useState("");
    const [examType, setExamType] = useState("");
    const [subject, setSubject] = useState("");
    const [grade, setGrade] = useState("");
    const [indexNumber, setIndexNumber] = useState("");



    const addSchool = async () => {
        try {
            if (
                educationLevel == "" ||
                schoolName == "" ||
                startYear == "" ||
                endYear == ""
            )
                return toast.error("Please fill the form");
            const data = {
                educationLevel,
                schoolName,
                startYear,
                endYear,
            };

            const response = await axios.post("/api/applicant/education/schools-attended", {
                data,
            });

            let { status } = response;


            if (status == 200) {
                setEducationLevel("")
                setSchoolName("")
                setStartYear("")
                setEndYear("")

                //  setSchoolsAttended([...schoolsAttended, savedSchool]);

                router.refresh()
                return toast.success("School added successfully");
            }

            if (status != 200) return toast.error("An error occurred");
        } catch (error) {
            return toast.error("An error occurred");

        }
    };

    const addIndexNumber = async () => {
        try {
            const data = {
                examType,
                examYear,
                indexNumber,
            };

            if (examType == "" || examYear == "" || indexNumber == "")
                return toast.error("Please fill the form");

            const response = await axios.post("/api/applicant/education/index-numbers", {
                data,
            });



            let { status } = response;

            if (status == 200) {
                setIndexNumber("");
                setExamType("");
                setExamYear("");

                router.refresh()

                return toast.success("Index number added successfully");
            }


            if (status == 201) return toast.error("We could not verify your index number. \n Kindly check the Exam Type, Exam Year and Index Number");
        } catch (error) {
            console.log(error);
        }
    };


    const removeSchool = async (id: any) => {
        try {
            // const filteredSchools = schoolsAttended.filter((sa: any) => sa.id !== id);
            const response = await axios.delete(`/api/applicant/education/schools-attended`, {
                data: id,
            });
            // setSchoolsAttended(filteredSchools);

            let { status } = response;


            if (status == 200) {


                //  setSchoolsAttended([...schoolsAttended, savedSchool]);
                router.refresh()

                return toast.success("School removed successfully");
            }

            if (status != 200) return toast.error("An error occurred");
        } catch (error) { return toast.error("An error occurred"); }
    };

    const removeIndexNumber = async (id: any) => {
        try {


            const response = await axios.delete("/api/applicant/education/index-numbers", {
                data: id,
            });
            // setIndexNumber(filteredIndexNumbers);
            //router.replace(router.asPath);
            router.refresh()

        } catch (error) {
            console.log(error);
        }
    };


    const next = async () => {
        if (data?.schoolsAttended?.response?.length == 0) {
            return toast.error(
                "Add schools attended. At least one school should be added"
            );

        }
        if (data?.verifiedIndexNumbers?.response?.length < 2) {
            return toast.error(
                "Add at lease 2 index numbers before proceeding to next page"
            );

        }

        await router.push(
            `/applicant/certifications?next=true`
        );
        return
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
                            <ApplicationMenu whichLink="education" />

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
                                <h4 className="card-title">INDEX NUMBERS</h4>
                            </div>
                            <div className="card-body">

                                <div className="col-lg-8 mb-4">
                                    <h4 className="card-title">Read Instructions</h4>

                                    <div className="card card-body">
                                        <p className=" bg-danger " style={{ padding: 10, color: 'white' }}>
                                            Please select your exam type, enter your index number and enter the year for the exams. Click on the + button to add.

                                            Do this for BECE, WASSCE, SSCE, ABCE or GBCE for both Private and School where it applies
                                            Note that your index number will be automatically validated before. Wrong index number, exam type and year will not be accepted.
                                            <br />
                                            Enter at least 2 index numbers for JSS and SHS or Equivalent
                                        </p>
                                        <hr />
                                    </div>
                                </div>


                                <div className="row" style={{ marginTop: "20px" }}>

                                    <div className="col-lg-12">
                                        {" "}
                                        {/* <p className="card-title-desc">
            Provide your grades for{" "}
            <span style={{ color: "red" }}>
              
            </span>{" "}
           
          </p> */}
                                        <form method="POST">
                                            <div className="form-body">
                                                <div className="row p-t-20">
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Examination: <span style={danger}>*</span>
                                                            </label>
                                                            <select
                                                                className="form-control "
                                                                value={examType}
                                                                onChange={(e: any) => {
                                                                    setExamType(e.target.value);
                                                                }}
                                                            >
                                                                <option value="">Select examination</option>
                                                                {data?.examTypes?.response?.map((ex: any) => (
                                                                    <option key={ex.id} value={ex.id}>
                                                                        {ex.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>{" "}
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <div className="mb-3 position-relative">
                                                                <label className="form-label" htmlFor="age">
                                                                    Year of exams : <span className="danger">*</span>{" "}
                                                                </label>
                                                                <select
                                                                    className="form-control"
                                                                    value={examYear}
                                                                    onChange={(e) => {
                                                                        setExamYear(e.target.value);
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
                                                            <label className="control-label">
                                                                Index Number: <span style={danger}>*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="custom-select form-control"
                                                                id="indexNumber"
                                                                value={indexNumber}
                                                                onChange={(e: any) => {
                                                                    setIndexNumber(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
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
                                                                    addIndexNumber();
                                                                }}
                                                            >
                                                                {" "}
                                                                <i className="fas fa-plus-circle" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/*/row*/}
                                                </div>
                                            </div>
                                        </form>
                                        <div className="row" style={{ marginTop: 80 }}>
                                            <div className="table-responsive">
                                                <table className="table mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Candidate Name</th>
                                                            <th>Verified Index</th>
                                                            <th>Exam Type</th>
                                                            <th>Exam Year</th>
                                                            <th>Remove</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data?.verifiedIndexNumbers?.response?.map((ind: any) => (
                                                            <tr key={ind.id}
                                                            > <td>{ind.candidateName}</td>
                                                                <td>{ind.candidateNumber}</td>
                                                                <td>{ind.ExamType.name}</td>
                                                                <td>
                                                                    {ind.examYear}
                                                                </td>
                                                                <td>
                                                                    {" "}
                                                                    <button
                                                                        type="button"
                                                                        id="addToTable"
                                                                        className="btn btn-danger "
                                                                        onClick={(e: any) => {
                                                                            e.preventDefault();
                                                                            removeIndexNumber(ind.id);
                                                                        }}
                                                                    >
                                                                        {" "}
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
                            <div className="card">

                                <div className="card-header">
                                    <h4 className="card-title">SCHOOLS ATTENDED</h4>
                                </div>
                                <div className="card-body">
                                    <span className="badge bg-success" style={{ padding: 10 }}>
                                        Fill all fields with (<span style={danger}>*</span>). Click on +
                                        to add a school. Order school by highest education level
                                    </span>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-lg-12">

                                            <form method="POST">
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
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="institutionName">
                                                                Name of school: <span style={danger}>*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                id="institutionName"
                                                                value={schoolName}
                                                                onChange={(e: any) => {
                                                                    setSchoolName(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="start">
                                                                Start month/year : <span style={danger}>*</span>
                                                            </label>
                                                            <input
                                                                type="month"
                                                                className="custom-select form-control required"
                                                                id="start"
                                                                value={startYear}
                                                                onChange={(e: any) => {
                                                                    setStartYear(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="end">
                                                                End month/year : <span style={danger}>*</span>{" "}
                                                            </label>
                                                            <input
                                                                type="month"
                                                                className="custom-select form-control required"
                                                                id="end"
                                                                value={endYear}
                                                                onChange={(e: any) => {
                                                                    setEndYear(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
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
                                                                    addSchool();
                                                                }}
                                                            >
                                                                {" "}
                                                                <i className="fas fa-plus-circle" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="row" style={{ marginTop: 80 }}>
                                                <div className="table-responsive">
                                                    <table className="table mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th>School</th>
                                                                <th>Education level</th>

                                                                <th>Start Month/Year</th>
                                                                <th>End Month/Year</th>
                                                                <th>Remove</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data?.schoolsAttended?.response?.map((sx: any) => (
                                                                <tr key={sx.id}>
                                                                    <td>{sx.institutionName}</td>
                                                                    <td>{sx.EducationLevel.name}</td>
                                                                    <td>
                                                                        {moment(sx.institutionStart, "YYYY-MM").format(
                                                                            "MM-YYYY"
                                                                        )}{" "}
                                                                    </td>
                                                                    <td>
                                                                        {moment(sx.institutionEnd, "YYYY-MM").format(
                                                                            "MM-YYYY"
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            type="button"
                                                                            id="addToTable"
                                                                            className="btn btn-danger "
                                                                            onClick={(e: any) => {
                                                                                removeSchool(sx.id);
                                                                            }}
                                                                        >
                                                                            <i className="fas fa-minus-circle" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                      

                        {/* <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">GRADES OBTAINED</h4>
                            </div>
                            <div className="card-body">
                                <span className="badge bg-success " style={{ padding: 10 }}>
                                    Fill all fields with (<span style={danger}>*</span>). Provide your
                                    grades for English, Mathematics and 3 other subjects for your BECE
                                    and Senior High Education or equivalent. Click on (+) to add a
                                    grade.
                                </span>

                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-lg-12">
                                        {" "}
                                      
                                        <form method="POST">
                                            <div className="form-body">
                                                <div className="row p-t-20">
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Examination: <span style={danger}>*</span>
                                                            </label>
                                                            <select
                                                                className="form-control "
                                                                value={examType}
                                                                onChange={(e: any) => {
                                                                    setExamType(e.target.value);
                                                                  
                                                                }}
                                                            >
                                                                <option value="">Select examination</option>
                                                                {data?.examTypes?.response?.map((ex: any) => (
                                                                    <option key={ex.id} value={ex.id}>
                                                                        {ex.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">
                                                                Month/Year <span style={danger}>*</span>
                                                            </label>
                                                            <input
                                                                type="month"
                                                                className="custom-select form-control"
                                                                id="year"
                                                                value={examYear}
                                                                onChange={(e: any) => {
                                                                    setExamYear(e.target.value);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <label className="control-label">
                                                                Subject <span style={danger}>*</span>
                                                            </label>
                                                            <select
                                                                className="custom-select form-control"
                                                                id="subject"
                                                                value={subject}
                                                                onChange={(e: any) => {
                                                                    setSubject(e.target.value);
                                                                }}
                                                            >
                                                                {" "}
                                                                <option value="">Select subject</option>
                                                                {subjectsState.map((s: any) => (
                                                                    <option key={s.id} value={s.id}>
                                                                        {s.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">
                                                        <div className="form-group">
                                                            <label className="control-label">
                                                                Grade <span style={danger}>*</span>
                                                            </label>
                                                            <select
                                                                className="custom-select form-control required"
                                                                id="grade"
                                                                value={grade}
                                                                onChange={(e: any) => {
                                                                    setGrade(e.target.value);
                                                                }}
                                                            >
                                                                <option value="">Select grade</option>
                                                                {gradesState.map((g: any) => (
                                                                    <option key={g.id} value={g.id}>
                                                                        {g.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="col-md-2">
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
                                                                    addGrade();
                                                                }}
                                                            >
                                                           
                                                                <i className="fas fa-plus-circle" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="row" style={{ marginTop: 80 }}>
                                            <div className="table-responsive">
                                                <table className="table mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Examination</th>
                                                            <th>Month/Year</th>
                                                            <th>Subject</th>
                                                            <th>Grade</th>
                                                            <th>Remove</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {gradeObtained.map((go: any) => (
                                                            <tr key={go.id}>
                                                                <td>{go.ExamType.name}</td>
                                                                <td>
                                                                    {moment(go.year, "YYYY-MM").format("MM-YYYY")}
                                                                </td>
                                                                <td>{go.Subject.name}</td>
                                                                <td>{go.Grade.name}</td>
                                                                <td>
                                                                    <button
                                                                        type="button"
                                                                        id="addToTable"
                                                                        className="btn btn-danger "
                                                                        onClick={(e: any) => {
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
                        </div> */}
                        <div className="form-actions mt-10">
                            <div className="col-md-12" style={{ textAlign: "end" }}>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <Link href="/applicant/personal-info" className="btn btn-success">
                                        Previous
                                    </Link>
                                    {/* <Link href="/applicant/certifications"> */}
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
        </div>)

};
const danger = { color: "red" };
export default Education;
