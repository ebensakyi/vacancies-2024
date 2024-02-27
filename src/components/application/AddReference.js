import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { genCode } from "../../util/generate-random";

export const AddReference = ({ referencesList }) => {
  const [references, setReferences] = useState([]);

  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [occupation, setOccupation] = useState();
  const [fullName, setFullName] = useState();

  let cookie = Cookies.get("rt") || "";
  let menu = cookie.charAt(cookie.length - 1);

  useEffect(() => {
    setReferences(referencesList);
  }, [referencesList]);
  const add = async () => {
    try {
      if (
        phone == null ||
        address == null ||
        occupation == null ||
        fullName == null
      )
        return toast.error("Please fill the form");
      const data = {
        phone: phone.trim(),
        address: address.trim(),
        occupation: occupation.trim(),
        fullName: fullName.trim(),
      };
      const response = await axios.post("/api/application/reference", {
        data,
      });
      let { statusCode } = response.data;

      if (statusCode == 1) {
        setPhone("");
        setAddress("");
        setOccupation("");
        setFullName("");

        setReferences([...references, response.data.data]);
        //Router.reload(window.location.pathname);
        return toast.success("Data saved successfully");
      }

      if (statusCode == 0) return toast.error(response.data.message);
    } catch (error) {}
  };

  const remove = async (id) => {
    const filtered = references.filter((p) => p.id !== id);
    const response = await axios.delete(`/api/application/reference`, {
      data: id,
    });
    setReferences(filtered);
  };

  const next = async () => {
    let core = await genCode(100);

    const response = await axios.post(`/api/application/reference?next=true`);

    let isValid = response.data.data;

    if (isValid)
      return Router.push("/application/select-positions?core=" + core);

    return toast.error(
      "Please enter exactly 3 references before clicking next"
    );
  };

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
                            onChange={(e:any) => {
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
                            onChange={(e:any) => {
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
                            onChange={(e:any) => {
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
                              maxLength="10"
                              className="form-control"
                              value={phone}
                              onChange={(e:any) => {
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
                        {references.map((e:any) => (
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
            {menu == "1" ? (
              <Link href="/application/publication">
                <a type="button" className="btn btn-success">
                  Previous
                </a>
              </Link>
            ) : (
              <Link href="/application/employment">
                <a type="button" className="btn btn-success">
                  Previous
                </a>
              </Link>
            )}
            {/* <Link href="/application/select-positions"> */}
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
  );
};

const danger = { color: "red" };
