"use client"

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { ADMIN_LOGIN_URL } from "@/constants";
import ReactPaginate from "react-paginate";
import { calculateAge } from "@/lib/calculate-age";
import _ from "lodash";

const Rejected = ({ data }: any) => {

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
                  <h4 className="mb-0">REJECTED </h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    {/* <h4 className="card-title">Position records</h4> */}
                    <p className="card-title-desc">
                      Click on view to view the broadsheet of a position.
                    </p>
                    <div className="table-rep-plugin">
                      <div
                        className="table-responsive mb-0"
                        data-pattern="priority-columns"
                      >
                        <div className="row">
                          <div className="col-md-4" style={{ textAlign: "end" }}>
                            <div className="form-group">
                              <div className="mb-6 position-relative">
                                <input
                                  type="text"
                                  className="form-control required"
                                  placeholder="Search by name of applicant"
                                // value={searchText}
                                // onChange={(e:any) => {
                                //   setSearchText(e.target.value);
                                //   autoHandleSearch(e.target.value)
                                // }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* <div className="col-md-3">
                      <div className="form-group">
                        <div className="mb-3 position-relative">
                          <button
                            type="button"
                            onClick={(e:any) => {
                              e.preventDefault();
                              handleSearch();
                            }}
                            className="btn btn-primary  add"
                          >
                            <i className="fas fa-search"></i>Search
                          </button>
                        </div>
                      </div>
                    </div> */}
                        </div>
                        <table

                          className="table table-striped table-bordered dt-responsive nowrap"
                          style={{
                            borderCollapse: "collapse",
                            borderSpacing: 0,
                            width: "100%",
                          }}
                        >
                          <thead>
                            <tr>
                              {/* <th>R/N</th> */}
                              <th style={{ width: 10 }}>Name</th>
                              <th>Position</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>Present Address</th>
                              <th>Permanent Address</th>

                              <th>Sex</th>
                              <th>Age</th>
                              <th>Marital status</th>
                              {/* <th>Qualification</th>
                              <th>Employment</th>


                              <th>References</th> */}


                              <th>Shortlist status</th>
                              <th>View</th>
                            </tr>
                          </thead>

                          <tbody>
                            {data?.application?.response?.map((bs: any) => {
                              return (
                                <tr key={bs.id}>
                                  {/* <td>{bs.jobId}</td> */}
                                  <td>
                                    {_.startCase(_.lowerCase(bs?.User?.firstName))}{" "}
                                    {_.startCase(_.lowerCase(bs?.User?.otherNames))}{" "}
                                    {_.startCase(_.lowerCase(bs?.User?.surname))}
                                  </td>
                                  <td>{bs?.Job?.name}</td>
                                  <td>
                                    {bs?.User?.phoneNumber} <br />
                                    {bs?.User?.residenceTel}
                                  </td>
                                  <td> {bs?.User?.email}</td>
                                  <td>{bs?.User?.Personal?.presentAddress}</td>
                                  <td>{bs?.User?.Personal?.permanentAddress}</td>

                                  <td>{bs?.User?.Personal?.Sex?.name}</td>
                                  <td>
                                    {/* {bs.dob} */}
                                    {calculateAge(bs?.User?.Personal?.dob)} yrs
                                  </td>
                                  <td>{bs?.User?.Personal?.MaritalStatus?.name}</td>

                                  {/* <td>
                                    {bs.User.Certificate.map((cert: any) => {
                                      return (
                                        <table>
                                          <tr>{cert.from}</tr>
                                          <tr>{cert.to}</tr>
                                          <tr>{cert.certificateObtained}</tr>
                                        </table>
                                      );
                                    })}
                                  </td>

                                  <td>
                                    {bs.User.Employment.map((emp: any) => {
                                      return (
                                        <table>
                                          <tr>{emp.organizationName} </tr>
                                          <tr>{emp.position} </tr>
                                          <tr>{emp.salary} </tr>
                                          <tr>
                                            {emp.start} to {emp.end}
                                          </tr>
                                        </table>
                                      );
                                    })}
                                  </td>
                                  <td>
                                    {bs.User.Reference.map((ref: any) => {
                                      return (
                                        <table>
                                          <tr>{ref.name}</tr>
                                          <tr>{ref.occupation}</tr>
                                          <tr>{ref.address}</tr>
                                          <tr>{ref.phone}</tr>
                                        </table>
                                      );
                                    })}
                                  </td> */}
                                  {/*  <td> {calculateExperience(bs.User.Employment)}</td> */}

                                  {/* <td>{bs.User.Bonded.YesNo.value}</td> */}
                                  {/* <td>{bs.User.Bonded.details}</td> */}
                                  {/* 
                          
                            <td>{bs.User.Confirmation.YesNo.value}</td> */}
                                  <td>
                                    {}
                                    {bs.shortlisted == 1 ?  <span className="badge bg-success">Shortlisted</span>  ? bs.shortlisted == -1 :<span className="badge bg-dark">Not worked on</span>  :<span className="badge bg-danger">Rejected</span> }
                                    
                                  </td>
                                  <td>
                                    <Link
                                      href={`/admin/shortlist/single-application?id=${bs.id}`} className="btn btn-success btn-sm waves-effect waves-light "
                                    >

                                      <i className="dripicons-preview" /> View
                                    </Link>
                                  </td>

                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {/* <ReactPaginate
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    initialPage={broadsheet.curPage - 1}
                    pageCount={broadsheet.maxPage}
                    onPageChange={handlePagination}
                    containerClassName={"paginate-wrap"}
                    subContainerClassName={"paginate-inner"}
                    pageClassName={"paginate-li"}
                    pageLinkClassName={"paginate-a"}
                    activeClassName={"paginate-active"}
                    nextLinkClassName={"paginate-next-a"}
                    previousLinkClassName={"paginate-prev-a"}
                    breakLinkClassName={"paginate-break-a"}
                  /> */}

                        {/* <TablePagination position={position} page={page} /> */}
                      </div>
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

export default Rejected;
