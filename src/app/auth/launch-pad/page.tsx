'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Router, { useRouter } from "next/router";

import Link from "next/link";
import Footer from "@/src/components/Footer";
import { signIn, useSession } from "next-auth/react";

const launch_pad = () => {
  const {data: session}:any = useSession()

  let sess = session?.user

  return <h1>{sess}</h1>
};

export default launch_pad;
