import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { genCode } from "../../util/generate-random";
import moment from "moment";

export const AddEducation = ({
  eduLevels,
  examTypes,
  examTypesNew,
  grades,
  subjects,
  indexNumbers,
  schoolsAttendedList,
  gradesObtainedList,
}) => {
  const [schoolsAttended, setSchoolsAttended] = useState([]);

  const [educationLevel, setEducationLevel] = useState();
  const [schoolName, setSchoolName] = useState();
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  /////////////////////////////////////////////////////////////////

  const [gradeObtained, setGradeObtained] = useState([]);
  const [examYear, setExamYear] = useState();
  const [examType, setExamType] = useState();
  const [subject, setSubject] = useState();
  const [grade, setGrade] = useState();
  const [indexNumber, setIndexNumber] = useState();
  const [indexNumberList, setIndexNumberList] = useState();

  const [gradesState, setGradeState] = useState([]);
  const [subjectsState, setSubjectsState] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setSchoolsAttended(schoolsAttendedList);
    setGradeObtained(gradesObtainedList);
    setIndexNumberList(indexNumbers);
  }, []);

  const filterGrade = async (examTypeId) => {
    try {
      const filteredGrades = await grades.filter(
        (grade) => grade.examTypeId == examTypeId
      );
      setGradeState(filteredGrades);
    } catch (error) {}
  };

  const filterSubject = async (examTypeId) => {
    try {
      const filteredSubjects = await subjects.filter(
        (subject) => subject.examTypeId == examTypeId
      );
      setSubjectsState(filteredSubjects);
    } catch (error) {}
  };

  const addSchool = async () => {
    try {
      if (
        educationLevel == null ||
        schoolName == null ||
        startYear == null ||
        endYear == null
      )
        return toast.error("Please fill the form");
      const data = {
        educationLevel,
        schoolName,
        startYear,
        endYear,
      };

      const response = await axios.post("/api/applicant/school-attended", {
        data,
      });

      let { statusCode } = response.data;
      let { message } = response.data;

      let savedSchool = response.data.data;

      if (statusCode == 1) {
        // setEducationLevel();
        // setSchoolName("");
        // setStartYear("");
        // setEndYear("");

        setSchoolsAttended([...schoolsAttended, savedSchool]);

        //Router.reload(window.location.pathname);

        return toast.success("School added successfully");
      }

      if (statusCode == 0) return toast.error(message);
    } catch (error) {
      console.log(error);
    }
  };

  const addIndexNumber = async () => {
    try {
      const data = {
        examType,
        examYear,
        indexNumber,
      };

      if (examType == null || examYear == null || indexNumber == null)
        return toast.error("Please fill the form");

      const response = await axios.post("/api/applicant/index-number", {
        data,
      });

      let { statusCode } = response.data;
      let indx = response.data.data;
      let { message } = response.data;

      if (statusCode == 1) {
        setIndexNumber("");
        setExamType("");
        setExamYear("");

        // setGradeObtained([...gradeObtained, savedGrade]);
        // setIndexNumbers([...indexNumbers, indx]);
        setIndexNumberList(indx);
        router.replace(router.asPath);
        return toast.success("Index number added successfully");
      }

      if (statusCode == 0) return toast.error(message);
    } catch (error) {
      console.log(error);
    }
  };

  const addGrade = async () => {
    try {
      const data = {
        examType,
        examYear,
        subject,
        grade,
      };

      if (
        examType == null ||
        examYear == null ||
        subject == null ||
        grade == null
      )
        return toast.error("Please fill the form");

      const response = await axios.post("/api/applicant/grades-obtained", {
        data,
      });

      let { statusCode } = response.data;
      let savedGrade = response.data.data;
      let { message } = response.data;

      if (statusCode == 1) {
        // setExamType("");
        // setExamYear("");
        setSubject("");
        setGrade("");

        setGradeObtained([...gradeObtained, savedGrade]);
        //Router.reload(window.location.pathname);

        return toast.success("Grade added successfully");
      }

      if (statusCode == 0) return toast.error(message);
    } catch (error) {
      console.log(error);
    }
  };

  const removeSchool = async (id) => {
    try {
      const filteredSchools = schoolsAttended.filter((sa) => sa.id !== id);
      const response = await axios.delete(`/api/applicant/school-attended`, {
        data: id,
      });
      setSchoolsAttended(filteredSchools);
    } catch (error) {}
  };

  const removeIndexNumber = async (id) => {
    try {
    

      const filteredIndexNumbers = indexNumberList.filter((ind) => ind.id !== id);

      const response = await axios.delete(`/api/applicant/index-number`, {
        data: id,
      });
      setIndexNumber(filteredIndexNumbers);
      router.replace(router.asPath);

    } catch (error) {
      console.log(error);
    }
  };

  const removeGrade = async (id) => {
    try {
      const filteredGrades = gradeObtained.filter((go) => go.id !== id);
      const response = await axios.delete(`/api/applicant/grades-obtained`, {
        data: id,
      });
      setGradeObtained(filteredGrades);
    } catch (error) {}
  };

  const next = async () => {
    let core = await genCode(100);

    try {
      const response = await axios.post(
        `/api/applicant/school-attended?next=true`
      );

      let { isSchoolValid } = response.data.data;
      let { isGradeValid } = response.data.data;

      if (isSchoolValid && isGradeValid)
        return Router.push("/applicant/certifications?core=" + core);

      return toast.error(
        "Add schools attended and Add grades for English, Mathematics and any other 3 subjects for BECE and WASSCE(or equivalent). You should add at least 10 grades in all"
      );
    } catch (error) {}
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={20000}
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
            <h4 className="card-title">SCHOOLS ATTENDED</h4>
          </div>
          <div className="card-body">
            <span className="badge bg-success" style={{ padding: 10 }}>
              Fill all fields with (<span style={danger}>*</span>). Click on +
              to add a school. Order school by highest education level
            </span>

            <div className="row" style={{ marginTop: "20px" }}>
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
                        onChange={(e:any) => {
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
                        onChange={(e:any) => {
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
                        onChange={(e:any) => {
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
                      {schoolsAttended.map((sx) => (
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
                              onClick={(e:any) => {
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

      <div className="col-xl-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">INDEX NUMBERS</h4>
          </div>
          <div className="card-body">
            <span className="badge bg-success " style={{ padding: 10 }}>
              Fill all fields with (<span style={danger}>*</span>). Provide your
              index numbers for BECE, WASSCE and Private WASSCE(If you plan to
              list in grades obtained).
            </span>

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
                            onChange={(e:any) => {
                              setExamType(e.target.value);
                            }}
                          >
                            <option value="">Select examination</option>
                            {examTypesNew.map((ex) => (
                              <option key={ex.id} value={ex.id}>
                                {ex.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>{" "}
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
                            onChange={(e:any) => {
                              setExamYear(e.target.value);
                            }}
                          />
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
                            onChange={(e:any) => {
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
                          <th>Examination</th>
                          <th>Month/Year</th>
                          <th>Index Number</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {indexNumbers.map((ind) => (
                          <tr key={ind.id}>
                            <td>{ind.ExamTypeNew.name}</td>
                            <td>
                              {moment(ind.year, "YYYY-MM").format("MM-YYYY")}
                            </td>
                            <td>{ind.indexNumber}</td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                id="addToTable"
                                className="btn btn-danger "
                                onClick={(e:any) => {
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
                            onChange={(e:any) => {
                              setExamType(e.target.value);
                              filterGrade(e.target.value);
                              filterSubject(e.target.value);
                            }}
                          >
                            <option value="">Select examination</option>
                            {examTypes.map((ex) => (
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
                            onChange={(e:any) => {
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
                            onChange={(e:any) => {
                              setSubject(e.target.value);
                            }}
                          >
                            {" "}
                            <option value="">Select subject</option>
                            {subjectsState.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {/*/span*/}
                      <div className="col-md-2">
                        <div className="form-group">
                          <label className="control-label">
                            Grade <span style={danger}>*</span>
                          </label>
                          <select
                            className="custom-select form-control required"
                            id="grade"
                            value={grade}
                            onChange={(e:any) => {
                              setGrade(e.target.value);
                            }}
                          >
                            <option value="">Select grade</option>
                            {gradesState.map((g) => (
                              <option key={g.id} value={g.id}>
                                {g.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/*/span*/}
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
                          <th>Examination</th>
                          <th>Month/Year</th>
                          <th>Subject</th>
                          <th>Grade</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gradeObtained.map((go) => (
                          <tr key={go.id}>
                            <td>{go.ExamType.name}</td>
                            <td>
                              {moment(go.year, "YYYY-MM").format("MM-YYYY")}
                            </td>
                            <td>{go.Subject.name}</td>
                            <td>{go.Grade.name}</td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                id="addToTable"
                                className="btn btn-danger "
                                onClick={(e:any) => {
                                  removeGrade(go.id);
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
        <div className="form-actions mt-10">
          <div className="col-md-12" style={{ textAlign: "end" }}>
            <div className="btn-group" role="group" aria-label="Basic example">
              <Link href="/applicant/personal">
                <a type="button" className="btn btn-success">
                  Previous
                </a>
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
        <br />
        <br />
      </div>
    </>
  );
};
const danger = { color: "red" };