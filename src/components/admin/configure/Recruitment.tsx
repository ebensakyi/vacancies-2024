import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

const Recruitment = ({ data }: any) => {
    const [name, setName] = useState("");
    const [staffType, setStaffType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");

    const save = async () => {
        try {
            if (name == "" || staffType == "")
                return toast.error("Data not saved. Enter sex");

            const response = await axios.post("/api/admin/recruitment", {
                data: { name, staffType },
            });
            if (response.data.statusCode == 1) {
                setName("");
                setStaffType("");
                // Router.reload(window.location.pathname);
                return toast.success("Data saved successfully");
            }
            if (response.data.statusCode == 0) return toast.error("Data not saved");
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
                                    <h4 className="mb-0">RECRUITMENT</h4>
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
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <div className="mb-6 position-relative">
                                                                <label htmlFor="grade">
                                                                    Name : <span className="danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control required"
                                                                    value={name}
                                                                    onChange={(e) => {
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
                                                                    Staff type : <span className="danger">*</span>
                                                                </label>
                                                                <select
                                                                    className="custom-select form-control required"
                                                                    required
                                                                    onChange={(e: any) => {
                                                                        setStaffType(e.target.value);
                                                                    }}
                                                                    value={staffType}
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

                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <div className="mb-3 position-relative">
                                                                <label className="form-label" htmlFor="deadline">
                                                                    Start Date : <span className="danger">*</span>{" "}
                                                                </label>
                                                                <input
                                                                    type="date"
                                                                    className="form-control required"
                                                                    id="mdate"
                                                                    value={startDate}
                                                                    required
                                                                    onChange={(e: any) => {
                                                                        setStartDate(e.target.value);
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
                                                    <div className="col-md-3">
                                                        <div className="form-group">
                                                            <div className="mb-3 position-relative">
                                                                <label htmlFor="addToTable">
                                                                    Add <span className="danger"></span>
                                                                </label>
                                                                <br />
                                                                <button
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        save();
                                                                    }}
                                                                    className="btn btn-success  add"
                                                                >
                                                                    <i className="fas fa-plus-circle"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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

export default Recruitment;
