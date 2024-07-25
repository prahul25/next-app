"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

function VerifyEmailPage() {
//   const router = useRouter();
  const [token, setToken] = React.useState("");
  const [userVerified, setUserVerified] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disableBtn , setDisableBtn] = React.useState(true)

  async function verifyUserEmail() {
    try {
      setLoading(true)
      setMsg(true)
      console.log('adar ja toh raha ahw')
      await axios.post("api/users/verifyemail", { token });
      setUserVerified(true);
      toast.success('User successfully verified')
      setLoading(false)
      setDisableBtn(false)
  
    } catch (error: any) {
      setLoading(false)
      setMsg(false);
      toast.error(error.response.data.error);
    }
  }

  React.useEffect(() => {
    //Two ways get token from url
    // first way
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);
console.log(urlToken, "url token")
    // Second way
    // const {query} = router
    // const urlToken:any = query.token
    // setToken(urlToken)
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('../../public/night.jpg')]  bg-cover bg-center bg-fixed">
      <Toaster/>
      <div className="flex flex-col justify-between border rounded-lg border-slate-500 h-[50vh] w-[320px] backdrop-blur-md">
        <div className="text-center mt-6">
      <h1 className="text-3xl">Verify Your Email</h1>
      <h1 className="text-lg mt-2" >Click below button to verify your email</h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-1 mt-4 mb-16">
    {loading && <h1>Processing Data</h1>}

      {disableBtn && <button onClick={verifyUserEmail} className="p-2 mt-3 rounded text-white bg-[#0082a4] focus:bg-[#003859]">Verify your email</button>}
      {msg && <h1 className="text-lg mt-1 text-center" >If user verified successfully token would be visible</h1>}

      <h2 className="p-2 bg-[#f28697] rounded-3xl scale-x-50 text-black">{userVerified?`${token}`:'no token'}</h2>
      {userVerified && <div>
        <h2>User Verified successfully</h2>
        <Link href={'/login'} className="text-[#44b8b8]">Login</Link>
        </div>}
      
        </div>
        </div>
    </div>
  );
}

export default VerifyEmailPage;
