import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";
import { listOfItems } from "../data/item_list";

const DashboardCustomer = ({route}) => {
    const [itemList,setItemList] = useState(listOfItems);
    const username = "USER"; //must change
    console.log("route " + route);
    const removeItem = () => {
        console.log("SDSD")
    }

    return <div className="">
        <Navbar username={username} />
        <Hero />
        {itemList.map((values,index) => {
            return <ItemView data= {values} handleClick= {removeItem} />
        })} 
    </div>
}

export default DashboardCustomer;