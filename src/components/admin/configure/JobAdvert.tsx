// "use client"
// import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { usePathname, redirect } from "next/navigation";
// import moment from "moment";
// import { Editor } from "@tinymce/tinymce-react";
// import Modal from "react-responsive-modal";

// const JobAdvert = ({ data }: any) => {
//     const [name, setName] = useState("");
//     const [policy, setPolicy] = useState("");
//     const [detail, setDetail] = useState("");
//     const [publish, setPublish] = useState("");
//     const [modalContent, setModalContent] = useState("");
//     const [modalTitle, setModalTitle] = useState("");
//     const [open, setOpen] = useState(false);
//     const onCloseModal = () => setOpen(false);
//     const pathname = usePathname()



//     const save = async () => {
//         try {
//             const data = {
//                 name,
//                 policy,
//                 detail,
//             };
//             if (name == "") return toast.error("Data not saved. Enter sex");

//             const response = await axios.post("/api/admin/job-advert", { data });
//             if (response.data.statusCode == 1) {
//                 redirect(pathname);
//                 return toast.success("Data saved successfully");
//             }
//             if (response.data.statusCode == 0) return toast.error("Data not saved");
//         } catch (error) {
//         }

//     };
//     const handlePublishing = async (id: any) => {
//         try {
//           const response = await axios.put("/api/admin/job-advert", { id });
//           if (response.data.statusCode == 1) {
//             redirect(pathname);
//             return toast.success("Job published successfully");
//           }
//           if (response.data.statusCode == 0) return toast.error("Job not published ");
//         } catch (error) {
    
//         }
    
//       };
    
//       const deleteJob = async (id:any) => {
//         try {
//           const response = await axios.delete(`/api/admin/job-advert`, {
//             data: id,
//           });
//           if (response.data.statusCode == 1) {
//             redirect(pathname);
//             return toast.success("Job deleted successfully");
//           }
//           if (response.data.statusCode == 0) return toast.error("Job not published ");
//         } catch (error) {
    
//         }
    
//       };
//     return (
//         <div id="layout-wrapper">

//             <Modal open={open} onClose={onCloseModal} center>
//                 {modalTitle}
//                 <hr />
//                 {modalContent}
//             </Modal>
//             <div className="main-content">
//                 <div className="page-content">
//                     <div className="container-fluid">
//                         <div className="row">
//                             <div className="col-12">
//                                 <div className="page-title-box d-flex align-items-center justify-content-between">
//                                     <h4 className="mb-0">ADD</h4>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">

