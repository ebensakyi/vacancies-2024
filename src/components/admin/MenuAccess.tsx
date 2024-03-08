// "use client"
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Multiselect from "multiselect-react-dropdown";
// import { useState } from "react";

// const MenuAccess = ({ menus, userTypes }:any) => {
//   const { data: session } = useSession({
//     required: true,
//     onUnauthenticated() {
//         redirect(ADMIN_LOGIN_URL);
//     }
// })
//   const [userType, setUserType] = useState();
//   const [menu, setMenu] = useState([]);

//   const save = async () => {
//     try {
//       if (userType == null || menu == null)
//         return toast.error("Please fill the form");

//       const data = {
//         menuAccess: menu,
//         // userType,
//       };

//       const response = await axios.post("/api/admin/menu-access", { data });
//       if (response.status == 200) {
//        // Router.reload(window.location.pathname);
//         return toast.success("Data saved successfully");
//       }
//       if (response.status != 200) return toast.error("Data not saved");
//     } catch (error) {

//     }

//   };

//   const onSelect = (selectedList: any, selectedItem: any) => {
//     setMenu([
//       ...menu,
//       { menuId: selectedItem.id, userTypeId: Number(userType) },
//     ]);
//   };

//   const onRemove = (selectedList: any, removedItem: { id: any; }) => {
//     const filtered = menu.filter((m) => m.menuId !== removedItem.id);
//     setMenu(filtered);
//   };
//   return (
//     <div className="col-lg-6">
//       <ToastContainer
//         position="top-right"
//         autoClose={15000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <div className="card border border-">
//         <div className="card-header">
//           <h4 className="card-title">ADD</h4>
//         </div>
//         <div className="card-body">
//           <form method="POST">
//             <div className="row">
//               <div className="col-md-5">
//                 <div className="form-group">
//                   <div className="mb-5 position-relative">
//                     <label htmlFor="jobName">
//                       User Type: <span className="danger">*</span>
//                     </label>
//                     <select
//                       className="custom-select form-control "
//                       required
//                       onChange={(e:any) => {
//                         setUserType(e.target.value);
//                       }}
//                     >
//                       <option value="">Select menu</option>
//                       {userTypes.map((userType:any) => (
//                         <option key={userType.id} value={userType.id}>
//                           {userType.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-5">
//                 <div className="form-group">
//                   <div className="mb-5 position-relative">
//                     <label htmlFor="policy">
//                       Select page access : <span className="danger">*</span>
//                     </label>
//                     <Multiselect
//                       options={menus}
//                       //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
//                       onSelect={onSelect}
//                       onRemove={onRemove}
//                       displayValue="name"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-2">
//                 <div className="form-group">
//                   <label htmlFor="save">
//                     Add <span className="danger"></span>
//                   </label>
//                   <br />

//                   <button
//                     type="button"
//                     className="btn btn-success add"
//                     onClick={(e:any) => {
//                       e.preventDefault();

//                       save();
//                     }}
//                   >
//                     Save
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuAccess;
