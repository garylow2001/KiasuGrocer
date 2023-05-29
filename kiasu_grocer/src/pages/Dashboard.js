import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const goToAuth = () => navigate('/auth');
    const fetchData = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };

        var markets = fetch("https://data.gov.sg/api/action/datastore_search?resource_id=df586152-d00f-4b15-b667-9e268f1b60df&limit=5", requestOptions)
                        .then(response => response.json())
                        .then(result => result.result.records)
                        .catch(error => console.log('error', error))
                        .then(x => {
                            x.forEach(element => {
                                fetch("http://api.positionstack.com/v1/forward?access_key=77dd088611e15e988f32434bfe65a3db&query=" + element.premise_address, requestOptions)
                                    .then(response => response.json())
                                    .then(result => console.log(result.data[0].name +
                                                                "Latitude = " + result.data[0].latitude + 
                                                                "\nLongitude = " + result.data[0].longitude))
                                    .catch(error => console.log('error', error));
                            });
                        });
        console.log(markets);
    }

    return <div>
        <h1>
            This is to test the GeoCode API
        </h1>
        <h2>
            <button onClick={fetchData}>
                Click here to fetch
            </button>
        </h2>
    </div>
}

export default Dashboard;
