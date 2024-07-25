'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'


export default function UserProfile() {
  const route = useRouter()
  const [userData , setUserData]:any = React.useState()

  async function userDetails() {
    
    try {
      const fetchedData:any = await axios.get('/api/users/about')
      setUserData(fetchedData.data.data)
      toast.success('Successfully user details fetched')
    } catch (error:any) {
      console.log(error.response.data.error)
      toast.error("Failed to get user details")
    }
  }

  async function logout() {
    try {
      await axios.get('/api/users/logout')
      toast.success('User logout')
      route.push("/login")
    } catch (error:any) {
      console.log(error.message)
      toast.error("Failed to logout")
    }
  }

  React.useEffect(()=>{
    userDetails()
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[url('../../public/nature.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <Toaster/>
      <button
          className="absolute top-4 right-4 px-6 py-1.5 rounded text-white focus:bg-red-400 hover:bg-red-500 border  hover:rounded-lg focus:outline-1 bg-transparent"
          onClick={logout}
          >Logout</button>
      <div className="flex flex-col justify-center border rounded-lg border-slate-500 h-[50vh] w-[320px] backdrop-blur-md">
      <h1 className='text-4xl text-yellow-100 text-center mb-12 font-medium'>User Profile</h1>
      <div className="flex flex-col items-center justify-center">
      {userData?<div className='text-orange-200 flex flex-col gap-2'>
        <h1>Username : {userData.username}</h1>
        <h1>Email : {userData.email}</h1>

        </div>:null}
      {userData?<div className='text-cyan-200 mt-2'>
        <Link href={`/profile/${userData._id}`}>
        User Id : {userData._id}
        </Link>
        </div>:null}
        </div>
          </div>
    </div>
  )
}

