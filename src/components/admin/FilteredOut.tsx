"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { calculateAge } from "../../lib/calculate-age";
import _ from "lodash";


export const FilteredOut = ({ broadsheet }:any) => {
  const router = useRouter();


  const handlePagination = (page:any) => {
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
              <h4 className="card-title">Filtered out</h4>
             
              <div className="table-rep-plugin">
                <div
                  className="table-responsive mb-0"
                  data-pattern="priority-columns"
                >
                  <table id="tech-companies-1" className="table">
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
                        <th>Marital status</th>
                        {/* <th>Qualification</th> */}
                        {/* <th>Experience</th> */}
                        {/* <th>Experience years</th> */}

                        {/* <th>Bonded to organization</th> */}
                        {/* <th>Bonded details</th>

                        <th>References</th>
                        <th>Contact objection</th> */}

                        {/* <th>Shortlist status</th> */}
                        <th>Filter reason</th>
                        <th>View</th>
                      </tr>
                    </thead>

                    <tbody>
                      {broadsheet.data.map((bs:any) => {
                        return (
                          <tr key={bs.id}>
                            {/* <td>{bs.id}</td> */}
                            <td>
                              {_.startCase(_.lowerCase(bs.User.firstName))} {_.startCase(_.lowerCase(bs.User.otherNames))} {_.startCase(_.lowerCase(bs.User.surname))}
                             
                            </td>
                            <td>{bs.Job.name}</td>
                            <td>
                              {bs.User.phoneNumber} <br />
                              {bs.User.Personal.residenceTel}
                            </td>
                            <td>{bs.User.email}</td>
                            <td>{bs.User.Personal.address}</td>
                            <td>{bs.User.Personal.Sex.name}</td>
                            <td>
                              {/* {bs.User.Personal.dob}<br /> */}
                              {calculateAge(bs.User.Personal.dob)} yrs
                            </td>
                            <td>{bs.User.Personal.MaritalStatus.name}</td>
                            <td>{bs.FilteredOutReason.map((fout: { filterReason: any; })=>fout.filterReason)}</td>

                            
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
                            </td> */}
                            {/* <td>
                              {" "}
                              {calculateExperience(
                                bs.User.Employment,
                              )}
                            </td> */}

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
