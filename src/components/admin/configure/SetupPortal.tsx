"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, redirect } from "next/navigation";
import moment from "moment";

const SetupPortal = ({ data }: any) => {

    const [currentRecruitment, setCurrentRecruitment] = useState("");
    const [currentShortlist, setCurrentShortlist] = useState("");
    const pathname = usePathname()

    const save = async () => {
        try {
            if (currentShortlist == null || currentRecruitment == null)
                return toast.error("Please set recruitment type and shortlisting type");

            const response = await axios.post("/api/admin/setup-portal", {
                data: { currentRecruitment, currentShortlist },
            });
            if (response.status == 1) {
                setCurrentRecruitment("");
                setCurrentShortlist("");

                redirect(pathname);

                return toast.success("Data saved successfully");
            }
            if (response.status == 0) return toast.error("Data not saved");
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
                                    <h4 className="mb-0">SETUP</h4>
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
                                        <div className="alert alert-danger" role="alert">
                                            Wrongfully set-up would wrongfully affect the recruitment
                                            process. Make sure you understand what you are doing
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="mb-6 position-relative">
                                                        <label htmlFor="grade">
                                                            Select Current Recruitment type :
                                                            <span className="danger">*</span>
                                                        </label>
                                                        <select
                                                            className="custom-select form-control "
                                                            required
                                                            onChange={(e) => {
                                                                setCurrentRecruitment(e.target.value);
                                                            }}
                                                        >
                                                            <option value="">
                                                                Select staff you are recruiting
                                                            </option>
                                                            {data?.recruitment?.map((st: any) => (
                                                                <option key={st.id} value={st.id}>
                                                                    {st.name} - {st.StaffType.name}
                                                                </option>
                                                            ))}{" "}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <div className="mb-6 position-relative">
                                                        <label htmlFor="grade">
                                                            Select Current Shortlisting type :
                                                            <span className="danger">*</span>
                                                        </label>
                                                        <select
                                                            className="custom-select form-control "
                                                            required
                                                            onChange={(e) => {
                                                                setCurrentShortlist(e.target.value);
                                                            }}
                                                        >
                                                            <option value="">Select shortlisting</option>
                                                            {data?.recruitment?.map((st: any) => (
                                                                <option key={st.id} value={st.id}>
                                                                    {st.name} - {st.StaffType.name}
                                                                </option>
                                                            ))}{" "}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <div className="mb-3 position-relative">
                                                        <label htmlFor="addToTable">
                                                            Set
                                                            <span className="danger"></span>
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
                                                            {""}
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Current set-up</h4>
                                    </div>
                                    <div className="card-body">
                                        <form method="POST">
                                            <div className="card-body">
                                                {/* <div className="row">
                  <span>
                    Recruitment:
                    <h5>{current.cr.Recruitment!=null?current.cr.Recruitment.name:""}</h5>
                  </span>
                  <span>
                    Staff type:
                    <h5>{current.cr.Recruitment!=null?current.cr.Recruitment.StaffType.name:""}</h5>
                  </span>
                  <span>
                    Year:
                    <h5>({current.cr.Recruitment!=null?current.cr.Recruitment.code:""})</h5>
                  </span>
                </div>
                <hr/>
                <div className="row">
                  <span>
                    Shortlisting:
                    <h5>{current.cr.Recruitment!=null?current.cs.Recruitment.name:""}</h5>
                  </span>
                  <span>
                    Staff type:
                    <h5>{current.cr.Recruitment!=null?current.cs.Recruitment.StaffType.name:""}</h5>
                  </span>
                  <span>
                    Year:
                    <h5>({current.cr.Recruitment!=null?current.cs.Recruitment.code:""})</h5>
                  </span>
                </div> */}
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

export default SetupPortal;