//                             <ToastContainer
//                                 position="top-right"
//                                 autoClose={15000}
//                                 hideProgressBar={false}
//                                 newestOnTop={false}
//                                 closeOnClick
//                                 rtl={false}
//                                 pauseOnFocusLoss
//                                 draggable
//                                 pauseOnHover
//                             />
//                             <div className="col-xl-6">
//                                 <div className="card">
//                                     <div className="card-header">
//                                         <h4 className="card-title">ADD</h4>
//                                     </div>
//                                     <div className="card-body">
//                                         <form className="needs-validation" noValidate>
//                                             <div className="row">
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3 position-relative">
//                                                         <label className="form-label" htmlFor="validationTooltip01">
//                                                             Job title
//                                                         </label>
//                                                         <input
//                                                             type="text"
//                                                             className="form-control"
//                                                             id="validationTooltip01"
//                                                             onChange={(e) => {
//                                                                 setName(e.target.value);
//                                                             }}
//                                                             required
//                                                         />
//                                                         <div className="valid-tooltip">Looks good!</div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-6">
//                                                     <div className="mb-3 position-relative">
//                                                         <label className="form-label" htmlFor="validationTooltip02">
//                                                             Shortlist policy
//                                                         </label>
//                                                         <select
//                                                             className="form-select"
//                                                             id="policy"
//                                                             onChange={(e) => {
//                                                                 setPolicy(e.target.value);
//                                                             }}
//                                                         >
//                                                             <option value="">Select policy</option>
//                                                             {data?.policy.map((data: any) => (
//                                                                 <option key={data.id} value={data.id}>
//                                                                     {data.name}
//                                                                 </option>
//                                                             ))}
//                                                         </select>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="row">
//                                                 <div className="col-md-12">
//                                                     <div className="mb-3 position-relative">
//                                                         <Editor
//                                                             apiKey="231hohc8dmkwpp8k8vawvs3oatywgw9p3x2n9bnsu7e5mabx"
//                                                             initialValue=""
//                                                             init={{
//                                                                 height: 500,
//                                                                 menubar: false,
//                                                                 plugins: [
//                                                                     "advlist autolink lists link image",
//                                                                     "charmap print preview anchor help",
//                                                                     "searchreplace visualblocks code",
//                                                                     "insertdatetime media table paste wordcount",
//                                                                 ],
//                                                                 toolbar:
//                                                                     "undo redo | formatselect | bold italic | \
//             alignleft aligncenter alignright | \
//             bullist numlist outdent indent | help",
//                                                             }}
//                                                             onChange={(e) => {
//                                                                 setDetail(e.target.getContent());
//                                                             }}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <button
//                                                 className="btn btn-primary"
//                                                 type="submit"
//                                                 onClick={(e) => {
//                                                     e.preventDefault();
//                                                     save();
//                                                 }}
//                                             >
//                                                 Submit
//                                             </button>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-xl-6">
//                                 <div className="card">
//                                     <div className="card-header">
//                                         <h4 className="card-title">ADVERTS</h4>
//                                     </div>
//                                     <div className="card-body">
//                                         <div className="table-responsive">
//                                             <table className="table mb-0">
//                                                 <thead className="table-light">
//                                                     <tr>
//                                                         <th hidden>#</th>
//                                                         <th>Name</th>
//                                                         <th>Policy</th>
//                                                         <th>Is published</th>

//                                                         <th>Publish</th>
//                                                         <th>Preview</th>
//                                                         <th>Delete</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {data?.job.map((ad: any) => {
//                                                         return (
//                                                             <tr key={ad.id}>
//                                                                 <td hidden>{ad.id}</td>
//                                                                 <td>{ad.name}</td>
//                                                                 <td>{ad.Policy.name}</td>
//                                                                 <td>{ad.published == 0 ? "No" : "Yes"}</td>

//                                                                 <td>
//                                                                     <div className="form-check form-check-right">
//                                                                         <input
//                                                                             className="form-check-input"
//                                                                             type="checkbox"
//                                                                             id="formCheckRight2"
//                                                                             checked={ad.published == 1 ? true : false}
//                                                                             onChange={(e:any) => {
//                                                                                 setPublish(e.target.checked);
//                                                                                 handlePublishing(ad.id);
//                                                                             }}
//                                                                         />
//                                                                         <label
//                                                                             className="form-check-label"
//                                                                             htmlFor="formCheckRight2"
//                                                                             style={{ color: "green" }}
//                                                                         >
//                                                                             Publish
//                                                                         </label>
//                                                                     </div>
//                                                                 </td>
//                                                                 <td>
//                                                                     <button
//                                                                         type="button"
//                                                                         className="btn btn-success btn-sm waves-effect waves-light "
//                                                                         onClick={() => {
//                                                                             setModalTitle(ad.name);
//                                                                             setModalContent(ReactHtmlParser(ad.details));
//                                                                             setOpen(true);
//                                                                         }}
//                                                                     >
//                                                                         <i className="dripicons-preview" />
//                                                                     </button>
//                                                                 </td>
//                                                                 <td>
//                                                                     <button
//                                                                         type="button"
//                                                                         className="btn btn-danger btn-sm waves-effect waves-light"
//                                                                         onClick={(e) => {
//                                                                             e.preventDefault();
//                                                                             deleteJob(ad.id);
//                                                                         }}
//                                                                     >
//                                                                         <i className="dripicons-trash" />
//                                                                     </button>
//                                                                 </td>
//                                                             </tr>
//                                                         );
//                                                     })}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobAdvert;
// function ReactHtmlParser(details: any): SetStateAction<string> {
//     throw new Error("Function not implemented.");
// }

