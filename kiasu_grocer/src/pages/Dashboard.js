import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ItemView from "../components/ItemView";
import { listOfItems } from "../data/item_list";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [vendorDetails, setVendorDetails] = useState([]);
    const navigate = useNavigate();
    const [itemList, setItemList] = useState(listOfItems);
    const goToAuthCustomer = async () => await navigate('/authcustomer');


    //*************FROM HERE ARE TO BE ADDED*****************
    const calcDistance = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // Radius of the earth in km
        var degLat = degToRad(lat2 - lat1);  // deg2rad below
        var degLon = degToRad(lon2 - lon1);
        var a = Math.sin(degLat / 2) * Math.sin(degLat / 2) +
            Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
            Math.sin(degLon / 2) * Math.sin(degLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function degToRad(deg) {
        return deg * (Math.PI / 180)
    }

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

    const fetchData = () => {
        const handleGeolocationSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            return RESTresponse().then(element => 
                    element.map(promise => promise.then(x => [x[0], calcDistance(latitude, longitude, x[1], x[2]), x[3]]))
                        .filter(promise => promise.then(x => x[1] < 3)))
                .catch(x => [])
                .then(fList => {
                    console.log(fList);
                    fList.forEach(element => element.then(deets => setVendorDetails(vendorDetails.push(deets))))
                })
                .then(x => console.log(vendorDetails));
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

    let rendered = false;
    useEffect(() => {
        if(!rendered) {
            fetchData();
            rendered = true;
            // NEW LINES OF CODE HERE
            // const newList = itemList.map((values,index) => {
            //     const newValue = vendorDetails[index][0].toString() + " " + vendorDetails[index][1].toString() + " " + vendorDetails[index][2].toFixed(2).toString();
            //     return {...itemList[index], vendor:newValue};
            // })
            // setItemList(newList);
            // THIS SHOULD SET THE VALUES OF THE ITEMLIST SUCH THAT the "VENDOR" = vendor + street name + distance rounded to 2dp
        }
    },[]);

    //here
    useEffect(() => {
        console.log(vendorDetails);
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