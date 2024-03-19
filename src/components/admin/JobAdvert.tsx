
"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ADMIN_LOGIN_URL } from "@/constants";
import { HtmlEditor, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
const JobAdvert = ({ data }: any) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(ADMIN_LOGIN_URL);
    }
  })
  const router = useRouter()
  const [toggleModal, setToggleModal] = useState(false)
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [policy, setPolicy] = useState("");
  const [detail, setDetail] = useState("");
  const [formattedDetail, setFormattedDetail] = useState("");

  const [publish, setPublish] = useState("");
  // const [modalContent, setModalContent] = useState("");
  // const [modalTitle, setModalTitle] = useState("");
  // const [open, setOpen] = useState(false);

  // const onCloseModal = () => setOpen(false);


  const save = async () => {
    try {
      const data = {
        name,
        policy,
        detail,
      };
      if (name == "" || policy == "" || detail == "")
        return toast.error("Data not saved. Fill the form");

      let response = await axios.post("/api/admin/job-advert", { data });


      if (response.status == 200) {
        setName("")
        setPolicy("")
        setDetail("")
        router.refresh()


        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) {
    }

  };

  const update = async () => {
    try {
      const data = {
        update: 1,
        id,
        name,
        policy,
        detail,
      };
      if (name == "" || policy == "" || detail == "")
        return toast.error("Data not saved. Fill the form");


      let response = await axios.put("/api/admin/job-advert", { data });



      if (response.status == 200) {
        setName("")
        setPolicy("")
        setDetail("")
        router.refresh()

        return toast.success("Data updated successfully");
      }
      setName("")
      setPolicy("")
      setDetail("")
      router.refresh()
      return toast.error("Data not updated");
    } catch (error) {
    }

  };

  const handlePublishing = async (id: any) => {
    try {

      const data = {
        publish: 1,
        id,

      };
      const response = await axios.put("/api/admin/job-advert", { data });
      if (response.status == 200) {
        router.refresh()
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


      router.refresh()
      if (response.status == 200) {


        return toast.success("Job deleted successfully");
      }
      if (response.status != 200) return toast.error("Job not deleted ");
    } catch (error) {
      return toast.error("Job not deleted ");
    }

  };

  const toolbarSettings = {
    items: ['Bold', 'Italic', 'Underline', 'StrikeThrough',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
        'Outdent', 'Indent', '|',
        'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo']
};
const quickToolbarSettings = {
    image: ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'],
    link: ['Open', 'Edit', 'UnLink']
}


  // let formattedDetails = ReactHtmlParser(detail)
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

              <ToastContainer
                position="top-right"
                autoClose={5000}
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
                            <RichTextEditorComponent height={450} toolbarSettings={toolbarSettings} quickToolbarSettings={quickToolbarSettings}>
                              <p>The Rich Text Editor component is WYSIWYG ("what you see is what you get") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands.</p>
                              <p><b>Key features:</b></p>
                              <ul>
                                <li>
                                  <p>Provides &lt;IFRAME&gt; and &lt;DIV&gt; modes</p>
                                </li>
                                <li>
                                  <p>Capable of handling markdown editing.</p>
                                </li>
                                <li>
                                  <p>Contains a modular library to load the necessary functionality on demand.</p>
                                </li>
                                <li>
                                  <p>Provides a fully customizable toolbar.</p>
                                </li>
                                <li>
                                  <p>Provides HTML view to edit the source directly for developers.</p>
                                </li>
                                <li>
                                  <p>Supports third-party library integration.</p>
                                </li>
                                <li>
                                  <p>Allows preview of modified content before saving it.</p>
                                </li>
                                <li>
                                  <p>Handles images, hyperlinks, video, hyperlinks, uploads, etc.</p>
                                </li>
                                <li>
                                  <p>Contains undo/redo manager.</p>
                                </li>
                                <li>
                                  <p>Creates bulleted and numbered lists.</p>
                                </li>
                              </ul>
                              <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
                            </RichTextEditorComponent>

                          </div>
                        </div>
                      </div>
                      {id != "" ? <button
                        className="btn btn-warning"
                        type="submit"
                        onClick={(e: any) => {
                          e.preventDefault();
                          update();
                        }}
                      >
                        Update
                      </button> : <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e: any) => {
                          e.preventDefault();
                          save();
                        }}
                      >
                        Submit
                      </button>}

                      {" "}
                      <button
                        className="btn btn-danger"
                        type="submit"
                        onClick={(e: any) => {
                          e.preventDefault();

                          setId("")
                          setName("")
                          setDetail("")
                        }}
                      >
                        Cancel
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
                            <th>Edit</th>
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
                                <td> <button
                                  type="button"
                                  className="btn btn-primary btn-sm waves-effect waves-light "
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setId(ad.id)
                                    setName(ad.name)
                                    setPolicy(ad.policyId)
                                    setDetail(ad.details)


                                    // setOpen(true);
                                    // setModalTitle(ad.name);
                                    // let fd = ReactHtmlParser(ad.details)
                                    // console.log(fd);

                                    //setFormattedDetail(fd);
                                  }}
                                >
                                  <i className="dripicons-pencil" />
                                </button></td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-sm waves-effect waves-light "
                                    onClick={(e) => {
                                      e.preventDefault()

                                      window.open(`/admin/job-advert/preview?id=${ad.id}`, '_blank', 'noopener,noreferrer');
                                      // setName(ad.name)
                                      // setPolicy(ad.policyId)
                                      // setDetail(ad.detail)
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
