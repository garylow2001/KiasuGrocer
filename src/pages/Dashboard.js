import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";
import { listOfItems } from "../data/item_list";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../AppState";


const Dashboard = () => {
    const appState = useSelector(state => state);
    const dispatch = useDispatch();
    const [vendorDetails, setVendorDetails] = useState(null);
    const navigate = useNavigate();
    const [itemList, setItemList] = useState(listOfItems);
    const goToAuthCustomer = async () => await navigate('/authcustomer');


    /**
     * Haversine function to calculate dist between 2 places
     * @param lat1 user latitude
     * @param lon1 user longitude
     * @param lat2 destination latitude
     * @param lon2 destination longitude
     * @returns distance between the 2 coordinates
     */
    const calcDistance = (lat1, lon1, lat2, lon2) => {
        var R = 6371; 
        var degLat = degToRad(lat2 - lat1);
        var degLon = degToRad(lon2 - lon1);
        var a = Math.sin(degLat / 2) * Math.sin(degLat / 2) +
            Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
            Math.sin(degLon / 2) * Math.sin(degLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    /**
     * Function to convert degree to radian
     * @param deg angle in degrees 
     * @returns angle in radian
     */
    function degToRad(deg) {
        return deg * (Math.PI / 180)
    }

    /**
     * First API call that requests addresses of all supermarkets in SG (Limit to 5 because I'm not rich)
     * Second API call translates the address into latitude and longitude coordinates
     * Get your own API key from here and test it yourself : https://positionstack.com/
     * @returns A promise object that encapsulates an array of arrays with {address, latitude, longitude, market name}
     */
    const RESTresponse = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        let markets = fetch("http://data.gov.sg/api/action/datastore_search?resource_id=df586152-d00f-4b15-b667-9e268f1b60df&limit=5", requestOptions)
            .then(response => response.json())
            .then(result => result.result.records)
            .then(x => {
                return x.map(element => {
                    return fetch("http://api.positionstack.com/v1/forward?access_key=77dd088611e15e988f32434bfe65a3db&query=" + element.premise_address, requestOptions)
                        .then(response => response.json())
                        .then(result => [result.data[0].name, result.data[0].latitude, result.data[0].longitude, element.business_name])
                });
            });
        return markets;
    }

    /**
     * Gets user location and manipulate the monad from above API call to produce an array with needed data
     * @returns an array encapsulating {address, distance, market name}
     */
    const fetchData = () => {
        const handleGeolocationSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            return RESTresponse().then(element => 
                    element.map(promise => promise.then(x => [x[0], calcDistance(latitude, longitude, x[1], x[2]), x[3]])))
                .catch(x => [])
                .then(fList => {
                    console.log(fList);
                    return Promise.all(fList).then(x => x.map(promise => promise)
                        .filter(x => x[1] < 100));
                })
                .then(x => setVendorDetails(x));
        };
        const handleGeolocationError = (error) => {
           console.log("Geolocation error:", error);
           return [];
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              handleGeolocationSuccess,
              handleGeolocationError
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
            return [];
        }
    }

    /**
     * effect hook that gets called upon rendering of the webpage
     */
    let rendered = false;
    useEffect(() => {
        if(!rendered) {
            fetchData();
            rendered = true;
        }
    },[]);

    /**
     * effect hook that gets caled whenever the market or vendor details are updated
     */
    useEffect(() => {
        if(vendorDetails != null) {
            const newList = itemList.map((values,index) => {
                const newValue = vendorDetails[index][0].toString() + " " + 
                    vendorDetails[index][2].toString() + " (" + 
                    vendorDetails[index][1].toFixed(2).toString() + "km away)";
                return {...itemList[index], vendor:newValue};
            })
            console.log(newList);
            dispatch(setItems(newList));
            setItemList(newList);
        }
    }, [vendorDetails])

    return <div className="">
        <Navbar />
        <Hero />
        {itemList.map((values, index) => {
            return <ItemView data={values} handleClick={goToAuthCustomer} />
        })}
    </div>
}

export default Dashboard;
