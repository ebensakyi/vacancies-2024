import cookie from "cookie";
import jwt from "jsonwebtoken";

let TOKEN_SECRET = process.env.TOKEN_SECRET
export const verifyToken = async (token: string) => {
    let verify = jwt.verify(token,TOKEN_SECRET);
    let userId = verify.id;
    return userId;
  };