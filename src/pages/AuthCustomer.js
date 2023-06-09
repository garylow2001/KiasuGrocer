import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { listOfCustomers } from "../data/customer_data";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../AppState";



const AuthCustomer = ({navigation}) => {
    const appState = useSelector(state => state);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const goToDashboard = () => navigate('/');
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    const handleSubmit = async () => {
        let success = false;
        for (var i = 0; i < listOfCustomers.length; i++) {
            if (listOfCustomers[i].username === formData.username && listOfCustomers[i].password === formData.password) {
                console.log(formData.username)
                dispatch(login(formData.username, formData.password))
                // navigate('/dashboardcustomer', {username: formData.username})
                navigate('/dashboardcustomer')
                success = true;
            }
        }
        if (!success) {
            alert("wrong username/password")
        }
    }
    return (
        <div className="w-1/2 border-4 rounded-lg px-5 py-5 bg-orange border-black bg-orange-200">
            <h1 className="mt-6 text-center text-4xl font-coolvetica tracking-tight"> Welcome to Kiasu Grocer</h1>
            <h1 className="mt-2 text-center text-3xl white font-coolvetica"> Customer Sign In </h1>
            <form onSubmit={handleSubmit} className="space-y-0.25 mt-8">
                <div className="">
                    {/* <label htmlFor="username">Username:</label> */}
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        onChange={handleChange}
                        value={formData.username}
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
                        id="password"
                        onChange={handleChange}
                        value={formData.password}
                        required
                        placeholder="Password..."
                        className="relative block w-1/2 m-auto appearance-none rounded-md border border-gray-300 
                    px-3 py-2 text-black placeholder:text-black focus:z-10 focus:border-indigo-500 
                    focus:outline-none focus:ring-white sm:text-sm bg-slate-200"
                    />
                </div>
                <div className="">
                    <button type="submit" className="mt-8 relative flex w-1/2 m-auto justify-center rounded-md border border-transparent py-2 px-4 
                    text-sm font-coolvetica text-white hover:bg-indigo-600 bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Sign In
                    </button>
                </div>
            </form>
            <button type="button" className="group relative flex w-1/2 m-auto justify-center rounded-md 
                 bg-black py-2 px-4 
                text-sm font-coolvetica text-white hover:bg-darkgrey mb-5">
                Or Click Here To Sign up
            </button>
            <button type="button" className="underline" onClick={goToDashboard}>
                Back to Dashboard
            </button>
        </div>
    )
}

export default AuthCustomer
