/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import { genCode } from "../../util/generate-random";

import Link from "next/link";
import MyHead from "../Head";
import Footer from "../Footer";

const Login = () => {
  let gen,
    core = "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(async () => {
    gen = await genCode(20);
    core = await genCode(100);
  });

  const login = async () => {
    try {
      if (email == "" || password == "")
        return toast.error("Please fill the form.");
      const data = {
        email,
        password,
      };
      const response = await axios.post("/api/auth/login", {
        data,
      });

      setEmail("");
      setPassword("");

      let { statusCode } = response.data;
      let { message } = response.data;


      if (statusCode == 0) {
        return toast.error(message);
      } else if (statusCode == 1) {
        let { userType } = response.data.data;
        let { submitted } = response.data.data || "";

        let { recruitmentType } = response.data.data || "";

        Cookies.set("ut", gen + gen + gen + userType, {
          expires: 3 * 60 * 60,
        });
        Cookies.set("rt", gen + gen + gen + recruitmentType, {
          expires: 3 * 60 * 60,
        });
        console.log("dashboard=>",userType);
        if (userType == 1) {
          Router.push("/admin/dashboard");
          return toast.success("Logged in successfully");
        } else if (userType == 2) {
          Router.push("/admin/shortlist");
          return toast.success("Logged in successfully");
        } else if (userType == 3) {
          Router.push("/admin/dashboard");
          return toast.success("Logged in successfully");
        } else if (userType == 4) {
        

          if (submitted == true) {
            return Router.replace("/application/list");
          } else {
            return Router.replace("/application/personal?core=" + core);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    // else if (statusCode == 2) {
    //   Router.push("/application/personal");
    //   return toast.success("Logged in successfully");
    // }
  };

  return (
    <>
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
      
      <div className="account-pages my-5 pt-sm-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <Link href="/">
                  <a href="#" className="mb-5 d-block auth-logo">
                    <img
                      src="/logo.png"
                      style={{ width: "80px", height: "80px" }}
                    />

                    {/* <Image
                    src="/logo.png"
                    alt=""
                    height="100"
                    width="100"
                    className="logo logo-light"
                  /> */}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Login</h5>
                    <p className="text-muted">Login to your account now.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form method="POST">
                      <div className="row">
                        <div className="mb-3">
                          <label htmlFor="validationTooltip02">E-mail</label>
                          <input
                            type="email"
                            className="form-control"
                            id="validationTooltip02"
                            name="email"
                            value={email}
                            onChange={(e:any) => {
                              setEmail(e.target.value);
                            }}
                            required
                          />
                          <div className="invalid-tooltip">
                            Email address is required
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="validationTooltip02">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="validationTooltip02"
                            minLength={8}
                            name="password"
                            value={password}
                            required
                            onChange={(e:any) => {
                              setPassword(e.target.value);
                            }}
                          />
                          {/* <small>
                            Password should be at least 8 characters
                          </small> */}
                          <div className="invalid-tooltip">
                            Password is required(Should be at least 8
                            characters)
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                          <button
                            className="btn btn-success"
                            type="submit"
                            onClick={(e:any) => {
                              e.preventDefault();
                              login();
                            }}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          Don`t have an account ?
                          <Link href="/auth/register">
                            <a
                              href="/auth/register"
                              className="fw-medium text-primary"
                            >
                              {" "}
                              Register now
                            </a>
                          </Link>
                        </p>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          <Link href="/auth/forget-password">
                            <a href="#" className="fw-medium text-primary">
                              Forget password ?
                            </a>
                          </Link>
                        </p>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          Back to open positions ?
                          <Link href="/">
                            <a href="/" className="fw-medium text-primary">
                              {" "}
                              Home
                            </a>
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
