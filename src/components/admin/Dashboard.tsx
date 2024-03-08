"use client"
import { ADMIN_LOGIN_URL } from "@/constants";
import { accessController } from "@/lib/access-controller";
import moment from "moment";
import { useSession } from "next-auth/react";
import { usePathname, redirect } from "next/navigation";

const Dashboard = ({ data }:any) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect(ADMIN_LOGIN_URL);
    }
})
console.log(data);


// console.log(session?.user?.accesiblePages);

//   const pathname = usePathname()

//   accessController(session?.user?.accesiblePages,pathname)


//   const getDashboard = async (id:any) => {
//     redirect(
//       `${pathname}? /admin/dashboard?searchId=${id}`,
//     );
//   }

  return (
    <div id="layout-wrapper">
    {/* <Header /> */}
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Dashboard</h4>
              </div>
            </div>
          </div>
          <div className="row">
      {/* end page title */}
      {/* <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Recruitments</h4>

              <div className="mb-3 position-relative">
                <label htmlFor="examType">
                  Select recruitment : <span className="danger">*</span>
                </label>
                <select
                  className="custom-select form-control"
                  required
                  onChange={async (e:any) => {
                    // localStorage.setItem("currentData", e.target.value);
                    // getDashboard(e.target.value)
                  }}
                >
                  {recruitment.map((rr) => {
                    return (
                      <option key={rr.id} value={rr.id}>
                        {rr.name}
                      </option>
                    );
                  })}{" "}
                </select>
              </div>

             
            </div>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-h-100">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Total applications
                  </span>
                  <h4 className="mb-3">
                    <span className="counter-value" data-target="865.2">
                      {data?.stats?.response?.totalApplications}
                    </span>
                  </h4>
                </div>
                <div className="col-6">
                  <div
                    id="mini-chart1"
                    data-colors='["#5156be"]'
                    className="apex-charts mb-2"
                  />
                </div>
              </div>
              <div className="text-nowrap">
                <span className="badge bg-soft-warning text-warning">
                  {data?.stats?.response?.totalApplicationsSubmitted}
                </span>
                <span className="ms-1 text-muted font-size-13">
                  Applications submitted
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card card-h-100">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                  Applicants shortlisted
                  </span>
                  <h4 className="mb-3">
                    <span className="counter-value" data-target="865.2">
                      {data?.stats?.response?.totalApplications}
                    </span>
                  </h4>
                </div>
                <div className="col-6">
                  <div
                    id="mini-chart1"
                    data-colors='["#5156be"]'
                    className="apex-charts mb-2"
                  />
                </div>
              </div>
              <div className="text-nowrap">
                <span className="badge bg-soft-warning text-warning">
                  {data?.stats?.response?.totalApplicationsSubmitted}
                </span>
                <span className="ms-1 text-muted font-size-13">
                  Applications submitted
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="col-xl-3 col-md-6">
          <div className="card card-h-100">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block ">
                    Applicants shortlisted
                  </span>
                  <h4 className="mb-3">
                    <span className="counter-value" data-target={6258}>
                      {data?.stats?.response?.totalApplicantsShortlisted}
                    </span>
                  </h4>
                </div>
                <div className="col-6">
                  <div
                    id="mini-chart2"
                    data-colors='["#5156be"]'
                    className="apex-charts mb-2"
                  />
                </div>
              </div>
              <div className="text-nowrap">
                <span className="badge bg-soft-primary text-primary">
                  {data?.stats?.response?.totalApplicantsShortlisted}
                </span>
                <span className="ms-1 text-muted font-size-13">
                  applicants out of  <span className="badge bg-soft-success text-primary">{data?.stats?.response?.totalApplications}</span>  applications shortlisted
                </span>
              </div>
            </div>
          </div>
        </div> */}
        {/* end col*/}
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-h-100">
            {/* card body */}
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Male Applicants
                  </span>
                  <h4 className="mb-3">
                    <span className="counter-value" data-target="4.32">
                      {data?.stats?.response?.totalMaleApplicants}
                    </span>
                  </h4>
                </div>
                <div className="col-6">
                  <div
                    id="mini-chart3"
                    data-colors='["#5156be"]'
                    className="apex-charts mb-2"
                  />
                </div>
              </div>
              <div className="text-nowrap">
                <span className="badge bg-soft-success text-success">
                  {(
                    (data?.stats?.response?.totalMaleApplicants / data?.stats?.response?.totalApplications) *
                    100
                  ).toFixed(2) ?? 0}
                  %
                </span>
                <span className="ms-1 text-muted font-size-13">
                  of total applicants
                </span>
              </div>
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
        </div>
        {/* end col */}
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-h-100">
            {/* card body */}
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-6">
                  <span className="text-muted mb-3 lh-1 d-block text-truncate">
                    Female Applicants
                  </span>
                  <h4 className="mb-3">
                    <span className="counter-value" data-target="12.57">
                      {data?.stats?.response?.totalFemaleApplicants}
                    </span>
                  </h4>
                </div>
                <div className="col-6">
                  <div
                    id="mini-chart4"
                    data-colors='["#5156be"]'
                    className="apex-charts mb-2"
                  />
                </div>
              </div>
              <div className="text-nowrap">
                <span className="badge bg-soft-success text-success">
                  {(
                    (data?.stats?.response?.totalFemaleApplicants / data?.stats?.response?.totalApplications) *
                    100
                  ).toFixed(2) || 0}
                  %
                </span>
                <span className="ms-1 text-muted font-size-13">
                  of total applicants
                </span>
              </div>
            </div>
            {/* end card body */}
          </div>
          {/* end card */}
        </div>
        {/* end col */}
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Position records</h4>
            <p className="card-title-desc">
              Click on view to view the broadsheet of a position.
            </p>
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
                  <th>Job title</th>
                  <th>Total applicants</th>
                  <th>Unworked applicants</th>
                  <th>Shortlisted applicants</th>
                  <th>Rejected applicants</th>
                
                </tr>
              </thead>
              <tbody>
                {data?.stats?.response?.applicationSummary?.map((job:any) => {
                  return (
                    <tr>
                     
                      <td>{job.name}</td>
                      <td><span className="badge bg-primary font-size-12">{job.applicationCount}</span></td>

                      <td><span className="badge bg-dark font-size-12">{job.unworkedApplicationCount}</span></td>
                      <td><span className="badge bg-success font-size-12">{job.shortlistedApplicationCount}</span></td>
                      <td><span className="badge bg-danger font-size-12">{job.rejectedApplicationCount}</span></td>




                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default Dashboard;
