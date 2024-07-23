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
      console.log(error.message)
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
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Toaster/>
      <h1 className='text-2xl text-yellow-100'>User Profile</h1>
      {userData?<div className='text-orange-200'>
        Username : {userData.username}
        Email : {userData.email}
        User Id : {userData._id}
        </div>:null}
      {userData?<h2 className='text-cyan-200'>
        <Link href={`/profile/${userData._id}`}>
        Username : {userData._id}
        </Link>
        </h2>:null}
      <button
          className="p-1 mt-3 rounded text-white focus:bg-red-400 hover:bg-red-500"
          onClick={logout}
        >Logout</button>
    </div>
  )
}

