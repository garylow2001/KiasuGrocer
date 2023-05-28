import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";
import { listOfItems } from "../data/item_list";
import { customerOrders } from "../data/customer_orders";

const DashboardCustomer = ({route}) => {
    const [itemList,setItemList] = useState(listOfItems);
    const [orders,setOrders] = useState(customerOrders);
    const username = "USER"; //must change
    const removeItem = async (idx) => {
        const newOrder = itemList.find(item => item.id === idx)
        let newList = itemList.filter(item => item.id !== idx)
        console.log(idx)
        await setOrders(orders.concat({newOrder}))
        await setItemList(newList);
        console.log(orders)
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