import React, { Component } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

class GeoTest extends Component {
  state = {
    userLocation: null,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleGeolocationSuccess,
        this.handleGeolocationError
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  handleGeolocationSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    this.setState({
      userLocation: { lat: latitude, lng: longitude },
    });
  };

  handleGeolocationError = (error) => {
    console.log("Geolocation error:", error);
  };

  render() {
    const { userLocation } = this.state;

    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <h1>Geolocation Test</h1>
        {userLocation ? (
          <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={userLocation} />
          </MapContainer>
        ) : (
          <div>Loading map...</div>
        )}
      </div>
    );
  }
}

export default GeoTest;

