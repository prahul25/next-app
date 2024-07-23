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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>{loading ? "Processing Data" : "Login"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="p-2 text-gray-700 rounded focus:outline-none focus:border-gray-400"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        maxLength={8}
        className="p-2 text-gray-700 rounded focus:outline-none focus:border-gray-400"
      />

      {submitDisabled ? (
        <p className="m-3">Fill the login form first</p>
      ) : (
        <button
          className="p-1 mt-3 rounded text-white focus:bg-teal-400"
          onClick={loginUp}
        >
          Logged In
        </button>
      )}
      <Link href={"/signup"}>Sign Up</Link>
    </div>
  );
}
