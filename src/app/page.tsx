import { SERVER_BASE_URL } from "@/constants";
import moment from "moment";
import Link from "next/link";
import Footer from "../components/Footer";
  async function getJobAds() {
    try {
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job-advert`, { cache: 'force-cache' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
 
    } catch (error) {
        console.log(error);
        
    }
   
}
export default async function Page(){

const ads = await getJobAds();

  // return <Dashboard/>

  return   <>
  {/* <Modal open={open} onClose={onCloseModal} center>
    {modalTitle}
    <hr />
    {modalContent}
  </Modal> */}

  <div id="layout-wrapper">
    <div className="main-content">
      <div className="text-center" style={{marginTop:"80px"}}> 
      <h4 className="text-center">
        <img src="/logo.png" style={{ width: "90px", height: "100px" }} />
        <br />
        WAEC RECRUITMENT SYSTEM
      </h4>
      </div> 
      {/* <div className="page-content"> */}
        <div className="container-fluid">
          <p className="card-title-desc text-pimary">
            To apply for a position, simply{" "}
            <Link href="/auth/register"className="btn btn-success btn-sm">
                create an account
            </Link>
            ,
            <Link href="/auth/login" className="btn btn-primary btn-sm add" >
                login
            </Link>{" "}
            and apply. Once you're shortlisted after application, you would
            be contacted via your phone number and/or email. So ensure your
            details are correct.
          </p>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Positions available</h4>
                  <p className="card-title-desc">
                    The following positions are available.
                  </p>
                  <table
                    id="datatable"
                    className="table table-bordered dt-responsive nowrap"
                    style={{
                      borderCollapse: "collapse",
                      borderSpacing: 0,
                      width: "100%",
                    }}
                  >
                    <thead>
                      <tr>
                        <th>Position</th>

                        <th>Deadline</th>
                        <th>View Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ads?.response?.map((data:any) => {
                        return (
                          <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>
                              {moment(data.ShortlistPolicy.deadline).format(
                                "YYYY/MM/DD"
                              )}
                            </td>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-success btn-sm waves-effect waves-light "
                                onClick={() => {
                                  // setModalTitle(data.name);
                                  // setModalContent(
                                  //   ReactHtmlParser(data.details)
                                  // );
                                  // setOpen(true);
                                }}
                              >
                                <i className="dripicons-preview" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      {/* </div> */}
      <Footer />
    </div>
  </div>
</>
}