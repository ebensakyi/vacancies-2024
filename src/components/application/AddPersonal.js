import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router, { useRouter } from "next/router";
import { genCode } from "../../util/generate-random";
import _ from "lodash";

export const AddPersonal = ({ _sex, _maritalStatus, personalData }) => {

console.log(personalData);

  const [title, setTitle] = useState("");

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [presentAddress, setPresentAddress] = useState("");

  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [hometown, setHometown] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [sonNumber, setSonNumber] = useState("");
  const [daughterNumber, setDaughterNumber] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otherNumber, setOtherNumber] = useState("");

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    setFirstName(personalData.firstName);
    setSurname(personalData.surname);
    setOtherNames(personalData.otherNames);
    setEmail(personalData.email);
    setPhone(personalData.phoneNumber);
    if (personalData.Personal) {
      setTitle(personalData.Personal.title);
      setPermanentAddress(personalData.Personal.permanentAddress);
      setPresentAddress(personalData.Personal.presentAddress);

      setOtherNumber(personalData.Personal.residenceTel);
      setHometown(personalData.Personal.hometown);
      setBirthPlace(personalData.Personal.birthPlace);
      setDob(personalData.Personal.dob);
      setSonNumber(personalData.Personal.sonNumber);
      setDaughterNumber(personalData.Personal.daughterNumber);

      setGender(personalData.Personal.sexId);
      setMaritalStatus(personalData.Personal.maritalStatusId);
    }
  }, []);

  const save = async () => {
    let core = await genCode(100);

    try {
      if (firstName == "" || surname == "")
        return toast.error("Please enter your first name and surname");
      if (maritalStatus == "")
        return toast.error("Please select your marital status");
     
      if (birthPlace == "")
        return toast.error("Please enter your place of birth");
      if (day == "" || month == "" || year == "")
        return toast.error("Please enter your date of birth");
        if (presentAddress == "") return toast.error("Please enter your present address");

      if (permanentAddress == "") return toast.error("Please enter your permanent address");
      if (gender == "") return toast.error("Please select your gender");
      if (hometown == "") return toast.error("Please enter your hometown");
      if (phone.length != 10)
        return toast.error("Please enter your a correct phone number");
      const data = {
        title: title?.trim(),
        firstName: firstName?.trim(),
        surname: surname?.trim(),
        otherNames: otherNames?.trim(),
        phone: phone?.trim(),
        //dob: new Date(moment(dob).format("DD-MM-YYYY")),
        dob: day + "-" + month + "-" + year,
        hometown: hometown?.trim(),
        birthPlace: birthPlace?.trim(),
        maritalStatusId: Number(maritalStatus),
        sexId: Number(gender),
        residenceTel: otherNumber,
        sonNumber:sonNumber?.trim(),
        daughterNumber:daughterNumber?.trim(),
        permanentAddress:permanentAddress?.trim(),
        presentAddress:presentAddress?.trim()

      };
      const response = await axios.post("/api/application/personal", {
        data,
      });

      let { statusCode } = response.data;
      let { message } = response.data;

      // let { isValid } = response.data.data;
      // if (!isValid)
      //   return toast.error("Complete this section before moving to next");

      if (statusCode == 1) {
        toast.success(message);
        return Router.push("/application/education?core=" + core);
      }

      if (statusCode == 0) return toast.error("Data could not be saved");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-xl-12">
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
              <div className="col-sm-3">
                <div className="form-group">
                  <label htmlFor="exampleInputuname">
                    Title <small>(Dr.,Mr.,Mrs etc)</small>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      id="title"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      data-error="Title is required."
                      defaultValue={title}
                      onChange={(e:any) => {
                        setTitle(e.target.value);
                      }}
                    />
                    <div className="invalid-tooltip">Title is required</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <label htmlFor="exampleInputuname">
                    First name <span style={danger}>*</span>
                  </label>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      data-error="First name is required."
                      defaultValue={firstName}
                      onChange={(e:any) => {
                        setFirstName(e.target.value);
                      }}
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
                      type="text"
                      className="form-control"
                      name="surname"
                      id="surname"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      required
                      data-error="Surname is required."
                      defaultValue={surname}
                      onChange={(e:any) => {
                        setSurname(e.target.value);
                      }}
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
                      type="text"
                      className="form-control"
                      name="otherNames"
                      id="otherNames"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      defaultValue={otherNames}
                      onChange={(e:any) => {
                        setOtherNames(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="sex">
                    {" "}
                    Sex : <span style={danger}>*</span>{" "}
                  </label>
                  <select
                    className="custom-select form-control"
                    required
                    name="sex"
                    id="sex"
                    value={gender}
                    onChange={(e:any) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option value>Select gender</option>
                    {_sex.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-tooltip">Gender is required</div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <label htmlFor="exampleInputuname">
                    Date of birth <span style={danger}>*</span>
                  </label>
                  <br />
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <select
                      className="form-control"
                      onChange={(e:any) => {
                        setDay(e.target.value);
                      }}
                    >
                      <option value="">Day</option>

                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                    <select
                      className="form-control"
                      onChange={(e:any) => {
                        setMonth(e.target.value);
                      }}
                    >
                      <option value="">Month</option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <select
                      className="form-control"
                      onChange={(e:any) => {
                        setYear(e.target.value);
                      }}
                    >
                      <option value="">Year</option>
                      <option value="1960">1960</option>
                      <option value="1961">1961</option>
                      <option value="1962">1962</option>
                      <option value="1963">1963</option>
                      <option value="1964">1964</option>
                      <option value="1965">1965</option>
                      <option value="1966">1966</option>
                      <option value="1967">1967</option>
                      <option value="1968">1968</option>
                      <option value="1969">1969</option>
                      <option value="1970">1970</option>
                      <option value="1971">1971</option>
                      <option value="1972">1972</option>
                      <option value="1973">1973</option>
                      <option value="1974">1974</option>
                      <option value="1975">1975</option>
                      <option value="1976">1976</option>
                      <option value="1977">1977</option>
                      <option value="1978">1978</option>
                      <option value="1979">1979</option>
                      <option value="1980">1980</option>

                      <option value="1981">1981</option>
                      <option value="1982">1982</option>
                      <option value="1983">1983</option>
                      <option value="1984">1984</option>
                      <option value="1985">1985</option>
                      <option value="1986">1986</option>
                      <option value="1987">1987</option>
                      <option value="1988">1988</option>
                      <option value="1989">1989</option>
                      <option value="1990">1990</option>
                      <option value="1991">1991</option>
                      <option value="1992">1992</option>
                      <option value="1993">1993</option>
                      <option value="1994">1994</option>
                      <option value="1995">1995</option>
                      <option value="1996">1996</option>
                      <option value="1997">1997</option>
                      <option value="1998">1998</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                     
                    </select>
                  </div>

                  {/* <input
                    type="date"
                    className="form-control"
                    id="dateBirth"
                    max="2005-05-11" //max="2014-05-20"
                    required
                    defaultValue={dob}
                    onChange={(e:any) => {
                      setDob(e.target.value);
                    }}
                  /> */}
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
                    onChange={(e:any) => {
                      setBirthPlace(e.target.value);
                    }}
                  />
                  <div className="invalid-tooltip">
                    Place of birth is required
                  </div>
                </div>
              </div>{" "}
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
                      onChange={(e:any) => {
                        setHometown(e.target.value);
                      }}
                    />
                    <div className="invalid-tooltip">Home town is required</div>
                  </div>
                </div>
              </div>
              
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
                  onChange={(e:any) => {
                    setPresentAddress(e.target.value);
                  }}
                />
                <div className="invalid-tooltip">
                  Present address is required
                </div>
              </div>{" "}
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
                      defaultValue={email}
                      onChange={(e:any) => {
                        setEmail(e.target.value);
                      }}
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
                      onChange={(e:any) => {
                        setPhone(e.target.value);
                      }}
                    />
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
                      defaultValue={otherNumber}
                      onChange={(e:any) => {
                        setOtherNumber(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
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
                  onChange={(e:any) => {
                    setPermanentAddress(e.target.value);
                  }}
                />
                <div className="invalid-tooltip">
                  Present address is required
                </div>
              </div>{" "}
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
                    onChange={(e:any) => {
                      setMaritalStatus(e.target.value);
                    }}
                  >
                    <option value>Select status</option>
                    {_maritalStatus.map((s) => (
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
              <div className="col-sm-3">
                <div className="form-group">
                  <label htmlFor="exampleInputuname">
                    Number of Sons & Ages <span style={danger}>*</span>
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
                      defaultValue={sonNumber}
                      onChange={(e:any) => {
                        setSonNumber(e.target.value);
                      }}
                    />
                    
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="form-group">
                  <label htmlFor="exampleInputuname">
                  Number of Daughters & Ages <span style={danger}>*</span>
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
                      defaultValue={daughterNumber}
                      onChange={(e:any) => {
                        setDaughterNumber(e.target.value);
                      }}
                    />
                     
                  </div>
                </div>
              </div>
             
           
            </div>

            <div className="form-actions mt-10" style={{ textAlign: "end" }}>
              <button
                className="btn btn-success add"
                type="button"
                onClick={(e:any) => {
                  e.preventDefault();
                  save();
                }}
              >
                Save and Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const danger = { color: "red" };
