"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Forget() {
  const route = useRouter();
  const [email, setEmail]: any = React.useState("");

  
  const [loading, setLoading] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  
  async function forget() {
      try {
      setLoading(true);
      await axios.post("/api/users/verifyuser",{email});
      toast.success("We have sended forgot password link on mail");
      setEmail("");
    } catch (error: any) {
      toast.error(error.response.data.error);
      setEmail("");
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (email.length > 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [email]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('../../public/mountain.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <Toaster />
      <div className="flex flex-col justify-center border rounded-lg border-slate-500 h-[50vh] w-[320px] backdrop-blur-md">
      <div className="text-center mb-12 text-4xl text-slate-100 font-medium">
          <h1>{loading ? "Processing Data" : "Forget Password"}</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value )}
            placeholder="Email"
            className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
          />
          
          {submitDisabled ? (
            <p className="m-3">Fill the forget form first</p>
          ) : (
            <button
            className="p-1 m-2 rounded-md text-black focus:bg-orange-200 bg-blue-100 w-56 hover:rounded-xl text-md"
            onClick={forget}
            >
              Confirm
            </button>
          )}
        </div>
        <div className="text-center text-orange-700">
          Want to login? <Link href={"/login"} className="text-blue-600">Login</Link>
          </div>
      </div>
    </div>
  );
}
