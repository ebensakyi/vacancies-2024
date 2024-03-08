
"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { redirect, useRouter } from "next/navigation";
import ApplicationMenu from "../ApplicationMenu";
import { useSession } from "next-auth/react";
import { LOGIN_URL } from "@/constants";
import moment from "moment";
import Link from "next/link";

const PersonalInfo = ({ data }: any) => {
    console.log(data);
    
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect(LOGIN_URL);
        }
    })


    let user: any = session?.user



    const router = useRouter()
    const [personalInfoId, setPersonalInfoId] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [otherNames, setOtherNames] = useState("");
    const [permanentAddress, setPermanentAddress] = useState("");
    const [presentAddress, setPresentAddress] = useState("");
    const [title, setTitle] = useState("");

    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [hometown, setHometown] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [sonsInfo, setSonsInfo] = useState("");
    const [daughtersInfo, setDaughtersInfo] = useState("");
    const [childrenNumber, setChildrenNumber] = useState("");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [haveKids, setHaveKids] = useState("");
    const [residenceTel, setResidenceTel] = useState("");

    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
console.log(">>>>>>>>>>>",data?.personalInfo?.response);


        setPersonalInfoId(data?.personalInfo?.response?.id)
        setSurname(user?.surname)
        setFirstName(user?.firstName)
        setOtherNames(user?.otherNames)

        setPhone(user?.phone)
        setPermanentAddress(data?.personalInfo?.response?.permanentAddress)
        setPresentAddress(data?.personalInfo?.response?.presentAddress)
        setDob(data?.personalInfo?.response?.dob)
        setGender(data?.personalInfo?.response?.sexId)
        setHometown(data?.personalInfo?.response?.hometown)
        setMaritalStatus(data?.personalInfo?.response?.maritalStatusId)

        setBirthPlace(data?.personalInfo?.response?.birthPlace)
        setChildrenNumber(data?.personalInfo?.response?.childrenNumber)
        setSonsInfo(data?.personalInfo?.response?.sonsInfo)
        setDaughtersInfo(data?.personalInfo?.response?.daughtersInfo)
        setHaveKids(data?.personalInfo?.response?.haveKids)
        setResidenceTel(data?.personalInfo?.response?.residenceTel)
        setTitle(data?.personalInfo?.response?.titleId)

    }, [])




    const save = async () => {

        try {
            if (title == "")
                return toast.error("Please select your title");
            if (firstName == "" || surname == "")
                return toast.error("Please enter your first name and surname");
            if (gender == "")
                return toast.error("Please select your gender");
            if (maritalStatus == "")
                return toast.error("Please select your marital status");
            if (dob == "")
                return toast.error("Please enter your date of birth");
            if (birthPlace == "")
                return toast.error("Please enter your place of birth");

            if (birthPlace == "") return toast.error("Please enter your place of birth");
            if (presentAddress == "") return toast.error("Please enter your present address");

            if (permanentAddress == "") return toast.error("Please enter your permanent address");
            if (gender == "") return toast.error("Please select your gender");
            if (hometown == "") return toast.error("Please enter your hometown");
            // if (phone.length != 10)
            //     return toast.error("Please enter your a correct phone number");
            const data = {
                id: personalInfoId,
                title: title,
                firstName: firstName?.trim(),
                surname: surname?.trim(),
                otherNames: otherNames?.trim(),
                phone: phone?.trim(),
                dob: new Date(dob),

                //dob: new Date(moment(dob).format("DD-MM-YYYY")),
                // dob: day + "-" + month + "-" + year,
                hometown: hometown?.trim(),
                birthPlace: birthPlace?.trim(),
                maritalStatusId: Number(maritalStatus),
                sexId: Number(gender),
                residenceTel: residenceTel,
                childrenNumber: childrenNumber,
                sonsInfo: sonsInfo?.trim(),
                daughtersInfo: daughtersInfo?.trim(),
                permanentAddress: permanentAddress?.trim(),
                presentAddress: presentAddress?.trim(),
                haveKids: haveKids
            };

            console.log(data);
            

            let response
            if (personalInfoId == null) {
                response = await axios.post("/api/applicant/personal", {
                    data,
                });

            } else {
                response = await axios.put("/api/applicant/personal", {
                    data,
                });
            }

            console.log(response);

            let { status } = response;



            if (status == 200) {
                toast.success("Personal info saved");
                return router.push("/applicant/education?core=");
            }

            if (status != 200) return toast.error("Data could not be saved");
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div id="layout-wrapper">
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">PERSONAL INFO</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <ApplicationMenu whichLink="personal" />

                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />

                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">PERSONAL</h4>
                                </div>
                                <div className="card-body">
                                    <span className="badge bg-success" style={{ padding: 10 }}>
                                        Fill all fields with (<span style={danger}>*</span>). Click on save
                                        and proceed button to move to next section
                                    </span>

                                    <form method="post">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="title">
                                                        {" "}
                                                        Title <small>(Dr.,Mr.,Mrs etc)</small>
                                                    </label>
                                                    <select
                                                        className="custom-select form-control"
                                                        required
                                                        name="title"
                                                        id="title"
                                                        value={title}
                                                        onChange={(e: any) => {
                                                            setTitle(e.target.value);
                                                        }}
                                                    >
                                                        <option >Select title</option>
                                                        {data?.titles?.response?.map((s: any) => (
                                                            <option key={s.id} value={s.id}>
                                                                {s.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-tooltip">Title is required</div>
                                                </div>
                                            </div>

                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">
                                                        First name <span style={danger}>*</span>
                                                    </label>
                                                    <div className="input-group mb-3">
                                                        <input
                                                            readOnly

                                                            type="text"
                                                            className="form-control"
                                                            name="firstName"
                                                            aria-label="Username"
                                                            aria-describedby="basic-addon1"
                                                            required
                                                            data-error="First name is required."
                                                            defaultValue={firstName}
                                                            onChange={(e: any) => {
                                                                setFirstName(e.target.value);
                                                            }}
                                                            value={user?.firstName}
                                                        />
                                                        <div className="invalid-tooltip">
                                                            First name is required
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">
                                                        Surname <span style={danger}>*</span>
                                                    </label>
                                                    <div className="input-group mb-3">
                                                        <input
                                                            readOnly

                                                            type="text"
                                                            className="form-control"
                                                            name="surname"
                                                            id="surname"
                                                            aria-label="Username"
                                                            aria-describedby="basic-addon1"
                                                            required
                                                            data-error="Surname is required."
                                                            defaultValue={surname}
                                                            onChange={(e: any) => {
                                                                setSurname(e.target.value);
                                                            }}
                                                            value={surname}

                                                        />
                                                        <div className="invalid-tooltip">Surname is required</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">Other name(s)</label>
                                                    <div className="input-group mb-3">
                                                        <input
                                                            readOnly

                                                            type="text"
                                                            className="form-control"
                                                            name="otherNames"
                                                            id="otherNames"
                                                            aria-label="Username"
                                                            aria-describedby="basic-addon1"
                                                            defaultValue={otherNames}
                                                            onChange={(e: any) => {
                                                                setOtherNames(e.target.value);
                                                            }}
                                                            value={user?.otherNames}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">
                                                        Email Address <span style={danger}>*</span>
                                                    </label>
                                                    <div className="input-group mb-3">
                                                        <input
                                                            readOnly
                                                            type="text"
                                                            className="form-control email-inputmask"
                                                            name="emailAddress"
                                                            required
                                                            id="emailAddress"
                                                            aria-label="Username"
                                                            aria-describedby="basic-addon1"
                                                            data-error="Number of children is required."
                                                            onChange={(e: any) => {
                                                                setEmail(e.target.value);
                                                            }}
                                                            value={user?.email}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">
                                                        Phone Number <span style={danger}>*</span>
                                                    </label>
                                                    <div className="input-group mb-3">
                                                        <input
                                                            readOnly
                                                            type="number"
                                                            className="form-control phone-inputmask"
                                                            name="phoneNumber"
                                                            required
                                                            id="phoneNumber"
                                                            aria-label="Username"
                                                            aria-describedby="basic-addon1"
                                                            data-error="Number of children is required."
                                                            defaultValue={phone}
                                                            onChange={(e: any) => {
                                                                setPhone(e.target.value);
                                                            }}
                                                            value={user?.phoneNumber}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="sex">
                                                        {" "}
                                                        Gender : <span style={danger}>*</span>{" "}
                                                    </label>
                                                    <select
                                                        className="custom-select form-control"
                                                        required
                                                        name="sex"
                                                        id="sex"
                                                        value={gender}
                                                        onChange={(e: any) => {
                                                            setGender(e.target.value);
                                                        }}
                                                    >
                                                        <option >Select gender</option>
                                                        {data?.sexes?.response?.map((s: any) => (
                                                            <option key={s.id} value={s.id}>
                                                                {s.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-tooltip">Gender is required</div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="maritalStatus">
                                                        {" "}
                                                        Marital status : <span style={danger}>*</span>{" "}
                                                    </label>
                                                    <select
                                                        className="custom-select form-control"
                                                        required
                                                        name="maritalStatus"
                                                        id="maritalStatus"
                                                        value={maritalStatus}
                                                        onChange={(e: any) => {
                                                            setMaritalStatus(e.target.value);
                                                        }}
                                                    >
                                                        <option >Select status</option>
                                                        {data?.maritalStatuses?.response?.map((s: any) => (
                                                            <option key={s.id} value={s.id}>
                                                                {s.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-tooltip">
                                                        Marital status is required
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">
                                                        Date of birth <span style={danger}>*</span>
                                                    </label>
                                                    <br />
                                                   

                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="dateBirth"
                                                        max="2005-05-11" //max="2014-05-20"
                                                        required
                                                        defaultValue={dob?.split('T')[0]}
                                                        onChange={(e: any) => {
                                                            setDob(e.target.value);
                                                        }}
                                                    />
                                                    <div className="invalid-tooltip">
                                                        Date of birth is required
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">
                                                        Place of birth <span style={danger}>*</span>
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="birthPlace"
                                                        id="birthPlace"
                                                        paria-label="Username"
                                                        aria-describedby="basic-addon1"
                                                        required
                                                        data-error="Place of birth is required."
                                                        defaultValue={birthPlace}
                                                        onChange={(e: any) => {
                                                            setBirthPlace(e.target.value);
                                                        }}
                                                    />
                                                    <div className="invalid-tooltip">
                                                        Place of birth is required
                                                    </div>
                                                </div>
                                            </div>{" "}
                                            <div className="col-sm-3">
                                                <label htmlFor="exampleInputuname">
                                                    Present address <span style={danger}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="presentAddress"
                                                    id="presentAddress"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                    required
                                                    data-error="Present Address is required."
                                                    defaultValue={presentAddress}
                                                    onChange={(e: any) => {
                                                        setPresentAddress(e.target.value);
                                                    }}
                                                />
                                                <div className="invalid-tooltip">
                                                    Present address is required
                                                </div>
                                            </div>{" "}
                                            <div className="col-sm-3">
                                                <label htmlFor="exampleInputuname">
                                                    Permanent address <span style={danger}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="permanentAddress"
                                                    id="permanentAddress"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                    required
                                                    data-error="Present Address is required."
                                                    defaultValue={permanentAddress}
                                                    onChange={(e: any) => {
                                                        setPermanentAddress(e.target.value);
                                                    }}
                                                />
                                                <div className="invalid-tooltip">
                                                    Present address is required
                                                </div>
                                            </div>{" "}
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">
                                                        Nationality <span style={danger}>*</span>
                                                    </label>
                                                    <div className="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="homeTown"
                                                            id="hometown"
                                                            placeholder="State of origin in case of Nigerians"
                                                            aria-label="Username"
                                                            aria-describedby="basic-addon1"
                                                            required
                                                            data-error="Hometown is required."
                                                            defaultValue={hometown}
                                                            onChange={(e: any) => {
                                                                setHometown(e.target.value);
                                                            }}
                                                        />
                                                        <div className="invalid-tooltip">Home town is required</div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-sm-3">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputuname">Other Tel. number(s)</label>
                                                    <div className="input-group mb-3">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="residenceTel"
                                                            id="residenceTel"
                                                            aria-label="Username"
                                                            aria-describedby="basic-addon1"
                                                            defaultValue={residenceTel}
                                                            onChange={(e: any) => {
                                                                setResidenceTel(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label htmlFor="haveKids">
                                                        {" "}
                                                        Do you have any kids: <span style={danger}>*</span>{" "}
                                                    </label>
                                                    <select
                                                        className="custom-select form-control"
                                                        required
                                                        name="haveKids"
                                                        id="haveKids"
                                                        value={haveKids}
                                                        onChange={(e: any) => {
                                                            setHaveKids(e.target.value);
                                                        }}
                                                    >
                                                        <option >Select </option>
                                                        {data?.yesNo?.response?.map((s: any) => (
                                                            <option key={s.id} value={s.id}>
                                                                {s.value}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <div className="invalid-tooltip">
                                                        Children is required
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {haveKids == "1" ?
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputuname">
                                                            Number of children
                                                        </label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type="number"
                                                                className="form-control"

                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                required
                                                                data-error="Number of children is required."
                                                                defaultValue={childrenNumber}
                                                                onChange={(e: any) => {
                                                                    setChildrenNumber(e.target.value);
                                                                }}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputuname">
                                                            Number of Sons & Ages
                                                        </label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="sonNumber"
                                                                id="sonNumber"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                required
                                                                data-error="Number of children is required."
                                                                defaultValue={sonsInfo}
                                                                onChange={(e: any) => {
                                                                    setSonsInfo(e.target.value);
                                                                }}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputuname">
                                                            Number of Daughters & Ages
                                                        </label>
                                                        <div className="input-group mb-3">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="daughterNumber"
                                                                id="daughterNumber"
                                                                aria-label="daughterNumber"
                                                                aria-describedby="basic-addon1"
                                                                required
                                                                defaultValue={daughtersInfo}
                                                                onChange={(e: any) => {
                                                                    setDaughtersInfo(e.target.value);
                                                                }}
                                                            />

                                                        </div>
                                                    </div>
                                                </div>


                                            </div> : <></>}

                                        <div className="form-actions mt-10" style={{ textAlign: "end" }}>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <Link href="/applicant/essay" type="button" className="btn btn-success">
                                                    Previous
                                                </Link>
                                                <button
                                                    className="btn btn-success add"
                                                    type="button"
                                                    onClick={(e: any) => {
                                                        e.preventDefault();
                                                        save();
                                                    }}
                                                >
                                                    Next
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
        </div>)
};
const danger = { color: "red" };
export default PersonalInfo;
