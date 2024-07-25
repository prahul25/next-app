"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ForgetPassword() {
  const route = useRouter()
  const [credential, setCredential]:any = React.useState({
    password: "",
    confirmPassword: "",
    urlToken:""
  });
  const [customErr, setCustomErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const userData = {
    token: credential.urlToken,
    password: credential.password,
  };

  async function submitPassword() {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", userData);
      toast.success("Your password updated successfully");
      route.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.error);
      setCredential({confirmPassword:'', password: "" });
      setLoading(false);
    }
  }

  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if(!token){
      route.push('/login')
    }
    if (token) {
      setCredential((prev:any) => ({ ...prev, urlToken: token }));
    }
  }, []);

  React.useEffect(() => {
    console.log(credential)
    
    if(credential.password.length > 0 && credential.confirmPassword.length > 0){
      if(credential.password === credential.confirmPassword){

        setSubmitDisabled(false)
        setCustomErr(false);
      }
    }else if(credential.password !== credential.confirmPassword){
      setCustomErr(true)
      setSubmitDisabled(true)
    }else{
      setSubmitDisabled(true)
    }
  
  }, [credential]);
  return <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('../../public/himalayas.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
  <Toaster />
  <div className="flex flex-col justify-center border rounded-lg border-slate-500 h-[50vh] w-[320px] backdrop-blur-md">
  <div className="text-center mb-12 text-3xl text-slate-100 font-medium">
      <h1>{loading ? "Processing Data" : "Reset Password"}</h1>
    </div>
    <div className="flex flex-col items-center justify-center gap-6">
      <input
        type="password"
        value={credential.password}
        onChange={(e) => setCredential({ ...credential, password: e.target.value })}
        placeholder="Password"
        maxLength={8}
        className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
      />
      
      <input
        type="password"
        value={credential.confirmPassword}
        onChange={(e) => setCredential({ ...credential, confirmPassword: e.target.value })}
        placeholder="Confirm Password"
        maxLength={8}
        className="p-2 text-gray-900 border border-white  rounded-lg focus:outline-none focus:border-orange-200 bg-transparent placeholder-gray-900"
      />
      {customErr ? <h2 className="text-red-500 text-center text-sm ml-10">Password and confirm password must be same</h2>:null}
    </div>
    <div className="flex flex-col justify-start items-center">
      {submitDisabled ? (
        null
      ) : (
        <button
        className="p-1 mt-6 rounded-md text-black focus:bg-orange-200 bg-white w-56 hover:rounded-xl text-md"
        onClick={submitPassword}
        >
          Submit
        </button>
      )}

      </div>
  </div>
</div>
}
