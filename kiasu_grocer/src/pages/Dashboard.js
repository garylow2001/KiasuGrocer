import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const goToAuth = () => navigate('/auth');

    const calcDistance = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // Radius of the earth in km
        var degLat = degToRad(lat2-lat1);  // deg2rad below
        var degLon = degToRad(lon2-lon1); 
        var a = Math.sin(degLat/2) * Math.sin(degLat/2) +
                Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
                Math.sin(degLon/2) * Math.sin(degLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
    }

    function degToRad(deg) {
        return deg * (Math.PI/180)
    }

    const RESTresponse = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        let markets = fetch("https://data.gov.sg/api/action/datastore_search?resource_id=df586152-d00f-4b15-b667-9e268f1b60df&limit=5", requestOptions)
                        .then(response => response.json())
                        .then(result => result.result.records)
                        .then(x => {
                            return x.map(element => {
                                return fetch("http://api.positionstack.com/v1/forward?access_key=77dd088611e15e988f32434bfe65a3db&query=" + element.premise_address, requestOptions)
                                    .then(response => response.json())
                                    .then(result => [result.data[0].name, result.data[0].latitude, result.data[0].longitude])
                            });
                        });
        return markets;
    }

    const fetchData = () => {
        var list = []
        const handleGeolocationSuccess = (position) => {
            const { latitude, longitude } = position.coords;
            RESTresponse().then(element => 
                element.map(promise => promise.then(x => [x[0], calcDistance(latitude, longitude, x[1], x[2])]))
                    .filter(promise => promise.then(x => x[1] < 100)))
            .then(fList => list = fList);
        };
        
        const handleGeolocationError = (error) => {
           console.log("Geolocation error:", error);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              handleGeolocationSuccess,
              handleGeolocationError
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        return list;
    }

    return <div>
        <h1>
            This is to test the BackEnd API
        </h1>
        <h2>
            <button onClick={fetchData}>
                Click here to fetch
            </button>
        </h2>
    </div>
}

export default Dashboard;