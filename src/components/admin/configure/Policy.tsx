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
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [miniGrade, setMiniGrade] = useState("");
  const [miniEducation, setMiniEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [recruitment, setRecruitment] = useState("");
  const [note, setNote] = useState("");


  const save = async () => {
    try {
      if (name == "" || age == "" || miniGrade == "" || miniEducation == "" || experience == "" || recruitment == "")
        return toast.error("Please fill the form");

      const data = {
        name,
        recruitment,
        age,
        miniGrade,
        miniEducation,
        experience,
        note,
      };
      const response = await axios.post("/api/admin/policy", { data });
      if (response.status == 200) {
        setName("")
        setRecruitment("")
        setAge("")
        setMiniEducation("")
        setMiniGrade("")
        setExperience("")
        setNote("")
        router.refresh();

        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) { }
  };


  const updatePolicy = async () => {
    try {
      if (name == "" || recruitment == "" || age == "" || miniGrade == "" || miniEducation == "" || experience == "" )
        return toast.error("Please fill the form");

      const data = {
        id,
        name,
        recruitment,
        age,
        miniGrade,
        miniEducation,
        experience,
        note,
      };
      const response = await axios.put("/api/admin/policy", { data });
      if (response.status == 200) {
        setId("")
        setName("")
       
        setAge("")
        setMiniEducation("")
        setMiniGrade("")
        setExperience("")
        setRecruitment("")
        setNote("")
        router.refresh();

        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) { }
  };

  const deletePolicy = async (id: any) => {
    try {

      const data = {
        id
      };
      const response = await axios.delete("/api/admin/policy", { data });
      if (response.status == 200) {
        router.refresh();
        return toast.success("Policy deleted successfully");
      }
      if (response.status != 200) return toast.error("Policy not deleted");
    } catch (error) { return toast.error("Policy not deleted"); }
  }

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
              <div className="col-lg-12">
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
                                                                <label className="form-label" htmlFor="note">
                                                                    Recruitment : <span className="danger">*</span>
                                                                </label>
                                                                <select
                                                                    className="custom-select form-control required"
                                                                    required
                                                                    onChange={(e: any) => {
                                                                        setRecruitment(e.target.value);
                                                                    }}
                                                                    value={recruitment}
                                                                >
                                                                    <option value="">Select staff</option>
                                                                    {data?.recrtuitment?.response?.map((data: any) => (
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
                              <label className="form-label" htmlFor="age">
                                Age limit(in years): <span className="danger">*</span>{" "}
                              </label>
                              <select
                                className="custom-select form-control required"
                                required
                                onChange={(e: any) => {
                                  setAge(e.target.value);
                                }}
                                value={age}
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
                                value={miniGrade}
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
                                value={experience}
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
                                value={miniEducation}
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
                        {id==""?
                          <button
                          type="button"
                          className="btn btn-success add"
                          onClick={(e) => {
                            e.preventDefault();
                            save();
                          }}
                        >
                          Save
                        </button>:  <button
                          type="button"
                          className="btn btn-warning add"
                          onClick={(e) => {
                            e.preventDefault();
                            updatePolicy();
                          }}
                        >
                          Update
                        </button>
                      }
                      
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
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
                            {/* <th>#</th> */}
                            <th>Name</th>
                            <th>Age</th>
                            <th>Minimum Edu</th>
                            <th>Minimum Grade</th>
                            <th>Experience</th>
                            <th>Recruitment</th>

                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.policies?.response?.map((data: any) => {
                            return (
                              <tr key={data.id}>
                                {/* <td>{data.id}</td> */}
                                <td>{data.name}</td>

                                <td>{data.age}</td>
                                <td>{data.EducationLevel.name}</td>
                                <td>{data.minimumGrade}</td>
                                <td>{data.experience}</td>
                                <td>{data.Recruitment.name}</td>

                                <td>

                                  <button
                                    type="button"
                                    className="btn btn-primary btn-sm waves-effect waves-light"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setId(data.id)
                                      setName(data.name)
                                      // setDeadline(data.deadline)
                                      setAge(data.age)
                                      setMiniGrade(data.minimumGrade)
                                      setExperience(data.experience)
                                      setMiniEducation(data.educationLevelId)
                                      setRecruitment(data.recr)
                                      setNote(data.note)
                                    }}
                                  >
                                    <i className="dripicons-pencil" />
                                  </button>  {" "} 
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm waves-effect waves-light"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      deletePolicy(data.id)
                                    }}
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


