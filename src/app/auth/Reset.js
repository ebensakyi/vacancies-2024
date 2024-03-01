/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";

import Link from "next/link";
import MyHead from "../../components/Head";
import Footer from "../../components/Footer";

const Reset = () => {
  // const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const router = useRouter();
  const email = router.query.email;
  useEffect(() => { });

 

  const reset = async () => {
    try {
      if (email == null || password == null || confirmPassword == null)
        return toast.error("Please fill the form");
      if (confirmPassword !== password)
        return toast.error("Passwords should match");
      const data = {
        email,
        password,
      };
      const response = await axios.post("/api/auth/reset", {
        data,
      });

      // setEmail("");
      setPassword("");
      setConfirmPassword("");

      if (response.status == 1) {
        Router.push("/");
        return toast.success(response.data.message);
      }

      if (response.status == 0)
        return toast.error(response.data.message);
    } catch (error) {

    }

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
                      alt=""
                      height="120"
                      width="100"
                      className="logo logo-dark"
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
                    <h5 className="text-primary">Reset</h5>
                    <p className="text-muted">Enter new password and reset.</p>
                  </div>
                  <div className="p-2 mt-4">
                    <form method="POST">
                      <div className="row">
                        {/* <div className="mb-3">
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
                        </div> */}

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
                          <small>
                            Password should be at least 8 characters
                          </small>
                          <div className="invalid-tooltip">
                            Password is required(Should be at least 8
                            characters)
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="validationTooltip02">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="validationTooltip02"
                            minLength={8}
                            name="password"
                            value={confirmPassword}
                            required
                            onChange={(e:any) => {
                              setConfirmPassword(e.target.value);
                            }}
                          />
                          <small>
                            Password should be at least 8 characters
                          </small>
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
                              reset();
                            }}
                          >
                            Reset Password
                          </button>
                        </div>
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

export default Reset;
