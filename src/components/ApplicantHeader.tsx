"use client";


import {signOut, useSession} from 'next-auth/react'
import Link from "next/link";
import { useRouter, redirect, usePathname } from "next/navigation";

const ApplicantHeader = () => {

  const router = useRouter();
  const pathname = usePathname()


  const {data: session}:any = useSession()

  let user = session?.user

  

  
  return (
    user?.userRole == 4?
     <header id="page-topbar">
     <div className="navbar-header">
       <div className="d-flex">
         {/* LOGO */}
         <div className="navbar-brand-box">
           <a href="#" className="logo logo-dark">
             <span className="logo-sm">
               <img
                 src="/logo.png"
                 style={{ width: "80px", height: "80px" }}
               />
             </span>
             <span className="logo-lg">
               <img
                 src="/logo.png"
                 style={{ width: "80px", height: "80px" }}
               />
             </span>
           </a>
           <a href="#" className="logo logo-light">
             <span className="logo-sm">
               <img
                 src="/logo.png"
                 style={{ width: "80px", height: "80px" }}
               />
             </span>
             <span className="logo-lg">
               <img
                 src="/logo.png"
                 style={{ width: "80px", height: "80px" }}
               />
             </span>
           </a>
         </div>
         <button
           type="button"
           className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
           data-bs-toggle="collapse"
           data-bs-target="#topnav-menu-content"
         >
           <i className="fa fa-fw fa-bars" />
         </button>
         {/* App Search*/}
         {/* <form className="app-search d-none d-lg-block">
            <div className="position-relative">
             <input
               type="text"
               className="form-control"
               placeholder="Search..."
             />
             <span className="uil-search" />
           </div> 
         </form>*/}
       </div>{" "}
       {/* <h4 style={{ color: "white" }}>ONLINE RECRUITMENT</h4> */}
       <div className="d-flex">
         <div className="dropdown d-inline-block d-lg-none ms-2">
           <button
             type="button"
             className="btn header-item noti-icon waves-effect"
             id="page-header-search-dropdown"
             data-bs-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
           >
             <i className="uil-search" />
           </button>
         </div>

         <div className="dropdown d-none d-lg-inline-block ms-1">
           <button
             type="button"
             className="btn header-item noti-icon waves-effect"
             data-bs-toggle="fullscreen"
           >
             <i className="uil-minus-path" />
           </button>
         </div>

         <div className="dropdown d-inline-block">
           <button
             type="button"
             className="btn header-item waves-effect"
             id="page-header-user-dropdown"
             data-bs-toggle="dropdown"
             aria-haspopup="true"
             aria-expanded="false"
           >
             <img
               className="rounded-circle header-profile-user"
               src="/assets/images/users/avatar-4.jpg"
               alt="Header Avatar"
             />
             <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
               {user?.firstName}  { user?.surname}
             </span>
             <i className="uil-angle-down d-none d-xl-inline-block font-size-15" />
           </button>
           <div className="dropdown-menu dropdown-menu-end">
             <a className="dropdown-item" href="#">
               <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1" />{" "}
               <span className="align-middle">View Profile</span>
             </a>
             {/* <a className="dropdown-item" href="#">
               <i className="uil uil-wallet font-size-18 align-middle me-1 text-muted" />{" "}
               <span className="align-middle">My Wallet</span>
             </a>
             <a className="dropdown-item d-block" href="#">
               <i className="uil uil-cog font-size-18 align-middle me-1 text-muted" />{" "}
               <span className="align-middle">Settings</span>{" "}
               <span className="badge bg-soft-success rounded-pill mt-1 ms-2">
                 03
               </span>
             </a>
             <a className="dropdown-item" href="#">
               <i className="uil uil-lock-alt font-size-18 align-middle me-1 text-muted" />{" "}
               <span className="align-middle">Lock screen</span>
             </a> */}
             <button className="dropdown-item" onClick={()=>{signOut()}}>
               <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted" />{" "}
               <span className="align-middle">Sign out</span>
             </button>
           </div>
         </div>
         <div className="dropdown d-inline-block">
           <button
             type="button"
             className="btn header-item noti-icon right-bar-toggle waves-effect"
           >
             <i className="uil-cog" />
           </button>
         </div>
       </div>
     </div>
     <div className="container-fluid">
       <div className="topnav">
         <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
           <div className="collapse navbar-collapse" id="topnav-menu-content">
            

           
           <ul className="navbar-nav">
                  <li
                    className={
                      pathname == "/applicant/personal-info"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link href="/applicant/select-position" className="nav-link" >
                      <i
                        className="dripicons-home
me-2"
                      />
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/applicant/applications" className="nav-link" >
                      <i
                        className="dripicons-archive me-2
                        "
                      />
                      Applications
                    </Link>
                  </li>
                  <li
                    className={
                      pathname == "/applicant/faq"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Link href="/applicant/faq" className="nav-link" >
                      <i
                        className="dripicons-question me-2
                        "
                      />
                      FAQ
                    </Link>
                  </li>
                 
</ul>
              </div>

         
         </nav>
       </div>
      
     </div>
   </header>:<></>

  );
};

export default ApplicantHeader;
