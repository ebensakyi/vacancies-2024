'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Router, { useRouter } from "next/router";

import Link from "next/link";
import Footer from "@/src/components/Footer";
import { signIn,signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams()

  const error = searchParams.get("error")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(async () => {
  //   gen = await genCode(20);
  //   core = await genCode(100);
  // });

  const login = async () => {
    try {
      if (email == "" || password == "")
        return toast.error("Please fill the form.");
      // const data = {
      //   email,
      //   password,
      // };
      // const response = await axios.post("/api/auth/login", {
      //   data,
      // });


      let result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/admin/dashboard"

      })

      console.log(result);

      setEmail("");
      setPassword("");

      // let { statusCode } = response.data;
      // let { message } = response.data;


      // if (statusCode == 0) {
      //   return toast.error(message);
      // } else if (statusCode == 1) {
      //   let { userType } = response.data.data;
      //   let { submitted } = response.data.data || "";

      //   let { recruitmentType } = response.data.data || "";


      // if (userType == 1) {
      //   Router.push("/admin/dashboard");
      //   return toast.success("Logged in successfully");
      // } else if (userType == 2) {
      //   Router.push("/admin/shortlist");
      //   return toast.success("Logged in successfully");
      // } else if (userType == 3) {
      //   Router.push("/admin/dashboard");
      //   return toast.success("Logged in successfully");
      // } else if (userType == 4) {


      //   if (submitted == true) {
      //     return Router.replace("/applicant/list");
      //   } else {
      //     return Router.replace("/applicant/personal?core=");
      //   }
      // }

    } catch (error) {
      console.log(error);
    }

    // else if (statusCode == 2) {
    //   Router.push("/applicant/personal");
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
                <Link href="/" className="mb-5 d-block auth-logo">
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
                </Link>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5"> {error == "CredentialsSignin" ? <div className="alert alert-danger bg-danger text-light border-0 alert-dismissible fade show" role="alert">
                    Wrong phone number or password
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div> : <></>}
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
                          <label htmlFor="validationTooltip02">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="validationTooltip02"
                            minLength={8}
                            name="password"
                            value={password}
                            required
                            onChange={(e: any) => {
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
                            onClick={(e: any) => {
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
                          Don`t have an account?
                          <Link href="/auth/register" className="fw-medium text-primary">

                            Register now
                          </Link>
                        </p>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          <Link href="/auth/forget-password" className="fw-medium text-primary">
                            Forget password ?
                          </Link>
                        </p>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted mb-0">
                          Back to open positions ?
                          <Link href="/" className="fw-medium text-primary">
                            {" "}
                            Home
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

export default Page;
