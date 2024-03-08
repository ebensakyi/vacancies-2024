'use client'
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Footer from "../Footer";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")



  const reset = async () => {
    try {
      if (email == "" || password == "" || confirmPassword == "")
        return toast.error("Please fill the form");
      if (password != confirmPassword) {
        return toast.error("Passwords do not match");

      }
      const data = {
        email,
        password
      };
      const response = await axios.post("/api/auth/forget-password", {
        data,
      });

      setEmail("");
      setPassword("")
      if (response.status == 200) {
        // Router.push("/auth/reset-password");
        return toast.success("Check your email for a password reset link");
      }

      if (response.status != 200)
        return toast.error("Email account does not exist");
    } catch (error) {

    }

  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={25000}
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
                <Link href="/" className="mb-5 d-block auth-logo">
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
                </Link>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Forget Password</h5>
                    <p className="text-muted">
                      Enter the email address you used in registration.
                    </p>
                  </div>
                  <div className="p-2 mt-4">
                    <div className="row">
                      <div className="mb-3">
                        <label htmlFor="validationTooltip02">E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          id="validationTooltip02"
                          name="email"
                          value={email}
                          onChange={(e: any) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        <div className="invalid-tooltip">
                          Email address is required
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="validationTooltip02">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="validationTooltip02"
                          value={password}
                          onChange={(e: any) => {
                            setPassword(e.target.value);
                          }}
                          required
                        />
                        <div className="invalid-tooltip">
                          Password is required
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="validationTooltip02">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="validationTooltip02"
                          name="email"
                          value={email}
                          onChange={(e: any) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        <div className="invalid-tooltip">
                          Confirm password is required
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 align-self-center text-right">
                    <div className="d-flex justify-content-end align-items-center">
                      <button
                        className="btn btn-success"
                        type="submit"
                        onClick={(e: any) => {
                          e.preventDefault();
                          reset();
                        }}
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
      );
};

      export default ResetPassword;
