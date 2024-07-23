"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function VerifyEmailPage() {
//   const router = useRouter();
  const [token, setToken] = React.useState("");
  const [userVerified, setUserVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  async function verifyUserEmail() {
    try {
      const response = await axios.post("api/users/verifyemail", { token });
          setUserVerified(true);
        setError(false)
      console.log(response , "resposen")
  
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  }
console.log(userVerified,"he ki nsi")
  React.useEffect(() => {
    //Two ways get token from url
    // first way
    const urlToken = window.location.search.split("=")[1] || "";
    setToken(urlToken);

    // Second way
    // const {query} = router
    // const urlToken:any = query.token
    // setToken(urlToken)
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl">Verify Your Email</h1>
      <button onClick={verifyUserEmail} className="p-2 mt-3 rounded text-white bg-teal-600 focus:bg-teal-400">Click here to verify your email</button>
      <h2 className="p-2 bg-orange-500 scale-x-50 text-black">{userVerified?`${token}`:'no token'}</h2>
      {userVerified && <div>
        <h2>User Verified successfully</h2>
        <Link href={'/login'}>Login</Link>
        </div>}
      {error && <div>
        <h2>Error madarchod</h2>
        </div>}
    </div>
  );
}

export default VerifyEmailPage;
