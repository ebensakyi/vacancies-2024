'use client'
import { LOGIN_URL } from "@/constants";
import moment from "moment";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation'

const Applications = ({ data }: any) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(LOGIN_URL);
    }
  })

  const router = useRouter()

  const searchParams = useSearchParams()
 
  const isSubmitted = searchParams.get('isSubmitted')
useEffect(() => {
  if(isSubmitted) {
    router.refresh()
  }

 
}, [])

  return (
    <div id="layout-wrapper">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">APPLIED JOBS </h4>
                </div>
              </div>
            </div>
            <div className="row">

              {data?.applications?.response.length != 0 ?
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Applications</h4>
                  </div>
                  <div className="card-body">

                    <div className="row">
                      <div className="col-lg-12">
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead className="table-light">
                              <tr>
                                <th hidden>Id</th>
                                <th>Position</th>
                                <th>Expires on</th>
                                <th>Status</th>

                                <th>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.applications?.response?.map((co: any) => (
                                <tr key={co.id}>
                                  <td>{co.Job.name}</td>
                                  <td>
                                    {moment(co.Job.Policy.Recruitment.deadline).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                  <td>
                                    {co.submitted == 0 ? (
                                      <span
                                        className="badge bg-danger"
                                        style={{ padding: 10 }}
                                      >
                                        Not submitted{" "}
                                      </span>
                                    ) : (
                                      <span
                                        className="badge bg-success"
                                        style={{ padding: 10 }}
                                      >
                                        Submitted{" "}
                                      </span>
                                    )}
                                  </td>

                                  <td>
                                    {co.submitted == 0 ?
                                      <Link href="/applicant/select-position"
                                        type="button"
                                        className="btn btn-warning">

                                        Edit
                                      </Link> :
                                      <Link href="/applicant/full-application" target="_blank"
                                        type="button"
                                        className="btn btn-success">

                                        View
                                      </Link>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> :
               <div className="row align-items-center justify-content-center">
               <div className="col-md-8 col-lg-6 col-xl-7">
                   <div className="card">
                       <div className="card-body p-4">
                           <div className="text-center mt-2">
                               <h5 className="text-primary">New Application</h5>
                               <p className="text-muted">Click on the button below to start your application.</p>
                           </div>
                           <div className="p-2 mt-4 text-center">
                               <Link href="/applicant/select-position"
                                   type="button"
                                   className="btn btn-warning">
                                   Start new application
                               </Link>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           


              }



            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
