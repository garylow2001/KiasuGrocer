import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";
import { listOfItems } from "../data/item_list";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();
    const [itemList,setItemList] = useState(listOfItems);
    const goToAuthCustomer = async () => await navigate('/authcustomer');

    return <div className="">
        <Navbar/>
        <Hero />
        {itemList.map((values,index) => {
            return <ItemView data={values} handleClick = {goToAuthCustomer} />
        })}
    </div>
}

export default Dashboard;