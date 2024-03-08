"use client"
import { ADMIN_LOGIN_URL } from "@/constants";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router'

const PositionSummary = ({ jobSummary }:any) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect(ADMIN_LOGIN_URL);
    }
})
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Position records{id}</h4>
            <p className="card-title-desc">
              Click on view to view the broadsheet of a position.
            </p>
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
                  <th>#</th>
                  <th>Job title</th>
                  <th>Number of applicants</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {jobSummary?.map((job:any) => {
                  return (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.name}</td>
                      <td>{job._count.Application}</td>
                      <td>
                        <Link href={`/admin/broadsheet/${job.id}`}
                          className="btn btn-success btn-sm waves-effect waves-light "
                         
                        >
                          <i className="dripicons-preview" />
                        </Link>
                      </td>
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
  );
};

export default PositionSummary;
