"use client"
import { useState } from "react";
import axios from "axios";
import Head from "next/head";

const PageAccess = ({ results }:any) => {
  const [accessName, setAccessName] = useState("");
  const [pages, setPages] = useState([]);
  const saveAccess = async () => {
    try {
      const data = {
        accessName,
        pages,
      };

      const response = await axios.post("/api/admin/page-access", { data });
    } catch (error) {

    }

  };
  return (
    <>

      <div className="col-xl-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">ADD</h4>
          </div>
          <div className="card-body">
            <form method="POST">
              <div className="row">
                <div className="col-md-3">
                  <div className="form-group">
                    <div className="mb-3 position-relative">
                      <label htmlFor="jobName">
                        Access Name: <span className="danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e:any) => {
                          setAccessName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <div className="mb-3 position-relative">
                      <label htmlFor="policy">
                        Select one or more pages :{" "}
                        <span className="danger">*</span>
                      </label>

                      <select
                        className="form-control"
                        name="choices-multiple-remove-button"
                        id="choices-multiple-remove-button"
                        placeholder="This is a placeholder"
                        multiple

                        onChange={(e:any) => {
                         // setPages([...pages, e.target.value]);
                        }}
                      >
                        <option value="">Select policy</option>

                        {results.map((page:any) => (
                          <option key={page.id} value={page.id}>
                            {page.pageName}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="save">
                      Add <span className="danger"></span>
                    </label>
                    <br />

                    <button
                      type="button"
                      className="btn btn-success add"
                      onClick={(e:any) => {
                        e.preventDefault();
                        saveAccess();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <script async src="../assets/libs/jquery/jquery.min.js"></script>
        <script async src="../assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script async src="../assets/libs/metismenu/metisMenu.min.js"></script>
        <script async src="../assets/libs/simplebar/simplebar.min.js"></script>
        <script async src="../assets/libs/node-waves/waves.min.js"></script>
        <script async src="../assets/libs/waypoints/lib/jquery.waypoints.min.js"></script>
        <script async src="../assets/libs/jquery.counterup/jquery.counterup.min.js"></script>

        <script async src="../assets/libs/select2/js/select2.min.js"></script>
        <script async src="../assets/libs/spectrum-colorpicker2/spectrum.min.js"></script>
        <script async src="../assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script async src="../assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
        <script async src="../assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script async src="../assets/libs/%40chenfengyuan/datepicker/datepicker.min.js"></script>

        <script async src="../assets/js/pages/form-advanced.init.js"></script>

        <script async src="../assets/js/app.js"></script> */}
    </>
  );
};

export default PageAccess;
