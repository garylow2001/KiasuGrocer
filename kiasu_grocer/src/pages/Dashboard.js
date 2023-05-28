import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const goToAuth = () => navigate('/auth');

    return <div>
        <h1>
            This is the Dashboard
        </h1>
        <h2>
            <button onClick={goToAuth}>
                Click here to Test
            </button>
        </h2>
    </div>
}

export default Dashboard;