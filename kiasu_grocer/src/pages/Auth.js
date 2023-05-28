import React from "react";
import { useState} from "react";
import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// import { useAppState } from "../AppState";


const SIGN_IN_URL = ""
const SIGN_UP_URL = ""


const Auth = () => {
    return (
        <div className="w-1/2 border-4 rounded-lg px-5 py-5 bg-orange border-black">
            <h1 className="mt-6 text-center text-4xl font-coolvetica tracking-tight white"> Welcome to RetroHub</h1>
            <h1 className="mt-2 text-center text-3xl white font-coolvetica"> Sign In </h1>
            <form className="space-y-0.25 mt-8">
                <div className="">
                {/* <label htmlFor="username">Username:</label> */}
                <input 
                    type="text"
                    id = "username"
                    autoComplete = "off"
                    // onChange= {handleChange}
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
                    id = "password"
                    // onChange={handleChange}
                    // value = {formData.password}
                    required
                    placeholder="Password..."
                    className="relative block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                    px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-indigo-500 
                    focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                />
                </div>
                <div className="">
                    <button className="mt-8 relative flex w-1/2 m-auto justify-center rounded-md border border-transparent py-2 px-4 
                    text-sm font-coolvetica text-white hover:bg-indigo-600 bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Sign In
                    </button>
                </div>
            </form>
            <button className="group relative flex w-1/2 m-auto justify-center rounded-md 
                 bg-black py-2 px-4 
                text-sm font-coolvetica text-white hover:bg-darkgrey mb-5">
                    Or Click Here To Sign up
                    </button>
        </div>
    )
}

export default Auth
