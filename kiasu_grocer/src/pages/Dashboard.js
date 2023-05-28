import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";
import { listOfItems } from "../data/item_list";

const Dashboard = () => {
    const [itemList,setItemList] = useState(listOfItems);

    return <div className="">
        <Navbar/>
        <Hero />
        {itemList.map((values,index) => {
            return <ItemView data={values} />
        })}
    </div>
}

export default Dashboard;