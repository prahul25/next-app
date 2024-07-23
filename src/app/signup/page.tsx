"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
// import landscape from '../../../public/landscape.jpg'
import Image from "next/image";

export default function SignupPage() {
  const route = useRouter();
  const [user, setUser]: any = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  async function signUp() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup successfull", response);
      toast.success("Sign Up successfully");
      route.push("/login");
    } catch (error: any) {
      toast.error(`Enter valid email and password ${error.message}`);
      setUser({ username: "", email: "", password: "" });
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('../../public/landscape.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <Toaster />

      <div className="flex flex-col justify-center border rounded-lg border-slate-500 h-[50vh] w-1/4 backdrop-blur-md">
        <div className="text-center mb-8 text-3xl text-slate-100 font-medium">
          <h1>{loading ? "Processing Data" : "Sign up"}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
            className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
          />
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
          />

          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            maxLength={8}
            className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
          />
        </div>

        {/* <label htmlFor="username">Username</label> */}
        {/* <label htmlFor="password">Password</label> */}

        <div className="flex flex-col justify-start items-center">
          {submitDisabled ? (
            <p className="m-3">Fill the sign up form first</p>
          ) : (
            <button
              className="p-1 mt-6 rounded-md text-black focus:bg-orange-200 bg-white w-56 hover:rounded-xl text-md"
              onClick={signUp}
            >
              Signup
            </button>
          )}

          <span>Already have an account? <Link href={"/login"} className="text-orange-200">Log In</Link></span>
        </div>
      </div>
    </div>
  );
}
