import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import Router, { useRouter } from "next/router";

const ApplicationMenu = ({ whichLink}:any ) => {
  let activeLink = " active";

  // useEffect(() => {
  //   async function run() {
  //     let gen = await genCode(20);
  //     if (recruitementType) {
  //       let rt = recruitementType.staffTypeId;
  //       Cookies.set("rt", gen + gen + "" + rt, {
  //         expires: 60 * 60,
  //       });
  //     }
  //   }
  //   run();

  //   if (!menu) Router.replace("/auth/login");
  // }, []);

  let cookie = Cookies.get("rt") || "";     

  let menu = cookie.charAt(cookie.length - 1);

  return (
    <ul
      className="nav nav-pills nav-justified bg-dark-"
      style={{ backgroundColor: "#d3d3d3" }}
      role="tablist"
    >
        <li className="nav-item waves-effect waves-light">
          <Link href="#"  className={`nav-link  ${
                whichLink == "personal" ? activeLink : ""
              }`}>
          
              <span className="d-block d-sm-none">
                <i className="fas fa-user" />
              </span>
              <span className="d-none d-sm-block">Personal</span>
          </Link>
        </li>
    
        <li className="nav-item waves-effect waves-light">
          <Link href="#"  className={`nav-link  ${
                whichLink == "education" ? activeLink : ""
              }`}>
            
              <span className="d-block d-sm-none">
                <i className="fas fa-book-open" />
              </span>
              <span className="d-none d-sm-block">Education</span>
          </Link>
        </li>
    
        <li className="nav-item waves-effect waves-light">
          <Link href="#" className={`nav-link  ${
                whichLink == "certifications" ? activeLink : ""
              }`}>
           
              <span className="d-block d-sm-none">
                <i className="fas fa-award" />
              </span>
              <span className="d-none d-sm-block">Certifications</span>
          </Link>
        </li>
    
        <li className="nav-item waves-effect waves-light">
          <Link href="#" className={`nav-link  ${
                whichLink == "employment" ? activeLink : ""
              }`}>
           
              <span className="d-block d-sm-none">
                <i className="fas fa-business-time" />
              </span>
              <span className="d-none d-sm-block">Employment</span>
          </Link>
        </li>
     
      {/* {menu == "1" ? (
        <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${whichLink == "essay" ? activeLink : ""}`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-align-left" />
              </span>
              <span className="d-none d-sm-block">Motivation</span>
            </a>
          </Link>
        </li>
      ) : null} */}
        <li className="nav-item waves-effect waves-light">
          <Link href="#"  className={`nav-link  ${
                whichLink == "publications" ? activeLink : ""
              }`}>
           
              <span className="d-block d-sm-none">
                <i className="fas fa-atlas" />
              </span>
              <span className="d-none d-sm-block">Publications</span>
          </Link>
        </li>
    
          <li className="nav-item waves-effect waves-light">
            <Link href="#"  className={`nav-link  ${
                  whichLink == "references" ? activeLink : ""
                }`}>
             
                <span className="d-block d-sm-none">
                  <i
                    className="fas fa-compress-arrows-alt
"
                  />
                </span>
                <span className="d-none d-sm-block">References</span>
            </Link>
          </li>
          <li className="nav-item waves-effect waves-light">
            <Link href="#" className={`nav-link  ${
                  whichLink == "select-positions" ? activeLink : ""
                }`}>
              
                <span className="d-block d-sm-none">
                  <i
                    className="fas fa-bars
"
                  />
                </span>
                <span className="d-none d-sm-block">Select Position</span>
            </Link>
          </li>
          {/* <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${
                whichLink == "select-positions" ? activeLink : ""
              }`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i
                  className="fas fa-compress-arrows-alt
"
                />
              </span>
              <span className="d-none d-sm-block">Select Position(s)</span>
            </a>
          </Link>
        </li> */}
     
        <li className="nav-item waves-effect waves-light">
          <Link href="#" className={`nav-link  ${
                whichLink == "submit-application" ? activeLink : ""
              }`}>
          
              <span className="d-block d-sm-none">
                <i
                  className="fas fa-laptop
"
                />
              </span>
              <span className="d-none d-sm-block">Submit</span>
          </Link>
        </li>
    
    </ul>
  );
};

export default ApplicationMenu;
