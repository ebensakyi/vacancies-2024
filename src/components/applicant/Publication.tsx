
"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ApplicationMenu from "../ApplicationMenu";
import moment from "moment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { LOGIN_URL } from "@/constants";

const Publication = ({ data }: any) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })

    const router = useRouter()
    const [publications, setPublications] = useState([]);

    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [authors, setAuthors] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");


    const add = async () => {
        try {
            if (
                description == "" ||
                authors == "" ||
                date == "" ||
                title == ""
            )
                return toast.error("Please fill the form");
            const data = {
                description: description.trim(),
                url: url.trim(),
                authors: authors.trim(),
                date,
                title: title.trim(),
            };
            const response = await axios.post("/api/applicant/publication", {
                data,
            });

            if (response.status == 200) {
                setTitle("");
                setUrl("");
                setAuthors("");
                setDescription("");
                setDate("")

                router.refresh()

                return toast.success("Data saved successfully");
            }

            if (response.status != 200) return toast.error("Data not saved");
        } catch (error) {

        }

    };


    const deletePublication = async (id: any) => {
        try {
            const response = await axios.delete(
                `/api/applicant/publication`, { data: id }
            );
            router.refresh()

            return toast.success("Data deleted successfully");            
        } catch (error) {

        }

    }
    return (
        <div id="layout-wrapper">
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">PUBLICATION </h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ApplicationMenu whichLink="publications" />

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
                                    {/* <h4 classNameName="card-title">ADD</h4> */}
                                </div>
                                <div className="card-body">
                                    <form method="POST">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        {/* <p style={danger}>
                      <i
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        style={danger}
                      ></i>
                      <b> Add publications here</b>
                    </p> */}
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="title">
                                                                        Title : <span style={danger}>*</span>{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        id="title"
                                                                        value={title}
                                                                        onChange={(e: any) => {
                                                                            setTitle(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="date">
                                                                        Date : <span style={danger}>*</span>{" "}
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        className="form-control "
                                                                        required
                                                                        id="date"
                                                                        value={date}
                                                                        onChange={(e: any) => {
                                                                            setDate(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="authors">
                                                                        Other author(s) : <span style={danger}>*</span>{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        id="authors"
                                                                        value={authors}
                                                                        onChange={(e: any) => {
                                                                            setAuthors(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-3">
                                                                <div className="form-group ">
                                                                    <div className="col-xs-12">
                                                                        <label htmlFor="url">Url : </label>

                                                                        <input
                                                                            type="url"
                                                                            className="form-control"
                                                                            id="url"
                                                                            value={url}
                                                                            onChange={(e: any) => {
                                                                                setUrl(e.target.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-10">
                                                                <div className="form-group">
                                                                    <label htmlFor="description">
                                                                        Description : <span style={danger}>*</span>{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        id="description"
                                                                        value={description}
                                                                        onChange={(e: any) => {
                                                                            setDescription(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="addToTable">
                                                                        Add <span style={danger}></span>
                                                                    </label>
                                                                    <br />
                                                                    <button
                                                                        type="button"
                                                                        id="addToTable"
                                                                        className="btn btn-success  add"
                                                                        onClick={() => {
                                                                            add();
                                                                        }}
                                                                    >
                                                                        {" "}
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="table-responsive">
                                                        <table className="table mb-0" >
                                                            <thead className="table-light">
                                                                <tr>
                                                                    <th hidden>Id</th>
                                                                    <th>Title</th>
                                                                    <th>Author</th>
                                                                    <th>Url</th>
                                                                    <th>Date</th>
                                                                    <th>Description</th>

                                                                    <th>Remove</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data?.publications?.response?.map((e: any) => (
                                                                    <tr key={e.id}>
                                                                        <td>{e.title}</td>
                                                                        <td>{e.authors}</td>
                                                                        <td>{e.url}</td>
                                                                        <td>{e.date}</td>
                                                                        <td>{e.description}</td>

                                                                        <td>
                                                                            {" "}
                                                                            <button
                                                                                type="button"
                                                                                id="addToTable"
                                                                                className="btn btn-danger "
                                                                                onClick={() => {
                                                                                    deletePublication(e.id);
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
                                        <Link href="/applicant/essay" type="button" className="btn btn-success">
                                                Previous
                                        </Link>
                                        <Link href="/applicant/references" type="button" className="btn btn-success">
                                                Next
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const danger = { color: "red" };
export default Publication;
