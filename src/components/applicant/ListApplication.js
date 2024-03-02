import moment from "moment";
import Link from "next/link";

const ListApplication = ({ applicationsList }) => {
  return (
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
                  {applicationsList.map((co) => (
                    <tr key={co.id}>
                      <td>{co.Job.name}</td>
                      <td>
                        {moment(co.Job.Policy.deadline).format(
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
                        <Link href="/applicant/full-application">
                          <a
                            target="_blank"
                            type="button"
                            className="btn btn-warning"
                          >
                            View
                          </a>
                        </Link>
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
  );
};

export default ListApplication;
