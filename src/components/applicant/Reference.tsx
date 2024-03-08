
"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ApplicationMenu from "../ApplicationMenu";
import moment from "moment";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/constants";

const Reference = ({ data }: any) => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })
    const router = useRouter()
    const [references, setReferences] = useState([]);

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [occupation, setOccupation] = useState("");
    const [fullName, setFullName] = useState("");



    const add = async () => {
        try {
            if (
                phone == "" ||
                address == "" ||
                occupation == "" ||
                fullName == ""
            )
                return toast.error("Please fill the form");
            const data = {
                phone: phone.trim(),
                address: address.trim(),
                occupation: occupation.trim(),
                fullName: fullName.trim(),
            };
            const response = await axios.post("/api/applicant/references", {
                data,
            });
            let { status } = response;

            if (status == 200) {
                setPhone("");
                setAddress("");
                setOccupation("");
                setFullName("");

                router.refresh()
               
                return toast.success("Data saved successfully");
            }

            if (status != 200) return toast.error("Data not saved");
        } catch (error) {
            return toast.error("Data not saved");
         }
    };

    const remove = async (id: any) => {
        const response = await axios.delete(`/api/applicant/references`, {
            data: id,
        });  
        let { status } = response;

        router.refresh()

        if (status == 200) {
           
           
            return toast.success("Reference removed successfully");
        }

        if (status != 200) return toast.error("Reference not remove");
    };



    const next = async () => {
        if (data?.references?.response?.length != 3) {
            return toast.error(
                "Please enter exactly 3 references before clicking next"
            );

        }
       

        await router.push(
            `/applicant/submit-application?next=true`
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
                                    <h4 className="mb-0">PUBLICATION </h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ApplicationMenu whichLink="references" />

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
                                    <h4 className="card-title">REFERENCES</h4>
                                </div>
                                <div className="card-body">
                                    <span className="badge bg-success " style={{ padding: 10 }}>
                                        {" "}
                                        Add 3 references here. Click on (+) to add a reference.
                                    </span>

                                    <form method="POST">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="refName">
                                                                        Name : <span style={danger}>*</span>{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        id="refName"
                                                                        value={fullName}
                                                                        onChange={(e: any) => {
                                                                            setFullName(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-group">
                                                                    <label htmlFor="refOccupation">
                                                                        Occupation : <span style={danger}>*</span>{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control "
                                                                        required
                                                                        id="refOccupation"
                                                                        value={occupation}
                                                                        onChange={(e: any) => {
                                                                            setOccupation(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="refAddress">
                                                                        Address : <span style={danger}>*</span>{" "}
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        required
                                                                        id="refAddress"
                                                                        value={address}
                                                                        onChange={(e: any) => {
                                                                            setAddress(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="form-group ">
                                                                    <div className="col-xs-12">
                                                                        <label htmlFor="phoneNumber">
                                                                            Phone number : <span style={danger}>*</span>{" "}
                                                                        </label>

                                                                        <input
                                                                            id="input-repeat"
                                                                            type="number"
                                                                            maxLength={10}
                                                                            className="form-control"
                                                                            value={phone}
                                                                            onChange={(e: any) => {
                                                                                setPhone(e.target.value);
                                                                            }}
                                                                        />
                                                                        <small className="text-muted">
                                                                            Enter in the following format 0240000000
                                                                        </small>
                                                                    </div>
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
                                                        <table className="table mb-0">
                                                            <thead className="table-light">
                                                                <tr>
                                                                    <th hidden>Id</th>
                                                                    <th>Name</th>
                                                                    <th>Occupation</th>
                                                                    <th>Address</th>
                                                                    <th>Phone number</th>

                                                                    <th>Remove</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data?.references?.response?.map((e: any) => (
                                                                    <tr key={e.id}>
                                                                        <td>{e.name}</td>
                                                                        <td>{e.occupation}</td>
                                                                        <td>{e.address}</td>
                                                                        <td>{e.phone}</td>

                                                                        <td>
                                                                            {" "}
                                                                            <button
                                                                                type="button"
                                                                                id="addToTable"
                                                                                className="btn btn-danger "
                                                                                onClick={() => {
                                                                                    remove(e.id);
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
                                      
                                      {/* CHECK STAFF TYPE FOR PEVIOUS */}
                                            <Link href="/applicant/publication" type="button" className="btn btn-success">
                                                    Previous
                                            </Link>
                                          
                                            <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => {
                                            next();
                                        }}
                                    >
                                        Next
                                    </button>
                                        {/* )} */}
                                       
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
export default Reference;
