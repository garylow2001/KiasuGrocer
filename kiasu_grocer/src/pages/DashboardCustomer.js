import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";
import { listOfItems } from "../data/item_list";
import { customerOrders } from "../data/customer_orders";
import { useSelector, useDispatch } from "react-redux";
import OrderView from "../components/OrderView";

const DashboardCustomer = () => {
    const appState = useSelector(state => state);
    const dispatch = useDispatch();

    // console.log("DASHBOARD APPSTATE " + appState.userLoggedIn);

    const [itemList, setItemList] = useState(listOfItems);
    const [orders, setOrders] = useState(customerOrders);
    const username = "USER"; //must change
    const removeItem = async (idx) => {
        const newOrder = itemList.find(item => item.id === idx)
        let newList = itemList.filter(item => item.id !== idx)
        await setOrders(orders.concat({ ...newOrder }))
        await setItemList(newList);
        console.log(orders)
    }

    const cancelOrder = async (idx) => {
        const returnedItem = orders.find(item => item.id === idx)
        let newOrders = orders.filter(item => item.id !== idx)
        await setItemList(itemList.concat({ ...returnedItem }))
        await setOrders(newOrders);
    }

    return <div className="">
        <Navbar username={username} />

        <Hero />

        {
            orders.length === 0
                ? ''
                :
                <div className="flex align-middle justify-center mx-auto">
                <h2 className="px-5 m-auto">YOUR ORDERS:</h2>
                <button className="box rounded-md border-2 px-5 bg-white border-slate-300 hover:bg-red-500">Pay now</button>
                </div>
        }

        {orders.map((values, index) => {
            return <OrderView data={values} handleClick={cancelOrder} />
        })}

        <h2>DISCOUNTED ITEMS NEAR YOU:</h2>

        {itemList.map((values, index) => {
            return <ItemView data={values} handleClick={removeItem} />
        })}
    </div>
}

export default DashboardCustomer;