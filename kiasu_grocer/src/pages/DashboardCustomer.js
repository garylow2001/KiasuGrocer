import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";

const DashboardCustomer = ({route}) => {
    const username = "USER"; //must change
    console.log("route " + route);

    return <div className="">
        <Navbar username = {username}/>
        <Hero />
        <ItemView item="Banana" />
        <ItemView item="Apple" />
        <ItemView item="Vitamin C" />
        <ItemView item="Milo" />

        {/* <h2>
            <button onClick={goToAuth} className="group relative flex w-1/2 m-auto justify-center rounded-md 
                 bg-black py-2 px-4 
                text-sm font-coolvetica text-white hover:bg-darkgrey mb-5">
                Click here to Login
            </button>
        </h2> */}
    </div>
}

export default DashboardCustomer;