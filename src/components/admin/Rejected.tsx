"use client"
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { calculateAge } from "../../lib/calculate-age";
import _ from "lodash";

const Rejected = ({ broadsheet }:any) => {
  const [searchText, setSearchText] = useState();
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


  const autoHandleSearch = (searchText:any) => {
    router.push({
      pathname: "/admin/shortlist/rejected",
      query: `&searchText=${searchText}`,
    });
   
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
          <div className="row">
              <div className="col-md-4" style={{ textAlign: "end" }}>
                <div className="form-group">
                  <div className="mb-4 position-relative">
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

              <div className="col-md-3">
                <div className="form-group">
                  <div className="mb-3 position-relative">
                    <button
                      type="button"
                      onClick={(e:any) => {
                        e.preventDefault();
                        // handleSearch();
                      }}
                      className="btn btn-primary  add"
                    >
                      <i className="fas fa-search"></i>Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <table className="table table-striped table-bordered  nowrap">
              <thead>
                <tr>
                  {/* <th>JOB ID</th> */}
                  <th>Name</th>
                  <th>Position</th>
                  <th>Phone number</th>
                  <th>Email address</th>
                  <th>Address</th>
                  <th>Sex</th>
                  <th>DOB</th>
                  {/* <th>Marital status</th> */}
                  {/* <th>Qualification</th>
                <th>Experience</th>
                <th>Bonded to organization</th>
                <th>Bonded details</th>

                <th>References</th>
                <th>Contact objection</th> */}

                  {/* <th>Shortlist status</th> */}
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {broadsheet.data.map((bs:any) => {
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
                      <td>{calculateAge(bs.dob)} yrs</td>
                    
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rejected;
