
"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Modal } from "react-responsive-modal";
import ReactHtmlParser from "react-html-parser";
// import { Modal } from 'next-modal'

import { Editor } from "@tinymce/tinymce-react";

const JobAdvert = ({ data }: any) => {
  const [toggleModal, setToggleModal] = useState(false)

  const [name, setName] = useState("");
  const [policy, setPolicy] = useState("");
  const [detail, setDetail] = useState("");
 const [publish, setPublish] = useState("");
  // const [modalContent, setModalContent] = useState("");
  // const [modalTitle, setModalTitle] = useState("");
  // const [open, setOpen] = useState(false);

  // const onCloseModal = () => setOpen(false);

  console.log(data);

  const save = async () => {
    try {
      const data = {
        name,
        policy,
        detail,
      };
      if (name == "" || policy == "" || detail == "")
        return toast.error("Data not saved. Fill the form");

      const response = await axios.post("/api/admin/job-advert", { data });
      console.log(response);

      // if (response.statusCode == 1) {
      //   return toast.success("Data saved successfully");
      // }
      // if (response.statusCode == 0) return toast.error("Data not saved");
    } catch (error) {
    }

  };

  const handlePublishing = async (id: any) => {
    try {
      const response = await axios.put("/api/admin/job-advert", { id });
      if (response.status == 200) {
        //Router.reload(window.location.pathname);
        return toast.success("Job published successfully");
      }
      if (response.status != 0) return toast.error("Job not published ");
    } catch (error) {

    }

  };

  const deleteJob = async (id: any) => {
    try {
      const response = await axios.delete(`/api/admin/job-advert`, {
        data: id,
      });
      if (response.status == 200) {
        // Router.reload(window.location.pathname);
        return toast.success("Job deleted successfully");
      }
      if (response.status != 0) return toast.error("Job not published ");
    } catch (error) {

    }

  };

  return (
    <div id="layout-wrapper">
      {/* <Modal toggle={toggleModal} setToggle={setToggleModal}>
        <Modal.Header className='sans font-900 text-30px fade-in-left animation-duration-500ms animation-forwards'>
          <h3>👋 Hi, I'm your modal</h3>
        </Modal.Header>
        <Modal.Body className='sans font-400 text-15px text-gray fade-in animation-duration-800ms animation-forwards'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Quis vel eros donec ac. Mauris
            pellentesque pulvinar pellentesque habitant morbi tristique senectus.
          </p>
          <p>
            Nunc non blandit massa enim nec dui nunc. Sed elementum tempus egestas sed sed risus. Senectus et netus et malesuada
            fames ac turpis egestas maecenas. Urna nec tincidunt praesent semper feugiat. Est ante in nibh mauris cursus mattis
            molestie. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant.
          </p>
        </Modal.Body>
        <Modal.Footer className='sans font-400 text-10px'>
          <h3>copyright</h3>
        </Modal.Footer>
      </Modal> */}
      {/* <Modal open={open} onClose={onCloseModal} center>
        {modalTitle}
        <hr />
        {modalContent}
      </Modal> */}
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

              <ToastContainer
                position="top-right"
                autoClose={15000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

              <div className="col-xl-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">ADD</h4>
                  </div>
                  <div className="card-body">
                    <form className="needs-validation" noValidate>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3 position-relative">
                            <label className="form-label" htmlFor="validationTooltip01">
                              Job title
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="validationTooltip01"
                              value={name}
                              onChange={(e: any) => {
                                setName(e.target.value);
                              }}
                              required
                            />
                            <div className="valid-tooltip">Looks good!</div>
                          </div>
                        </div>
                        <div className="col-md-6">
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3 position-relative">
                            <Editor
                              apiKey="231hohc8dmkwpp8k8vawvs3oatywgw9p3x2n9bnsu7e5mabx"
                              initialValue={detail}
                              init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                  "advlist autolink lists link image",
                                  "charmap print preview anchor help",
                                  "searchreplace visualblocks code",
                                  "insertdatetime media table paste wordcount",
                                ],
                                toolbar:
                                  "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
                              }}
                              onChange={(e: any) => {
                                setDetail(e.target.getContent());
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e: any) => {
                          e.preventDefault();
                          save();
                        }}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                {/* end card */}
              </div>
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">LIST</h4>

                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead className="table-light">
                          <tr>
                            <th hidden>#</th>
                            <th>Name</th>
                            <th>Policy</th>
                            <th>Is published</th>

                            <th>Publish</th>
                            <th>Preview</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.jobAds?.response?.map((ad: any) => {


                            return (
                              <tr key={ad.id}>
                                <td hidden>{ad.id}</td>
                                <td>{ad.name}</td>
                                <td>{ad.Policy.name}</td>
                                <td>{ad.published == 0 ? "No" : "Yes"}</td>

                                <td>
                                  <div className="form-check form-check-right">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="formCheckRight2"
                                      checked={ad.published == 1 ? true : false}
                                      onChange={(e: any) => {
                                        setPublish(e.target.checked);
                                        handlePublishing(ad.id);
                                      }}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="formCheckRight2"
                                      style={{ color: "green" }}
                                    >
                                      Publish
                                    </label>
                                  </div>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm waves-effect waves-light "
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setName(ad.name)
                                      setPolicy(ad.policyId)
                                      setDetail(ad.detail)
                                      // setOpen(true);
                                      // setModalTitle(ad.name);
                                      // setModalContent(ReactHtmlParser(ad.details));
                                    }}
                                  >
                                    <i className="dripicons-preview" />
                                  </button>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm waves-effect waves-light"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteJob(ad.id);
                                    }}
                                  >
                                    <i className="dripicons-trash" />
                                  </button>
                                </td>
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
    </div>
  );
};

export default JobAdvert;
