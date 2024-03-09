"use client"
import axios from 'axios'
import Link from 'next/link'
import React, {useState} from "react";
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter();
    const [data, setData] = useState("");
    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout")
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            toast.error(error.response.data.error || error);
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me")
            setData(res.data.data._id)
        } catch (error: any) {
            toast.error("Login Required")
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />

            <button
                onClick={logout}
                type="button"
                className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>


        </div>
    )
}

export default page