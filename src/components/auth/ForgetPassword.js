/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import MyHead from "../Head";
import Footer from "../Footer";

const ForgetPassword = () => {
  const [email, setEmail] = useState();

 

  const forget = async () => {
    try {
      if (email == null) return toast.error("Please fill the form");
      const data = {
        email,
      };
      const response = await axios.post("/api/auth/forget-password", {
        data,
      });

      setEmail("");
      if (response.status == 1) {
        // Router.push("/auth/reset-password");
        return toast.success("Check your email for a password reset link");
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
                    <h5 className="text-primary">Forget Password</h5>
                    <p className="text-muted">
                      Enter the email address you used in registration.
                    </p>
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
                      </div>

                      <div className="col-md-12 align-self-center text-right">
                        <div className="d-flex justify-content-end align-items-center">
                          <button
                            className="btn btn-success"
                            type="submit"
                            onClick={(e:any) => {
                              e.preventDefault();
                              forget();
                            }}
                          >
                            Send reset email
                          </button>
                        </div>
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

export default ForgetPassword;
