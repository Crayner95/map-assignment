import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react'
import VersatileMarker from './VersatileMarker'

const Main = () => {

    const [markers, setMarkers] = useState([])
    const [activeMarker, setActiveMarker] = useState(null)
    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    const handleMapClick = (e) => {
        setActiveMarker({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
            key: Math.floor(Math.random() * 100000000),
        })
    }

    const addMarker = (markerData, name, description, type) => {
        const marker = {
            lat: markerData.lat,
            lng: markerData.lng,
            key: markerData.key,
            name: name,
            description: description,
            type: type
        }
        setMarkers([...markers, marker])

    }

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyDkaWWmXl4hs4RaQtd7XxxhDzWFVrHqfAQ'>
            <GoogleMap
                onClick={handleMapClick} 
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}
                clickableIcons={false}
            >
                {activeMarker && <VersatileMarker 
                    data={activeMarker}
                    activeMarker={activeMarker}
                    setActiveMarker={setActiveMarker}
                >
                </VersatileMarker>}

            {markers.map(marker => (<VersatileMarker 
                data={marker} 
                key={marker.key}
                activeMarker={activeMarker}
                setActiveMarker={setActiveMarker}
            />))}
            </GoogleMap>
        </LoadScript>
    )
}

export default Main;