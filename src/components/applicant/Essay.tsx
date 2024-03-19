'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";
import ApplicationMenu from "../ApplicationMenu";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { LOGIN_URL } from "@/constants";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
export const Essay = ({ data }: any) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect(LOGIN_URL);
    }
  })
  const [essayId, setEssayId] = useState("");
  const [essay, setEssay] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleEditorChange1 = (content: string, editor: any) => {
    // Split the content into words using whitespace as delimiter
    const words = content.trim().split(/\s+/);
    // Filter out empty strings (e.g., consecutive whitespaces)
    const filteredWords = words.filter((word: string) => word !== '');
    // Update the word count
    setWordCount(filteredWords.length);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: any) => {
    setEssay(newContent);
  };

  useEffect(() => {

   // setEssay(data?.essay?.response?.essay)
    // if (data?.essay?.response?.id) {
    //   setInterval(update, 60000);
    // } else {
    //   setInterval(save, 60000);

    // }

    if (data?.essay?.response != null) {      
      setEssayId(data?.essay?.response?.id);

    }
  }, []);

  
  const save = async () => {
    try {
      const data = {
        essay,
      };
      if (essay == "")
        return toast.error("Enter your motivation letter");

      const response = await axios.post("/api/applicant/essay", { data });

      if (response.status == 200) {
        let id = response.data.response.id
        setEssayId(id)


        return toast.success("Data saved successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
    } catch (error) {

    }

  };

  const update = async () => {
    try {
      const data = {
        essayId,
        essay,
      };
      if (essay == "")
        return toast.error("Enter your motivation letter");

      const response = await axios.put("/api/applicant/essay", { data });

      if (response.status == 200) {
        let id = response.data.response.id
        setEssayId(id)

        return toast.success("Data updated successfully");
      }
      if (response.status != 200) return toast.error("Data not saved");
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
                  <h4 className="mb-0">MOTIVATION LETTER </h4>
                </div>
              </div>
            </div>
            <div className="row">
              <ApplicationMenu whichLink="essay" />

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
                          <QuillEditor
                              style={{height:'400px'}}
                                value={essay}
                                onChange={handleEditorChange}
                                modules={quillModules}
                                formats={quillFormats}
                                className="w-full h-[70%] mt-10 bg-white"
                              />
                          </div>
                        </div>
                        <small style={{ color: "red" }}>{wordCount}/200</small>
                      </div>
                      <div className="form-actions mt-10" style={{ textAlign: "end" }}>
                        {essayId == "" || essayId == undefined ?
                          <button
                            className="btn btn-success add"
                            type="button"
                            onClick={(e: any) => {
                              e.preventDefault();
                              save();
                            }}
                          >
                            Save
                          </button> : <button
                            className="btn btn-warning add"
                            type="button"
                            onClick={(e: any) => {
                              e.preventDefault();
                              update();
                            }}
                          >
                            Update
                          </button>}
                      </div>
                    </form>
                  </div>
                </div>
                <div className="form-actions mt-10">
                  <div className="col-md-12" style={{ textAlign: "end" }}>
                    <div className="btn-group" role="group" aria-label="Basic example">
                      <Link href="/applicant/employment" type="button" className="btn btn-success">

                        Previous

                      </Link>
                      <Link href="/applicant/publication" type="button" className="btn btn-success">
                        Next
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
