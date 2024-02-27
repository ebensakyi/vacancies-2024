import moment from "moment";
import _ from "lodash";
export const calculateExperience = (workYears: any) => {
  let days = calculateDays(workYears);

  return _.round(days / 365, 1);
};

const calculateDays = (emp: any[]) => {
  //console.log("workYears-->",emp)
  let years = 0;
  emp.map((workYear: { start: string; end: string | string[]; createdAt: string; }) => {
    // console.log("WY",workYear);
    let _end = "";
    let _start = workYear.start + "-01";
    if (workYear.end.includes("date")) {
      _end = workYear.createdAt;
    } else {
      _end = workYear.end + "-01";
    }

    let start = moment(_start, "YYYY-MM-DD");
    let end = moment(_end, "YYYY-MM-DD");

    let days = moment.duration(end.diff(start)).asDays();
    years = years + Number(days);

    // return Math.floor(years / 365);
  });
  return Math.abs(years);
};
