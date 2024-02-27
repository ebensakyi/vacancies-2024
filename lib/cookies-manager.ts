import cookie from "cookie";
import prisma from "../prisma/MyPrismaClient";
import { verifyToken } from "./token-verifier"

export const setUserCookie = async (token, req, res) => {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3 * 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );
  } catch (error) {
    console.log(">>>>>>>>>>", error);
  }
};



export const setAccessiblePositionCookie = async (access, userType, req, res) => {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("access", access, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3 * 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );


    return res.status(200).json({
      statusCode: 1,
      data: { userType },
      message: "Logged in",
    });
  } catch (error) {
    console.log(">>>>>>>>>>", error);
  }
};

export const clearUserCookie = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: -1,
      sameSite: "strict",
      path: "/",
    })
  );
};

// export const setUserTypeCookie = async (userType, res) => {
//   try {
//     res.setHeader(
//       "Set-Cookie",
//       cookie.serialize("ut", userType, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV !== "development",
//         maxAge: 60 * 60,
//         sameSite: "strict",
//         path: "/",
//       })
//     );
//   } catch (error) {
//     console.log(">>>>>>>>>>", error);
//   }
// };

export const getUserCookie = async (req, res) => {
  try {
    let cookies = cookie.parse(req.headers.cookie || "");
    let token = cookies.token;

    if (token) return verifyToken(token);

    // return -1;
  } catch (error) {
    console.log(">>>>>>>>>>", error);
  }
};



// export const setJobSession = async (jobId) => {
//   try {
//     cookie.serialize("jobId", jobId, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV !== "development",
//       maxAge: 7 * 60 * 60,
//       sameSite: "strict",
//       path: "/",
//     });
//   } catch (error) {}
// };

export const isSubmitted = async (userId, res) => {
  let count = await prisma.application.count({
    where: { userId, submitted: 1 },
  });

  if (count != 0)
    return res.setHeader(
      "Set-Cookie",
      cookie.serialize("__________d", true, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3 * 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );
  return res.setHeader(
    "Set-Cookie",
    cookie.serialize("__________d", false, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 3 * 60 * 60,
      sameSite: "strict",
      path: "/",
    })
  );;
};
