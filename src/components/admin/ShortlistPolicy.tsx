// "use client"
// import { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Policy = ({ level, staff }:any) => {
//   const ages = [
//     18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
//     37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
//   ];
//   const [name, setName] = useState();
//   const [deadline, setDeadline] = useState();
//   const [age, setAge] = useState();
//   const [miniGrade, setMiniGrade] = useState();
//   const [miniEducation, setMiniEducation] = useState();
//   const [experience, setExperience] = useState();
//   const [staffType, setStaffType] = useState();
//   const [note, setNote] = useState();

//   // const [applicationMenus, setApplicationMenus] = useState([]);

//   // const onSelect = (selectedList, selectedItem) => {
//   //   setApplicationMenus([...applicationMenus, { id: selectedItem.id }]);
//   // };

//   // const onRemove = (selectedList, removedItem) => {
//   //   const filtered = applicationMenus.filter((m) => m.id !== removedItem.id);

//   //   setApplicationMenus(filtered);
//   // };

//   const save = async () => {
//     try {
//       if (name == null || deadline == null)
//         return toast.error("Please fill the form");

//       const data = {
//         name,
//         deadline,
//         age,
//         miniGrade,
//         miniEducation,
//         experience,
//         staffType,
//         note,
//       };
//       const response = await axios.post("/api/admin/policy", { data });
//       if (response.status == 200) {
//        // Router.reload(window.location.pathname);
//         return toast.success("Data saved successfully");
//       }
//       if (response.status != 200) return toast.error("Data not saved");
//     } catch (error) {}
//   };
//   return (
//     <div className="col-lg-12">
//       <div className="card">
//         <div className="card-header">
//           <h4 className="card-title">ADD</h4>
//         </div>
//         <div className="card-body">
//           <form className="needs-validation" noValidate>
//             <div className="row">
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="name">
//                       Policy name : <span className="danger">*</span>{" "}
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control required"
//                       value={name}
//                       required
//                       onChange={(e:any) => {
//                         setName(e.target.value);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="deadline">
//                       Deadline : <span className="danger">*</span>{" "}
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control required"
//                       id="mdate"
//                       value={deadline}
//                       required
//                       onChange={(e:any) => {
//                         setDeadline(e.target.value);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="age">
//                       Age limit(in years): <span className="danger">*</span>{" "}
//                     </label>
//                     <select
//                       className="custom-select form-control required"
//                       id="age"
//                       required
//                       onChange={(e:any) => {
//                         setAge(e.target.value);
//                       }}
//                     >
//                       <option value="">Select limit</option>
//                       {ages.map((row, index) => (
//                         <option key={index} value={row}>
//                           {row}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="grade">
//                       Minimum grade limit: <span className="danger">*</span>
//                     </label>
//                     <select
//                       className="custom-select form-control requireddd"
//                       id="minimumGrade"
//                       required
//                       onChange={(e:any) => {
//                         setMiniGrade(e.target.value);
//                       }}
//                     >
//                       <option value="">Select limit</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                       <option value="6">6</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="experience">
//                       Experience(in years) : <span className="danger">*</span>
//                     </label>
//                     <select
//                       className="custom-select form-control required"
//                       id="experience"
//                       required
//                       onChange={(e:any) => {
//                         setExperience(e.target.value);
//                       }}
//                     >
//                       <option value="">Select limit</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                       <option value="6">6</option>
//                       <option value="0">NA</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="note">
//                       Minimum education qualification :{" "}
//                       <span className="danger">*</span>
//                     </label>
//                     <select
//                       className="custom-select form-control required"
//                       id="minimumEduLevel"
//                       required
//                       onChange={(e:any) => {
//                         setMiniEducation(e.target.value);
//                       }}
//                     >
//                       <option value="">Select limit</option>
//                       {level.map((data:any) => (
//                         <option key={data.id} value={data.id}>
//                           {data.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="note">
//                       Staff type : <span className="danger">*</span>
//                     </label>
//                     <select
//                       className="custom-select form-control required"
//                       required
//                       onChange={(e:any) => {
//                         setStaffType(e.target.value);
//                       }}
//                     >
//                       <option value="">Select staff</option>
//                       {staff.map((data:any) => (
//                         <option key={data.id} value={data.id}>
//                           {data.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="note">
//                       Application sections :<span className="danger">*</span>
//                     </label>
//                     <Multiselect
//                       options={applicationMenuList}
//                       onSelect={onSelect}
//                       onRemove={onRemove}
//                       displayValue="name"
//                     />
//                   </div>
//                 </div>
//               </div> */}
//               <div className="col-md-4">
//                 <div className="form-group">
//                   <div className="mb-3 position-relative">
//                     <label className="form-label" htmlFor="note">
//                       Note (optional):
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control required"
//                       value={note}
//                       required
//                       onChange={(e:any) => {
//                         setNote(e.target.value);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="form-actions mt-10">
//               <button
//                 type="button"
//                 className="btn btn-success add"
//                 onClick={(e:any) => {
//                   e.preventDefault();
//                   save();
//                 }}
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       {/* end card */}
//     </div>
//   );
// };

// export default Policy;
