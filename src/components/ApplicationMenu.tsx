import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { SERVER_BASE_URL } from "@/constants";


const ApplicationMenu = async ({ whichLink }: any) => {
  let activeLink = " active";

  // let staffTypes = [1,2]
    // let response = await fetch(`${SERVER_BASE_URL}/api/applicant/select-position/stafftype`, { cache: 'no-store' });

    // let staffTypes = await response.json();
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

  return (
    <ul
      className="nav nav-pills nav-justified bg-dark-"
      style={{ backgroundColor: "#d3d3d3" }}
      role="tablist"
    >
      <li className="nav-item waves-effect waves-light">
        <Link
          href="#"
          style={{ pointerEvents: "none" }}
          className={`nav-link  ${
            whichLink == "select-positions" ? activeLink : ""
          }`}
        >
          <span className="d-block d-sm-none">
            <i
              className="fas fa-bars
"
            />
          </span>
          <span className="d-none d-sm-block">Select Position(s)</span>
        </Link>
      </li>
      <li className="nav-item waves-effect waves-light">
        <Link
          href="#"
          className={`nav-link  ${whichLink == "personal" ? activeLink : ""}`}
        >
          <span className="d-block d-sm-none">
            <i className="fas fa-user" />
          </span>
          <span className="d-none d-sm-block">Personal</span>
        </Link>
      </li>

      <li className="nav-item waves-effect waves-light">
        <Link
          href="#"
          className={`nav-link  ${whichLink == "education" ? activeLink : ""}`}
        >
          <span className="d-block d-sm-none">
            <i className="fas fa-book-open" />
          </span>
          <span className="d-none d-sm-block">Education</span>
        </Link>
      </li>

      <li className="nav-item waves-effect waves-light">
        <Link
          href="#"
          className={`nav-link  ${
            whichLink == "certifications" ? activeLink : ""
          }`}
        >
          <span className="d-block d-sm-none">
            <i className="fas fa-award" />
          </span>
          <span className="d-none d-sm-block">Certifications</span>
        </Link>
      </li>

      <li className="nav-item waves-effect waves-light">
        <Link
          href="#"
          className={`nav-link  ${whichLink == "employment" ? activeLink : ""}`}
        >
          <span className="d-block d-sm-none">
            <i className="fas fa-business-time" />
          </span>
          <span className="d-none d-sm-block">Employment</span>
        </Link>
      </li>

      {/* {staffTypes.includes(1) ? (
        <> */}
   
          <li className="nav-item waves-effect waves-light">
            <Link
              href="#"
              className={`nav-link  ${whichLink == "essay" ? activeLink : ""}`}
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-align-left" />
              </span>
              <span className="d-none d-sm-block">Motivation</span>
            </Link>
          </li>
          <li className="nav-item waves-effect waves-light">
            <Link
              href="#"
              className={`nav-link  ${
                whichLink == "publications" ? activeLink : ""
              }`}
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-atlas" />
              </span>
              <span className="d-none d-sm-block">Publications</span>
            </Link>
          </li>
        {/* </>
      ) : (
        <></>
      )} */}

      <li className="nav-item waves-effect waves-light">
        <Link
          href="#"
          className={`nav-link  ${whichLink == "references" ? activeLink : ""}`}
        >
          <span className="d-block d-sm-none">
            <i
              className="fas fa-compress-arrows-alt
"
            />
          </span>
          <span className="d-none d-sm-block">References</span>
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
        <Link
          href="#"
          className={`nav-link  ${
            whichLink == "submit-application" ? activeLink : ""
          }`}
        >
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
