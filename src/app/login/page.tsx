"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const route = useRouter();
  const [user, setUser]: any = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  async function loginUp() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successfully");
      route.push("/profile");
    } catch (error: any) {
      toast.error(`Enter valid email and password ${error.message}`);
      setUser({ username: "", email: "", password: "" });
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('../../public/mountain.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <Toaster />
      <div className="flex flex-col justify-center border rounded-lg border-slate-500 h-[50vh] w-[320px] backdrop-blur-md">
      <div className="text-center mb-12 text-4xl text-slate-100 font-medium">
          <h1>{loading ? "Processing Data" : "Login"}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
          />
          <div className="flex flex-col">
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            maxLength={8}
            className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
          />
          <Link href={'/forget'} className="ml-32 text-blue-100 text-sm">Forget Password</Link>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
          {submitDisabled ? (
            <p className="m-3">Fill the login form first</p>
          ) : (
            <button
            className="p-1 mt-6 rounded-md text-black focus:bg-orange-200 bg-white w-56 hover:rounded-xl text-md"
            onClick={loginUp}
            >
              Login
            </button>
          )}
          <span className="mt-2">Don&apos;t have an account? <Link href={"/signup"} className="text-orange-200">Sign In</Link></span>
          </div>
      </div>
    </div>
  );
}
