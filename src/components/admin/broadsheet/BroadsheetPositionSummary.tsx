"use client"

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ADMIN_LOGIN_URL } from "@/constants";

const BroadsheetPositionSummary = ({ data }: any) => {
  console.log(data);
  
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(ADMIN_LOGIN_URL);
    }
  })
  const pathname = usePathname()

  useEffect(() => {
    let searchId = localStorage.getItem("currentData");
    if (searchId)
      redirect(
        `${pathname}? /admin/broadsheet?searchId=${searchId}`,
      );

  }, []);
  const generate = async (url: any) => {
    try {
      let _url = url

      // window.open(url, "_blank");

      const firstPath = url.split("/")[1];

      if (firstPath == "admin") {
        window.open(url, "_blank");
      } else {


        const response = await axios.post(_url);


        let status = response.status;
        let responseUrl = response.data.url;

        if (status == 200) {
          toast.success(`Broadsheet generated successfully`);
        }
        window.open(responseUrl, "_blank");
      }
    } catch (error) { }
  };
  // const generatePdf = async (id: any) => {
  //   try {
  //     // setIsGenerating(true);
  //     // setCurrentId(id);

  //     const response = await axios.post("/api/admin/generate-broadsheet", {
  //       type,
  //     });

  //     let path = `/broadsheet/${response.data.data}`;
  //     let status = response.status;
  //     let url = response.data.data.url;

  //     if (status == 1) {
  //       toast.success(`Broadsheet generated successfully`);
  //     }
  //     window.open(url, "_blank");
  //     setPath(path);
  //     // setIsGenerating(false);
  //   } catch (error) {
  //     console.log(error);
  //     if (error) {
  //       toast.error(`Broadsheet could not be generated`);
  //     }
  //   }
  // };

  // const handleAction = async () => { };

  return (
    <div id="layout-wrapper">
      {/* <Header /> */}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">POSITIONS SUMMARY</h4>
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
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {/* <h4 className="card-title">Position records</h4>
            <p className="card-title-desc">
              Click on view to view the broadsheet of a position.
            </p> */}
                    <table
                      className="table table-striped table-bordered nowrap"
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          {/* <th>#</th> */}
                          <th>Job title</th>
                          <th>Total applicants</th>
                         
                          <th>Shortlisted applicants</th>
                          <th>Rejected applicants</th> 
                          <th>Unworked applicants</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.positionSummaries?.response?.map((job: any) => {
                          return (
                            <tr>
                              {/* <td>{job.id}</td> */}
                              <td>{job.jobName}</td>
                              <td>
                                <span className="badge bg-primary font-size-12">
                                  {job.totalApplications}
                                </span>
                              </td>

                              <td>
                                <span className="badge bg-success font-size-12">
                                  {job.shortlistedApplications}
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-danger font-size-12">
                                  {job.rejectedApplications
}
                                </span>
                              </td>
                              <td>
                                <span className="badge bg-dark font-size-12">
                                  {job.unworkedApplications
}
                                </span>
                              </td>

                              <td>
                                <Link   type="button"
                                className="btn btn-primary add" href={"/admin/broadsheet/?id="+job.id}>View</Link>
                                {/* <select
                                  className="custom-select form-control"
                                  onChange={async (e: any) => await generate(e.target.value)}
                                >
                                  <optgroup label="View">
                                    <option

                                    >
                                      Select action
                                    </option>
                                    <option
                                      value={`/admin/broadsheet/${job.id}?shortlisted=1&getType=1`}
                                    >
                                      All
                                    </option>
                                    <option
                                      value={`/admin/broadsheet/${job.id}?shortlisted=1&getType=-1`}
                                    >
                                      Unworked
                                    </option>
                                    <option
                                      value={`/admin/broadsheet/${job.id}?shortlisted=1&getType=1`}
                                    >
                                      Shortlisted
                                    </option>
                                    <option
                                      value={`/admin/broadsheet/${job.id}?shortlisted=1&getType=0`}
                                    >
                                      Rejected
                                    </option>
                                  </optgroup>
                                  <optgroup label="Download PDF">
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=pdf&getType=`}
                                    >
                                      All
                                    </option>
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=pdf&getType=-1`}
                                    >
                                      Unworked
                                    </option>
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=pdf&getType=1`}
                                    >
                                      Shortlisted
                                    </option>
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=pdf&getType=0`}
                                    >
                                      Rejected
                                    </option>
                                  </optgroup>
                                  <optgroup label="Download XLS">
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=xls&getType=`}
                                    >
                                      All
                                    </option>
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=xls&getType=-1`}
                                    >
                                      Unworked
                                    </option>
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=xls&getType=1`}
                                    >
                                      Shortlisted
                                    </option>
                                    <option
                                      value={`/api/admin/generate-broadsheet?jobId=${job.id}&fileType=xls&getType=0`}
                                    >
                                      Rejected
                                    </option>
                                  </optgroup>
                                </select> */}

                                <br />
                                <br />
                              </td>
                              <td>
                                <div className="d-flex flex-wrap gap-2">
                                  {/* <button type="button" className="btn btn-warning waves-effect waves-light  btn-sm ">
                                                <i className="uil uil-exclamation-triangle me-2"></i> Warning
                                            </button> */}
                                </div>

                                {/* <button
                          className="btn btn-success btn-sm "
                          onClick={(e:any) => {
                            e.preventDefault();
                            generatePdf(job.id);
                          }}
                        >
                          {job.id == currentId
                            ? "Generating broadsheet"
                            : "Generate"}
                        </button> */}
                              </td>

                              {/* <td>
                        {job.id == currentId && path != null ? (
                          <a
                            href={path}
                            className="btn btn-success btn-sm "
                            download
                            target="_blank"
                          >
                            <i className="dripicons-download" />
                          </a>
                        ) : null}

                       
                        <td>
                         
                        </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>{" "}
              {/* end col */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadsheetPositionSummary;
