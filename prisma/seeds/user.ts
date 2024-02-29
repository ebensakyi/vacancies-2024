import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

export const superAdmin = [
  {
    firstName: "Ebenezer",
    surname: "Sakyi",
    otherNames: "Agyemang",
    email: "easakyi@waecgh.org",
    phoneNumber: "0543212322",
    password: bcrypt.hashSync("Kofi@2318.com", salt),
    userRoleId: 1,
    departmentId: 1
  },
  {
    firstName: "Iphigenia",
    surname: "Tetteh",
    otherNames: "",
    email: "itetteh@waecgh.org",
    phoneNumber: "0242",
    password: bcrypt.hashSync("1T3tt3hATw@_!k", salt),
    userRoleId: 1, departmentId: 15
  },
  {
    firstName: "Andrews",
    surname: "Ahene",
    otherNames: "A",
    email: "aaahene@waecgh.org",
    phoneNumber: "__",
    password: bcrypt.hashSync("@_@H3n3hATw@_!kGh", salt),
    userRoleId: 1, departmentId: 15
  },
  {
    firstName: "Mary",
    surname: "Quansah",
    otherNames: "",
    email: "maquansah@waecgh.org",
    phoneNumber: "050__",
    password: bcrypt.hashSync("M@Q4@n5@hATw@_!k", salt),
    userRoleId: 1, departmentId: 15
  },

];
