// import React, { useState, useEffect } from "react";

// const PasswordController = ({
//   password,
//   length,
//   mustHaveUpperCase,
//   mustHaveLowerCase,
//   mustHaveSymbol,
//   mustHaveNumber,
//   isValidated,
// }) => {
// //   const [currentLength, setCurrentLength] = useState(0);
// //   const [lengthValidated, setLengthValidated] = useState(false);
// //   const [uppercaseValidated, setUppercaseValidated] = useState(false);
// //   const [lowercaseValidated, setLowercaseValidated] = useState(false);
// //   const [symbolValidated, setsymbolValidated] = useState(false);
// //   const [number, setNumber] = useState(false);
// let _password = password || ""
//   useEffect(() => {
//     if (
//         hasNumber(_password) &&
//         hasUpperCase(_password) &&
//         hasLowerCase(_password) &&
//         hasSymbol(_password) &&
//         (_password.length >= length)
//       ) {
//         return isValidated(true);
//       } else {
//         return isValidated(false);
//       }
//   }, [_password]);

//   // console.log("Password==> ", password);
//   const notValidated = "badge rounded-pill bg-secondary";
//   const validated = "badge rounded-pill bg-success";

//   function hasNumber(myString: string) {
//     return /\d/.test(myString);
//   }
//   function hasSymbol(myString: string) {
//     const format = /[!@#$%^&*~`()_+\-=\[\]{};':"\\|,.<>\/?]+/;
//     return format.test(myString) ? true : false;
//   }
//   function hasLowerCase(myString: string) {
//     return /[a-z]/.test(myString);
//   }
//   function hasUpperCase(myString: string) {
//     return /[A-Z]/.test(myString);
//   }

//   return (
//     <div>
//       <span className={_password.length >= length ? validated : notValidated}>
//         {" "}
//         A least {length} characters
//       </span>
//       {mustHaveUpperCase ? (
//         <span className={hasUpperCase(_password) ? validated : notValidated}>
//           {" "}
//           An uppercase{" "}
//         </span>
//       ) : (
//         ""
//       )}
//       {mustHaveLowerCase ? (
//         <span className={hasLowerCase(_password) ? validated : notValidated}>
//           {" "}
//           A lowercase{" "}
//         </span>
//       ) : (
//         ""
//       )}
//       {mustHaveSymbol ? (
//         <span className={hasSymbol(_password) ? validated : notValidated}>
//           A symbol{" "}
//         </span>
//       ) : (
//         ""
//       )}
//       {mustHaveNumber ? (
//         <span className={hasNumber(_password) ? validated : notValidated}>
//           {" "}
//           A number{" "}
//         </span>
//       ) : (
//         ""
//       )}
//       {/* <small>
//         Password should be 8 characters including a ; a capital letter,a small
//         letter, a number and a special character(~,?,$,% etc)
//       </small> */}
//     </div>
//   );
// };

// export default PasswordController;
