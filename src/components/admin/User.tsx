"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";
// import Router from "next/router";

const User = ({ jobs, departments, userTypes }:any) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  // const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [userType, setUserType] = useState();
  const [accessibleJobs, setAccessibleJobs] = useState([]);
  const save = async () => {
    try {
      const data = {
        firstName,
        surname,
        otherNames,
        email,
        phone,
        department,
        position,
        userType,
        accessibleJobs,
      };
      if (
        firstName == "" ||
        surname == "" ||
        position == "" ||
        phone == "" ||
        email == "" ||
        department == ""
      )
        return toast.error("Please fill the form");

      const response = await axios.post("/api/admin/user", { data });
      let { message } = response.data;
      let { statusCode } = response.data;

      if (statusCode == 1) {
        setFirstName("");
        setEmail("");
       // Router.reload(window.location.pathname);
        return toast.success(message);
      }
      if (statusCode == 0) return toast.error(message);
    } catch (error) {}
  };

  // const onSelect = (selectedList, selectedItem) => {
  //   setAccessibleJobs([...accessibleJobs, { jobId: selectedItem.id }]);
  // };

  // const onRemove = (selectedList, removedItem) => {
  //   const filtered = accessibleJobs.filter((m) => m.jobId !== removedItem.id);
  //   setAccessibleJobs(filtered);
  // };
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
          <h4 className="card-title">ADD USER</h4>
        </div>
        <div className="card-body">
          <form className="needs-validation" method="POST" id="admin-form">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="firstName">
                        First name: <span className="danger">*</span>{" "}
                      </label>

                      <input
                        className="form-control"
                        name="firstName"
                        type="text"
                        required
                        id="validationTooltip02"
                        placeholder="First name"
                        onChange={(e:any) => {
                          setFirstName(e.target.value);
                        }}
                      />
                      <div className="invalid-tooltip">
                        First name is required
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="lastName">
                        Surname: <span className="danger">*</span>{" "}
                      </label>

                      <input
                        className="form-control"
                        name="surName"
                        type="text"
                        required
                        id="validationTooltip02"
                        placeholder="Surname"
                        onChange={(e:any) => {
                          setSurname(e.target.value);
                        }}
                      />
                      <div className="invalid-tooltip">Surname is required</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="otherNames">Other names: </label>

                      <input
                        className="form-control"
                        name="otherNames"
                        type="text"
                        id="validationTooltip02"
                        placeholder="Other name(s)"
                        onChange={(e:any) => {
                          setOtherNames(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="sex">
                        {" "}
                        Sex : <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="sex"
                        id="validationTooltip02"
                        onChange={(e:any) => {
                          setSex(e.target.value);
                        }}
                      >
                        <option value="">Select sex</option>
                        {sexes.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-tooltip">Gender is required</div>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="email">
                        Email: <span className="danger">*</span>{" "}
                      </label>

                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        required
                        id="validationTooltip02"
                        placeholder="Email"
                        onChange={(e:any) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <div className="invalid-tooltip">Email is required</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="phoneNumber">
                        Phone number: <span className="danger">*</span>
                      </label>

                      <input
                        className="form-control"
                        name="phoneNumber"
                        id="validationTooltip02"
                        type="text"
                        maxLength={10}
                        required
                        placeholder="Phone number"
                        onChange={(e:any) => {
                          setPhone(e.target.value);
                        }}
                      />
                      <div className="invalid-tooltip">
                        Phone number is required
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="department">
                        Department: <span className="danger">*</span>{" "}
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="department"
                        id="validationTooltip02"
                        onChange={(e:any) => {
                          setDepartment(e.target.value);
                        }}
                      >
                        <option value="">Select department</option>
                        {departments.map((data:any) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-tooltip">
                        Department is required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="division">
                        Division: <span className="danger">*</span>{" "}
                      </label>

                      <select
                        className="custom-select form-control"
                        required
                        name="division"
                        id="validationTooltip02"
                        onChange={(e:any) => {
                          setDivision(e.target.value);
                        }}
                      >
                        <option value="">Select division</option>
                        <option value="{{id}}">ICTD</option>
                      </select>
                      <div className="invalid-tooltip">
                        Division is required
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="position">
                        Position: <span className="danger">*</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        name="position"
                        id="validationTooltip02"
                        type="text"
                        required
                        placeholder="Enter position"
                        onChange={(e:any) => {
                          setPosition(e.target.value);
                        }}
                      />
                      <div className="invalid-tooltip">
                        Position is required
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group ">
                    <div className="mb-3 position-relative">
                      <label htmlFor="userType">
                        User type: <span className="danger">*</span>
                      </label>
                      <select
                        className="custom-select form-control"
                        required
                        name="userType"
                        id="validationTooltip02"
                        onChange={(e:any) => {
                          setUserType(e.target.value);
                        }}
                      >
                        <option value="">Select type</option>
                        {userTypes.map((data:any) => (
                          <option key={data.id} value={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                      <div className="invalid-tooltip">
                        User type is required
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <div className="mb-4 position-relative">
                      <label htmlFor="policy">
                        Select accessible position(s) :{" "}
                        <span className="danger">*</span>
                      </label>
                      {/* <Multiselect
                        options={jobs}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="form-actions mt-10"
                style={{ textAlign: "end" }}
              >
                <button
                  className="btn btn-success btn-anim tst3 "
                  type="submit"
                  onClick={(e:any) => {
                    e.preventDefault();
                    save();
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default User;
