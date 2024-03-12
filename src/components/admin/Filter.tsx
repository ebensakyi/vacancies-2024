"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { ADMIN_LOGIN_URL } from "@/constants";
import { redirect } from "next/navigation";

const Filter = ({
  stats,
  genderList,
  educationLevelList,
  jobList,
  filtered,
}:any) => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect(ADMIN_LOGIN_URL);
    }
})
  const [educationLevel, setEducationLevel] = useState("");
  // const [age, setAge] = useState("");
  const [requiredYears, setRequiredYears] = useState("");
  //const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

  const filter = async () => {
    if (educationLevel == "" || requiredYears == "" || job == "")
      return toast.error("Please make sure you select every field");
    const data = { educationLevel, requiredYears, job };
    const response = await axios.post("/api/admin/filter", { data });
  };
  return (
    <>
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
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Filter criteria</h4>
              <p className="card-title-desc">
                Click on view to view the broadsheet of a position.
              </p>
              <div className="row">
                <div className="col-md-2">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Education Level: <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="department"
                        id="validationTooltip02"
                        onChange={(e:any) => {
                          setEducationLevel(e.target.value);
                        }}
                      >
                        <option value="">Select </option>
                        <option value="*">Any</option>
                        {educationLevelList.map((el:any) => (
                          <option key={el.id} value={el.id}>
                            Must Not Contain {el.name}
                          </option>
                        ))}
                        {/* <option value="">Must contains degree</option>
                        <option value="">Must not contain degree</option>
                        <option value="">Contains at least WASSCE</option> */}
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-2">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Grade: <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="department"
                        id="validationTooltip02"
                      >
                        <option value="">Select </option>
                        <option value="">NA</option>
                        <option value="">Not more than 6 in a subject</option>
                        <option value="">Not more than 6 in full grade</option>
                      </select>
                    </div>
                  </div>
                </div> */}
                {/* <div className="col-md-2">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Age: <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="department"
                        id="validationTooltip02"
                      >
                        <option value="">Select </option>
                        <option value="*">At least 18</option>
                        <option value="18 to 40">From 18 to 40 years</option>
                        <option value=">40">More than 40 years</option>
                      </select>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-2">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Work Experience Years: <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="department"
                        id="validationTooltip02"
                        onChange={(e:any) => {
                          setRequiredYears(e.target.value);
                        }}
                      >
                        <option value="">Select </option>
                        <option value="*">Any number of year</option>

                        <option value="1">At least 1 year</option>
                        <option value="2">At least 2 years</option>
                        <option value="3">At least 3 years</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-2">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Gender: <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="department"
                        id="validationTooltip02"
                      >
                        <option value="">Select </option>
                        <option value="*">Any</option>
                        {genderList.map((gl) => (
                          <option value={gl.id}>{gl.name}</option>
                        ))}
                      
                      </select>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-2">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Apply filter on: <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="department"
                        id="validationTooltip02"
                        onChange={(e:any) => {
                          setJob(e.target.value);
                        }}
                      >
                        <option value="">Select job </option>
                        {/* <option value="*">ALL</option> */}
                        {jobList.map((jl:any) => (
                          <option key={jl.id} value={jl.id}>{jl.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Click to filter: <span className="danger">*</span>{" "}
                      </label>
                      <button
                        className="btn btn-success btn-anim tst3 form-control "
                        type="submit"
                        onClick={(e:any) => {
                          e.preventDefault();
                          filter();
                        }}
                      >
                        Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">STATISTICS BEFORE FILTER</h4>

              <table
                id="datatabs"
                className="table table-striped table-bordered dt-responsive nowrap"
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                  <th>#</th> 
                    <th>Job title</th>
                    <th># of applications</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((job) => {
                    return (
                      <tr>
                         <td>{job.id}</td> 
                        <td>{job.name}</td>
                        <td>{job._count.Application}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">STATISTICS AFTER FILTER</h4>
              <table
                id="datatabs"
                className="table table-striped table-bordered dt-responsive nowrap"
                style={{
                  borderCollapse: "collapse",
                  borderSpacing: 0,
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th>#</th> 
                    <th>Job title</th>
                    <th># of applications</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((job) => {
                    return (
                      <tr>
                        <td>{job.id}</td> 
                        <td>{job.name}</td>
                        <td>{job._count.Application}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Filter;
