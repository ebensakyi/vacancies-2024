import moment from "moment";
export const calculateAge = (dob) => {
  if (dob.charAt(2) == "-") {
    let start = moment(dob, "DD-MM-YYYY");
    let end = moment("24-12-2021", "DD-MM-YYYY");

    let days = moment.duration(end.diff(start)).asDays();
    return Math.floor(days / 365);
  }

  let start = moment(dob, "YYYY-MM-DD");
  let end = moment("2021-12-24", "YYYY-MM-DD");

  let days = moment.duration(end.diff(start)).asDays();
  return Math.floor(days / 365);

  // let start = moment("2018-03-10", "YYYY-MM-DD");
  // let end = moment("2018-03-15", "YYYY-MM-DD");

  // //Difference in number of days
  // moment.duration(start.diff(end)).asDays();
};
