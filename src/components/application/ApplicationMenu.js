import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import Router, { useRouter } from "next/router";
import { genCode } from "../../util/generate-random";

const ApplicationMenu = ({ whichLink }) => {
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
      {menu == "1" || menu == "2" || menu == "3" ? (
        <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${
                whichLink == "personal" ? activeLink : ""
              }`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-user" />
              </span>
              <span className="d-none d-sm-block">Personal</span>
            </a>
          </Link>
        </li>
      ) : null}
      {menu == "1" || menu == "2" || menu == "3" ? (
        <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${
                whichLink == "education" ? activeLink : ""
              }`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-book-open" />
              </span>
              <span className="d-none d-sm-block">Education</span>
            </a>
          </Link>
        </li>
      ) : null}
      {menu == "1" || menu == "2" || menu == "3" ? (
        <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${
                whichLink == "certifications" ? activeLink : ""
              }`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-award" />
              </span>
              <span className="d-none d-sm-block">Certifications</span>
            </a>
          </Link>
        </li>
      ) : null}
      {menu == "1" || menu == "2" || menu == "3" ? (
        <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${
                whichLink == "employment" ? activeLink : ""
              }`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-business-time" />
              </span>
              <span className="d-none d-sm-block">Employment</span>
            </a>
          </Link>
        </li>
      ) : null}
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
      {menu == "1" ? (
        <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${
                whichLink == "publications" ? activeLink : ""
              }`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i className="fas fa-atlas" />
              </span>
              <span className="d-none d-sm-block">Publications</span>
            </a>
          </Link>
        </li>
      ) : null}
      {menu == "1" || menu == "2" || menu == "3" ? (
        <>
          <li className="nav-item waves-effect waves-light">
            <Link href="#">
              <a
                className={`nav-link  ${
                  whichLink == "references" ? activeLink : ""
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
                <span className="d-none d-sm-block">References</span>
              </a>
            </Link>
          </li>
          <li className="nav-item waves-effect waves-light">
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
                    className="fas fa-bars
"
                  />
                </span>
                <span className="d-none d-sm-block">Select Position</span>
              </a>
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
        </>
      ) : null}{" "}
      {menu == "1" || menu == "2" || menu == "3" ? (
        <li className="nav-item waves-effect waves-light">
          <Link href="#">
            <a
              className={`nav-link  ${
                whichLink == "submit-application" ? activeLink : ""
              }`}
              // data-bs-toggle="tab"
              // href="#"
              // role="tab"
            >
              <span className="d-block d-sm-none">
                <i
                  className="fas fa-laptop
"
                />
              </span>
              <span className="d-none d-sm-block">Submit</span>
            </a>
          </Link>
        </li>
      ) : null}
    </ul>
  );
};

export default ApplicationMenu;
