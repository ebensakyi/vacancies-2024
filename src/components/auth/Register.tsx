"use client"
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import Footer from "../../components/Footer";
import { useRouter } from "next/navigation";

export const Register = () => {
    const router = useRouter()
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [otherNames, setOtherNames] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const save = async () => {
        try {
            if (
                firstName == "" ||
                surname == "" ||
                email == "" ||
                phoneNumber == "" ||
                password == "" ||
                confirmPassword == "" ||
                isNaN(Number(phoneNumber))
            )
                return toast.error(
                    "Please fill the form and make sure inputs are valid"
                );


            if (phoneNumber.length != 10 || phoneNumber.charAt(0) != "0")
                return toast.error("Please enter a valid phone number");
            if (validateEmail(email) == false)
                return toast.error("Please enter a valid email address");
            const data = {
                firstName,
                surname,
                otherNames,
                email,
                phoneNumber,
                password,
            };
            const response = await axios.post("/api/auth/register", {
                data,
            });
            if (response.status == 200) {
                toast.success("Data saved successfully");
                router.push("/auth/login");
                return
            }

            if (response.status == 201) {
                return toast.error("Email or phone number already exist");
            }

        } catch (error) {
            return toast.error("An error occurred");
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

            <div className="account-pages my-5 pt-sm-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <Link href="/" className="mb-5 d-block auth-logo">
                                    <img
                                        src="/logo.png"
                                        style={{ width: "80px", height: "80px" }}
                                    />

                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="card">
                                <div className="card-body p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">Register Account</h5>
                                        <p className="text-muted">Get your free account now.</p>
                                    </div>
                                    <div className="p-2 mt-4">
                                        <form method="POST">
                                            <div className="row">
                                                <div className="col-md-6 ">
                                                    <label htmlFor="validationTooltip01">
                                                        First name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationTooltip01"
                                                        name="firstName"
                                                        value={firstName}
                                                        onChange={(e: any) => {
                                                            setFirstName(e.target.value);
                                                        }}
                                                        required
                                                    />
                                                    <div className="invalid-tooltip">
                                                        First name is required
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="validationTooltip02">Surname</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationTooltip02"
                                                        name="surname"
                                                        value={surname}
                                                        onChange={(e: any) => {
                                                            setSurname(e.target.value);
                                                        }}
                                                        required
                                                    />
                                                    <div className="invalid-tooltip">
                                                        Surname is required
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label htmlFor="validationTooltip02">
                                                        Other name(s)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="validationTooltip02"
                                                        name="otherNames"
                                                        value={otherNames}
                                                        onChange={(e: any) => {
                                                            setOtherNames(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mb-3  col-md-6">
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
                                                <div className="mb-3  col-md-6">
                                                    <label htmlFor="validationTooltip02">
                                                        Phone number
                                                    </label>
                                                    <input
                                                        id="input-mask"
                                                        type="number"
                                                        className="form-control"
                                                        value={phoneNumber}
                                                        maxLength={10}
                                                        placeholder="Phone number"
                                                        onChange={(e: any) => {
                                                            setPhoneNumber(e.target.value);
                                                        }}
                                                        required
                                                    />
                                                    <small>Should be in this format (0540000000)</small>
                                                    <div className="invalid-tooltip">
                                                        Phone number is required
                                                    </div>
                                                </div>
                                                <div className="mb-3  col-md-6">
                                                    <label htmlFor="validationTooltip02">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="validationTooltip02"
                                                        minLength={8}
                                                        name="password"
                                                        value={password}
                                                        onChange={(e: any) => {
                                                            setPassword(e.target.value);
                                                            if (password.length + 1 >= 8) {
                                                                setIsValid(true);
                                                            } else {
                                                                setIsValid(false);
                                                            }
                                                        }}
                                                        required
                                                    />
                                                    <small>
                                                        Password should be at least 8 characters
                                                    </small>
                                                    <div className="invalid-tooltip">
                                                        Password is required(Should be at least 8
                                                        characters)
                                                    </div>
                                                </div>
                                                <div className="mb-3  col-md-6">
                                                    <label htmlFor="validationTooltip02">
                                                        Confirm Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="validationTooltip02"
                                                        minLength={8}
                                                        name="confirmPassword"
                                                        value={confirmPassword}
                                                        onChange={(e: any) => {
                                                            setConfirmPassword(e.target.value);
                                                            if (password === confirmPassword) {
                                                                setPasswordsMatch(true);
                                                            } else {
                                                                setPasswordsMatch(false);
                                                            }
                                                        }}
                                                        required
                                                    />
                                                    {password === confirmPassword ? (
                                                        <span className="badge rounded-pill bg-success">
                                                            Passwords match{" "}
                                                        </span>
                                                    ) : (
                                                        <span className="badge rounded-pill bg-danger">
                                                            Passwords do not match{" "}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-12 align-self-center text-right">
                                                <div className="d-flex justify-content-end align-items-center">
                                                    <button
                                                        disabled={!passwordsMatch && !isValid}
                                                        className="btn btn-success"
                                                        type="button"
                                                        onClick={(e: any) => {
                                                            e.preventDefault();
                                                            save();
                                                        }}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="text-muted mb-0">
                                                    Already have an account ?
                                                    <Link href="/auth/login" className="fw-medium text-primary">

                                                        Login
                                                    </Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>{" "}
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

function validateEmail(email: any) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
