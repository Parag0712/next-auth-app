"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function verifyEmail() {
    
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();
    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyEmail', {token})
            setVerified(true);
            router.push("/login");
        } catch (error:any) {
            setError(true);
            router.push("/login");
            toast.error("something wrong try to login.");
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");        
        setToken(urlToken || "");
    }, []);
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <h1 className="text-4xl">Verifying Email</h1>
        {verified && (
            <div>
                <h2 className="text-2xl">Email Verified</h2>
                <Link href="/login">
                    Login
                </Link>
            </div>
        )}
        {error && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                
            </div>
        )}
    </div>
    )
}

export default verifyEmail