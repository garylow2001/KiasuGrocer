import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
// import axios from "axios";
// import { useAppState } from "../AppState";


const SIGN_IN_URL = "http://localhost:5000/api/vendors/login"
const SIGN_UP_URL = ""




  

const AuthVendor = () => {
    const navigate = useNavigate();
    const goToDashboard = () => navigate('/');
    const [name, setUsername] = useState("")
    const [passcode, setPassword] = useState("")

    const handleSignIn = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(SIGN_IN_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, passcode }),
          });
      
          if (response.ok) {
            // Handle successful sign-in
            goToDashboard();
          } else {
            // Handle sign-in error
            // You can display an error message or take appropriate action
          }
        } catch (error) {
          console.log("Error:", error);
          // Handle fetch error
          // You can display an error message or take appropriate action
        }
      };

    return (
        <div className="w-1/2 border-4 rounded-lg px-5 py-5 bg-orange border-black bg-orange-200">
            <h1 className="mt-6 text-center text-4xl font-coolvetica tracking-tight white"> Welcome to Kiasu Grocer</h1>
            <h1 className="mt-2 text-center text-3xl white font-coolvetica"> Sign In </h1>
            <form className="space-y-0.25 mt-8">
                <div className="">
                    {/* <label htmlFor="username">Username:</label> */}
                    <input
                        type="text"
                        id="name"
                        autoComplete="off"
                        onChange= {(e) => setUsername(e.target.value)}
                        // value = {formData.username}
                        required
                        placeholder="Username..."
                        className="relative block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                    px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-indigo-500 
                    focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                    />
                </div>
                <div className="">
                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                        type="password"
                        id="passcode"
                        onChange={(e) => setPassword(e.target.value)}
                        // value = {formData.password}
                        required
                        placeholder="Password..."
                        className="relative block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                    px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-indigo-500 
                    focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                    />
                </div>
                <div className="">
                    <button 
                    className="mt-8 relative flex w-1/2 m-auto justify-center rounded-md border border-transparent py-2 px-4 
                    text-sm font-coolvetica text-white hover:bg-indigo-600 bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    
                    onClick={handleSignIn}
                    >
                        Sign In
                    </button>
                </div>
            </form>
            <Link to={"../vendorsignup"} 
            className="group relative flex w-1/2 m-auto justify-center rounded-md 
                 bg-black py-2 px-4 
                text-sm font-coolvetica text-white hover:bg-darkgrey mb-5">
                Or Click Here To Sign up
            </Link>
            <button className="underline" onClick={goToDashboard}>
                Back to Dashboard
            </button>
        </div>
    )
}

export default AuthVendor
