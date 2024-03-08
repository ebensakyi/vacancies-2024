"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { useSession } from "next-auth/react";
import { ADMIN_LOGIN_URL } from "@/constants";

const Job = ({ data }: any) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(ADMIN_LOGIN_URL);
        }
    })
    let router = useRouter()
    const [id, setId] = useState("")
    const [name, setName] = useState("");
    const [policy, setPolicy] = useState("");
    const pathname = usePathname()
    const [publish, setPublish] = useState("");


    const handlePublishing = async (id: any) => {
        try {
            const data = {
                publish:1,
                id,
            
            };
            const response = await axios.put("/api/admin/job", { data });
            if (response.status == 200) {
                router.refresh()
                return toast.success("Job published successfully");
            }
            if (response.status != 200) return toast.error("Job not published ");
        } catch (error) {

        }

    };

    const save = async () => {
        try {
            const data = {
                name,
                policy,
            };
            if (name == "" || policy == "")
                return toast.error("Data not saved. Fill form");

            const response = await axios.post("/api/admin/job", { data });


            if (response.status == 200) {
                setName("");
                router.refresh()

                return toast.success("Data saved successfully");
            }
            if (response.status != 200) return toast.error("Data not saved");
        } catch (error) {

        }

    };
    const update = async () => {
        try {
            const data = {
                update:1,
                id,
                name,
                policy,
            };
            if (name == "" || policy == "")
                return toast.error("Data not saved. Fill form");

            const response = await axios.put("/api/admin/job", { data });
            if (response.status == 200) {
                setName("");
                setId("")
                setPolicy("")
                router.refresh()

                return toast.success("Data saved successfully");
            }
            if (response.status != 200) return toast.error("Data not saved");
        } catch (error) {

        }

    };

    const deleteJob = async (id: any) => {
        try {
            const data = {
                id,

            };


            const response = await axios.delete("/api/admin/job", { data });
            if (response.status == 200) {
                router.refresh()

                return toast.success("Data deleted successfully");
            }
            if (response.status != 200) return toast.error("Data not deleted");
        } catch (error) {

        }

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
                                    <h4 className="mb-0">JOBS</h4>
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
                                        <form method="POST">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <div className="mb-5 position-relative">
                                                            <label htmlFor="jobName">
                                                                Job: <span className="danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                onChange={(e) => {
                                                                    setName(e.target.value);
                                                                }}
                                                                value={name}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <div className="mb-5 position-relative">
                                                            <label htmlFor="policy">
                                                                Shortlist policy : <span className="danger">*</span>
                                                            </label>

                                                            <select
                                                                className="custom-select form-control required"
                                                                id="policy"
                                                                value={policy}
                                                                onChange={(e) => {
                                                                    setPolicy(e.target.value);
                                                                }}
                                                            >
                                                                <option value="">Select policy</option>
                                                                {data?.policies?.response?.map((policy: any) => (
                                                                    <option key={policy.id} value={policy.id}>
                                                                        {policy.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-2">
                                                    <div className="form-group">
                                                        <label htmlFor="save">
                                                            Add <span className="danger"></span>
                                                        </label>
                                                        <br />
                                                        {id != "" ? <button
                                                            type="button"
                                                            className="btn btn-warning add"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                update();
                                                            }}
                                                        >
                                                            Update
                                                        </button> : <button
                                                            type="button"
                                                            className="btn btn-success add"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                save();
                                                            }}
                                                        >
                                                            Save
                                                        </button>}

                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">JOBS</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        {/* <th>#</th> */}
                                                        <th>Name</th>
                                                        <th>Policy</th>
                                                        <th>Deadline</th>
                                                        <th>Is published</th>

                                                        <th>Publish</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.jobs?.response?.map((data: any) => {
                                                        return (
                                                            <tr key={data.id}>
                                                                {/* <td>{data.id}</td> */}
                                                                <td>{data.name}</td>
                                                                <td>{data.Policy.name}</td>
                                                                <td>{moment(data.Policy.deadline).format("DD-MM-YYYY")}</td>
                                                                <td>{data.published == 0 ? "No" : "Yes"}</td>

                                                                <td>
                                                                    <div className="form-check form-check-right">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id="formCheckRight2"
                                                                            checked={data.published == 1 ? true : false}
                                                                            onChange={(e: any) => {
                                                                                setPublish(e.target.checked);
                                                                                handlePublishing(data.id);
                                                                            }}
                                                                        />
                                                                        <label
                                                                            className="form-check-label"
                                                                            htmlFor="formCheckRight2"
                                                                            style={{ color: "green" }}
                                                                        >
                                                                            Publish
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>      <button
                                                                    type="button"
                                                                    className="btn btn-warning btn-sm waves-effect waves-light"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        setId(data.id)
                                                                        setName(data.name)
                                                                        setPolicy(data.policyId)

                                                                    }}
                                                                >
                                                                    <i className="dripicons-pencil" />
                                                                </button>{" "}
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault()
                                                                            deleteJob(data.id);
                                                                        }}
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

export default Job;
