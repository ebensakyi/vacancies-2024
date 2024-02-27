import Link from "next/link";
import { useState, useLocation } from "react";

import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { calculateAge } from "../../../util/calculate-age";
import _ from "lodash";

export const SinglePositionBroadsheet = ({ broadsheet }) => {
  const [searchText, setSearchText] = useState();
  const router = useRouter();



  const autoHandleSearch = (searchText) => {
    try {
      router.push({
        pathname: '/admin/broadsheet/[id]',
        query: { ...router.query, searchText },
      })

    } catch (error) {
      console.log(error);
    }

  };


  const handlePagination = (page) => {
    const path = router.pathname;
    const query = router.query;
    query.page = page.selected + 1;
    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <>
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
                            value={searchText}
                            onChange={(e:any) => {
                              setSearchText(e.target.value);
                              autoHandleSearch(e.target.value)
                            }}
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
                        <th>Name</th>
                        <th>Position</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Sex</th>
                        <th>Age</th>
                        {/* <th>Marital status</th> */}
                        {/* <th>Qualification</th> */}
                        {/* <th>Experience</th>
                        <th>Experience years</th> */}

                        {/* <th>Bonded to organization</th> */}
                        {/* <th>Bonded details</th>

                        <th>References</th>
                        <th>Contact objection</th> */}

                        <th>Shortlist status</th>
                        <th>View</th>
                      </tr>
                    </thead>

                    <tbody>
                      {broadsheet.data.map((bs) => {
                        return (
                          <tr key={bs.id}>
                            {/* <td>{bs.jobId}</td> */}
                            <td>
                              {_.startCase(_.lowerCase(bs.firstName))}{" "}
                              {_.startCase(_.lowerCase(bs.otherNames))}{" "}
                              {_.startCase(_.lowerCase(bs.surname))}
                            </td>
                            <td>{bs.job}</td>
                            <td>
                              {bs.phoneNumber} <br />
                              {bs.residenceTel}
                            </td>
                            <td> {bs.email}</td>
                            <td>{bs.address}</td>
                            <td>{bs.sex}</td>
                            <td>
                              {/* {bs.dob} */}
                              {calculateAge(bs.dob)} yrs
                            </td>

                            {/* <td>
                              {bs.User.Certificate.map((cert) => {
                                return (
                                  <table>
                                    <tr>{cert.from}</tr>
                                    <tr>{cert.to}</tr>
                                    <tr>{cert.certificateObtained}</tr>
                                  </table>
                                );
                              })}
                            </td> */}

                            {/* <td>
                              {bs.User.Employment.map((emp) => {
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
                            <td> {calculateExperience(bs.User.Employment)}</td> */}

                            {/* <td>{bs.User.Bonded.YesNo.value}</td> */}
                            {/* <td>{bs.User.Bonded.details}</td> */}
                            {/* 
                            <td>
                              {bs.User.Reference.map((ref) => {
                                return (
                                  <table>
                                    <tr>{ref.name}</tr>
                                    <tr>{ref.occupation}</tr>
                                    <tr>{ref.address}</tr>
                                    <tr>{ref.phone}</tr>
                                  </table>
                                );
                              })}
                            </td>
                            <td>{bs.User.Confirmation.YesNo.value}</td> */}
                            <td>
                              {bs.shortlisted == 1 ? "Shortlisted" : "Rejected"}
                            </td>
                            <td>
                              <Link
                                href={`/admin/broadsheet/single-application?id=${bs.id}`}
                              >
                                <a className="btn btn-success btn-sm waves-effect waves-light ">
                                  <i className="dripicons-preview" /> View
                                </a>
                              </Link>
                            </td>
                           
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <ReactPaginate
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
                  />

                  {/* <TablePagination position={position} page={page} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
