'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from "next/link";
import { useRouter, redirect, usePathname } from "next/navigation";

const Header = () => {

  const router = useRouter();
  const pathname = usePathname()


  const { data: session }: any = useSession()

  let user = session?.user




  return (
    <> {user ?

      user?.userRoleId == 1 || user?.userRoleId == 2 || user?.userRoleId == 3 ?
        ///ADMIN NAV
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
                    src="/assets/images/user.png"
                    alt="Header Avatar"
                  />
                  <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
                    {user?.firstName}  {user?.surname}
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
                  <button className="dropdown-item" onClick={() => { signOut() }}>
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
                        pathname == "/admin/dashboard"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <Link href="/admin/dashboard" className="nav-link" >

                        <i
                          className="dripicons-home
 me-2"
                        />
                        Dashboard

                      </Link>
                    </li>
                    <li
                      className={
                        pathname == "/admin/broadsheet"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <Link href="/admin/broadsheet" className="nav-link">

                        <i
                          className="dripicons-paperclip
 me-2"
                        />
                        Broadsheet

                      </Link>
                    </li>

                    {/* <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle arrow-none"
                      href="#"
                      id="topnav-pages"
                      role="button"
                    >
                      <i
                        className="dripicons-experiment
                          me-2"
                      />
                      Filter <div className="arrow-down" />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="topnav-pages"
                    >
                      <Link href="/admin/filter">
                        <a href="#" className="dropdown-item">
                          Filter
                        </a>
                      </Link>
                     
                      <Link href="/admin/filter/filtered-out">
                        <a href="#" className="dropdown-item">
                          Filtered out
                        </a>
                      </Link>
                    </div>
                  </li> */}
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle arrow-none"
                        href="#"
                        id="topnav-pages"
                        role="button"
                      >
                        <i
                          className="dripicons-view-list
 me-2"
                        />
                        Shortlisting <div className="arrow-down" />
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="topnav-pages"
                      >
                        <Link href="/admin/shortlist" className="dropdown-item">

                          Shortlist

                        </Link>
                        <Link href="/admin/shortlist/shortlisted" className="dropdown-item">

                          Shortlisted list

                        </Link>
                        <Link href="/admin/shortlist/rejected" className="dropdown-item">

                          Rejected list

                        </Link>
                      </div>
                    </li>

                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle arrow-none"
                        href="#"
                        id="topnav-pages"
                        role="button"
                      >
                        <i
                          className="dripicons-toggles
 me-2"
                        />
                        Configure <div className="arrow-down" />
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="topnav-pages"
                      >
                        <Link href="/admin/configure/recruitment" className="dropdown-item">

                        <span className="badge bg-danger">1</span>  Create  Recruitment

                        </Link>
                        <Link href="/admin/configure/setup-portal" className="dropdown-item">

                        <span className="badge bg-warning">2</span>  Set up portal

                        </Link>
                        <Link href="/admin/configure/policy" className="dropdown-item">

                        <span className="badge bg-success">3</span>    Policy

                        </Link>
                        <Link href="/admin/job-advert" className="dropdown-item">
                          Job advert
                        </Link>
                        <Link href="/admin/job" className="dropdown-item">

                          Job list

                        </Link>


                        <hr />


                        {/* <Link href="/admin/configure/menu-access" className="dropdown-item">

                        Menu Access

                      </Link> */}



                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle arrow-none"
                        href="#"
                        id="topnav-pages"
                        role="button"
                      >
                        <i
                          className="dripicons-archive
 me-2"
                        />
                        Default data <div className="arrow-down" />
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="topnav-pages"
                      >
                        <Link href="/primary-data/exam-type" className="dropdown-item">
                          Exam type

                        </Link>
                        <Link href="/primary-data/education-level" className="dropdown-item">

                          Education Level

                        </Link>
                        {/* <Link href="#/admin/grade-interpretation" className="dropdown-item">
                      
                          Grade Interpretation
                       
                      </Link> */}
                        <Link href="/primary-data/grade" className="dropdown-item">

                          Grade

                        </Link>
                        {/* <Link href="/primary-data/subject-type" className="dropdown-item">
                       
                          Subject Type
                       
                      </Link> */}
                        <Link href="/primary-data/subject" className="dropdown-item">

                          Subject

                        </Link>
                        <Link href="/primary-data/staff-type" className="dropdown-item">

                          Staff type

                        </Link>
                        {/* <Link href="/primary-data/menu" className="dropdown-item">
                          Menu
                      </Link>
                      <Link href="/primary-data/sub-menu" className="dropdown-item">
                          Sub menu
                      </Link> */}
                        <Link href="/primary-data/division" className="dropdown-item">
                          Division
                        </Link>
                        <Link href="/primary-data/department" className="dropdown-item">

                          Department

                        </Link>
                        {/* <Link href="/primary-data/user-role" className="dropdown-item">

                        User role
                      </Link> */}
                        {/* <Link href="/primary-data/sex" className="dropdown-item">
                      
                          Sex
                       
                      </Link> */}
                        <Link href="/primary-data/degree-prefix" className="dropdown-item">

                          Degree Prefix

                        </Link>
                      </div>
                    </li>
                    <li className="nav-item dropdown" style={{ color: "red" }}>
                      <a
                        className="nav-link "
                        href="#"
                        id="topnav-pages"
                        role="button"
                      >
                        <i
                          className="dripicons-lock
 me-2"
                        />
                        Account <div className="arrow-down" />
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="topnav-pages"
                      >
                        <Link href="/admin/configure/user-role" className="dropdown-item">

                          User role
                        </Link>

                        <Link href="/admin/user/admin" className="dropdown-item">
                          Admin Users
                        </Link>
                        <Link href="/admin/user" className="dropdown-item">
                          Applicants
                        </Link>
                        {/* <hr/>
                      <button
                        type="submit"
                        className="dropdown-item"
                        onClick={(e: any) => {
                          e.preventDefault();
                         // logout();
                        }}
                      >
                        Logout
                      </button> */}
                      </div>
                    </li>
                  </ul>
                </div>


              </nav>
            </div>

          </div>
        </header> :

        /// APPLICANT NAV
        <>
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
                      src="/assets/images/user.png"
                      alt="Header Avatar"
                    />
                    <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
                      {user?.firstName}  {user?.surname}
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
                    <button className="dropdown-item" onClick={() => { signOut() }}>
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
                      {/* <li
                        className={
                          pathname == "/applicant/select-position"
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
                      </li> */}
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
          </header>

        </>

      : <></>}</>
  );
};

export default Header;
