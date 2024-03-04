import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";

export const Essay = ({ data }: any) => {
  const [essay, setEssay] = useState("");

  //let savedLetter = savedEssay.essay;

  // useEffect(() => {
  //   setEssay(savedEssay);
  // }, []);
  const save = async () => {
    try {
      const data = {
        essay,
      };
      if (essay == "")
        return toast.error("Data not saved. Enter your motivation letter");

      const response = await axios.post("/api/applicant/essay", { data });
      if (response.status == 1) {
        //  setEssay(savedEssay);

        return toast.success(response.data.message);
      }
      if (response.status == 0) return toast.error("Data not saved");
    } catch (error) {

    }

  };

  return (
    <div id="layout-wrapper">
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <h4 className="mb-0">EMPLOYMENT </h4>
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
                    <h4 className="card-title">Why do you want to join the council?</h4>
                  </div>
                  <div className="card-body">
                    <p className="card-title-desc">
                      In about 200 words, show why you want to join the Council
                      <span style={{ color: "red" }}></span>
                    </p>
                    <form className="needs-validation" noValidate>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3 position-relative">
                            <Editor
                              apiKey="231hohc8dmkwpp8k8vawvs3oatywgw9p3x2n9bnsu7e5mabx"
                              initialValue={data.essay}
                              // initialValue="<h1>This is the initial content of the editor.</h1>"
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
                                setEssay(e.target.getContent());
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-actions mt-10" style={{ textAlign: "end" }}>
                        <button
                          className="btn btn-success add"
                          type="button"
                          onClick={(e: any) => {
                            e.preventDefault();
                            save();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="form-actions mt-10">
                  <div className="col-md-12" style={{ textAlign: "end" }}>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <Link href="/applicant/employment">
                        <a type="button" className="btn btn-success">
                          Previous
                        </a>
                      </Link>
                      <Link href="/applicant/publication">
                        <a type="button" className="btn btn-success">
                          Next
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <br />
                <br />
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
