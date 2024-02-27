"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, redirect } from "next/navigation";
import moment from "moment";

const Policy = ({ data }: any) => {
const router = useRouter()
  console.log(data);
  

  const ages = [];

  for (let age = 18; age < 46; age++) {
    ages.push(age)
  }
  const [name, setName] = useState();
  const [deadline, setDeadline] = useState();
  const [age, setAge] = useState();
  const [miniGrade, setMiniGrade] = useState();
  const [miniEducation, setMiniEducation] = useState();
  const [experience, setExperience] = useState();
  const [staffType, setStaffType] = useState();
  const [note, setNote] = useState("");


  const save = async () => {
    try {
      if (name == null || deadline == null)
        return toast.error("Please fill the form");

      const data = {
        name,
        deadline,
        age,
        miniGrade,
        miniEducation,
        experience,
        staffType,
        note,
      };
      const response = await axios.post("/api/admin/policy", { data });
      if (response.status == 200) {
        router.refresh();

        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) { }
  };



  return (
    <div id="layout-wrapper">
      {/* <Header /> */}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">SHORTLIST POLICY</h4>
                </div>
              </div>
            </div>
            <div className="row">

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
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">ADD</h4>
                  </div>
                  <div className="card-body">
                    <form className="needs-validation" noValidate>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="name">
                                Policy name : <span className="danger">*</span>{" "}
                              </label>
                              <input
                                type="text"
                                className="form-control required"
                                value={name}
                                required
                                onChange={(e: any) => {
                                  setName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="deadline">
                                Deadline : <span className="danger">*</span>{" "}
                              </label>
                              <input
                                type="date"
                                className="form-control required"
                                id="mdate"
                                value={deadline}
                                required
                                onChange={(e: any) => {
                                  setDeadline(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="age">
                                Age limit(in years): <span className="danger">*</span>{" "}
                              </label>
                              <select
                                className="custom-select form-control required"
                                id="age"
                                required
                                onChange={(e: any) => {
                                  setAge(e.target.value);
                                }}
                              >
                                <option value="">Select limit</option>
                                {ages.map((row, index) => (
                        <option key={index} value={row}>
                          {row} years old
                        </option>
                      ))}

                                { }
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="grade">
                                Minimum grade limit: <span className="danger">*</span>
                              </label>
                              <select
                                className="custom-select form-control requireddd"
                                id="minimumGrade"
                                required
                                onChange={(e: any) => {
                                  setMiniGrade(e.target.value);
                                }}
                              >
                                <option value="">Select limit</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="experience">
                                Experience(in years) : <span className="danger">*</span>
                              </label>
                              <select
                                className="custom-select form-control required"
                                id="experience"
                                required
                                onChange={(e: any) => {
                                  setExperience(e.target.value);
                                }}
                              >
                                <option value="">Select limit</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="0">NA</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="note">
                                Minimum education qualification :{" "}
                                <span className="danger">*</span>
                              </label>
                              <select
                                className="custom-select form-control required"
                                id="minimumEduLevel"
                                required
                                onChange={(e: any) => {
                                  setMiniEducation(e.target.value);
                                }}
                              >
                                <option value="">Select limit</option>
                                {data?.levels?.response?.map((data: any) => (
                                  <option key={data.id} value={data.id}>
                                    {data.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="note">
                                Staff type : <span className="danger">*</span>
                              </label>
                              <select
                                className="custom-select form-control required"
                                required
                                onChange={(e: any) => {
                                  setStaffType(e.target.value);
                                }}
                              >
                                <option value="">Select staff</option>
                                {data?.staffTypes?.response?.map((data: any) => (
                                  <option key={data.id} value={data.id}>
                                    {data.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* <div className="col-md-4">
                <div className="form-group">
                  <div className="mb-3 position-relative">
                    <label className="form-label" htmlFor="note">
                      Application sections :<span className="danger">*</span>
                    </label>
                    <Multiselect
                      options={applicationMenuList}
                      onSelect={onSelect}
                      onRemove={onRemove}
                      displayValue="name"
                    />
                  </div>
                </div>
              </div> */}
                        <div className="col-md-4">
                          <div className="form-group">
                            <div className="mb-3 position-relative">
                              <label className="form-label" htmlFor="note">
                                Note (optional):
                              </label>
                              <input
                                type="text"
                                className="form-control required"
                                value={note}
                                required
                                onChange={(e: any) => {
                                  setNote(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-actions mt-10">
                        <button
                          type="button"
                          className="btn btn-success add"
                          onClick={(e) => {
                            e.preventDefault();
                            save();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">LIST</h4>
                    {/* <p className="card-title-desc">
              Use one of two modifier classes to make <code>&lt;thead&gt;</code>
              s appear light or dark gray.
            </p> */}
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Minimum Edu</th>
                            <th>Minimum Grade</th>
                            <th>Experience</th>
                            <th>Staff type</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.policies?.response?.map((data: any) => {
                            return (
                              <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>

                                <td>{data.age}</td>
                                <td>{data.EducationLevel.name}</td>
                                <td>{data.minimumGrade}</td>
                                <td>{data.experience}</td>
                                <td>{data.StaffType.name}</td>

                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm waves-effect waves-light"
                                  >
                                    <i className="dripicons-trash" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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

export default Policy;
