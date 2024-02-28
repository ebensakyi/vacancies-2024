
"use client"
import ReactHtmlParser from "react-html-parser";


const JobAdvertPreview = ({ data }: any) => {


 let details =   ReactHtmlParser(data.job.response.details)
  return (
    <div id="layout-wrapper">
     
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">ADVERT</h4>
                </div>
              </div>
            </div>
            <div className="row">

              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">{data.job.response.name}</h4>
                  </div>
                  <div className="card-body">
                    <form className="needs-validation" noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3 position-relative">
                            {/* <label className="form-label" htmlFor="validationTooltip01">
                              Job title
                            </label> */}
                            {/* <input
                              type="text"
                              className="form-control"
                              id="validationTooltip01"
                              value={name}
                              onChange={(e: any) => {
                                setName(e.target.value);
                              }}
                              required
                            /> */}
                             
                              {details}
                          </div>
                        </div>
                        {/* <div className="col-md-6">
                          <div className="mb-3 position-relative">
                            <label className="form-label" htmlFor="validationTooltip02">
                              Shortlist policy
                            </label>
                            <select
                              className="form-select"
                              id="policy"
                              value={policy}
                              onChange={(e: any) => {
                                setPolicy(e.target.value);
                              }}
                            >
                              <option value="">Select policy</option>
                              {data?.policies?.response?.map((data: any) => (
                                <option key={data.id} value={data.id}>
                                  {data.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>*/}
                      </div> 
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3 position-relative">
                         
                          </div>
                        </div>
                      </div>
                   
                    </form>
                  </div>
                </div>
                {/* end card */}
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAdvertPreview;
