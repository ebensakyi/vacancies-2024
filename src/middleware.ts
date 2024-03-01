import { withAuth } from "next-auth/middleware"




import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: any) {
  
  const token = await getToken({ req: request, secret: process.env.TOKEN_SECRET });
  console.log("MW TOKEN ",token);
  


 //if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));

  // Check the role and redirect based on the role
  // switch (token?.role) {
    
  //   case 1:
  //     if (!request.nextUrl.pathname.startsWith("/profile")) {
  //       return NextResponse.redirect(new URL("/profile", request.url));
  //     }
  //     break;
  //   case 2:
  //     if (
  //       !request.nextUrl.pathname.startsWith("/patients") &&
  //       !request.nextUrl.pathname.startsWith("/patientprofile") &&
  //       !request.nextUrl.pathname.startsWith("/complain") &&
  //       !request.nextUrl.pathname.startsWith("/report")
  //     ) {
  //       return NextResponse.redirect(new URL("/patients", request.url));
  //     }
  //     break;
  //   case 3:
  //     // Add the paths that the nurse can access here
  //     if (!request.nextUrl.pathname.startsWith("/vitals")) {
  //       return NextResponse.redirect(new URL("/vitals", request.url));
  //     }
  //     break;
  //   case 4:
  //     // Add the paths that the pathologist can access here
  //     if (!request.nextUrl.pathname.startsWith("/image")) {
  //       return NextResponse.redirect(new URL("/image", request.url));
  //     }
  //     break;
  //   default:
  //    // return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login and api and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
}