import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { MarkerContext } from './App';
import EventMarker from './EventMarker';
import NewEventMarker from './NewEventMarker';
import EditInfoWindow from './EditInfoWindow';

const defaultCenter = {
    lat: 41.3851, lng: 2.1734
}

const defualtZoom = 13;

const Main = () => {
    const [marker, setMarker] = useState(null);
    const [snackOpen, setSnackOpen] = useState(false);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(defualtZoom);
    const [message, setMessage] = useState("")

    const { markers, setMarkers, focused, setFocused } = useContext(MarkerContext);


    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    useEffect(() => {
        if (focused) {
            setMapCenter(focused)
            setZoom(defualtZoom)
        }
    }, [focused])

    const handleMapClick = (e) => {
        setMarker({ lng: e.latLng.lng(), lat: e.latLng.lat() });
    }

    const addMarker = (name, description, type) => {
        const allMarkers = [{
            lat: marker.lat,
            lng: marker.lng,
            name: name,
            description: description,
            type: type,
            key: Math.floor(Math.random() * 10000000),
            archived: false,
            date: (new Date()).toLocaleString()
        }, ...markers]
        setMarkers(allMarkers)
        console.log(allMarkers);
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackOpen(false);
    };


    const handleUpdate = (key, name, description, type) => {
        console.log(focused.key, key);
        const newMarkers = markers.map((marker) => {
            if (marker.key === key) {
                const newMarker = {
                    name: name,
                    description: description,
                    type: type,
                    key: marker.key,
                    lat: marker.lat,
                    lng: marker.lng,
                    date: (new Date()).toLocaleString(),
                    archived: false
                }
                setFocused(newMarker);
                return newMarker
            }
            return marker
        });
        setMarkers(newMarkers)
        console.log(newMarkers)
    }

    const handleArchive = (key) => {
        const archivedMarkers = markers.map((marker) => {
            if (marker.key === key) {
                const archived = {
                    ...marker,
                    archived: true
                }
                return archived
            }
            return marker
        });
        setMarkers(archivedMarkers)
    }


    const handleVisible = () => {
        console.log("hello")
    }

    const snackBar = (message) => {
        setMessage(message);
        setSnackOpen(true);
    }


    return (
        <LoadScript
            googleMapsApiKey='AIzaSyDkaWWmXl4hs4RaQtd7XxxhDzWFVrHqfAQ'>
            <GoogleMap
                onClick={handleMapClick}
                mapContainerStyle={mapStyles}
                zoom={zoom}
                center={mapCenter}
                clickableIcons={false}
                onBoundsChanged={handleVisible}
            >
                {marker &&
                    (<NewEventMarker
                        marker={marker}
                        setMarker={setMarker}
                        snackBar={snackBar}
                        addMarker={addMarker}
                    />)}
                {markers && markers.filter(marker => marker.archived === false).map((m) => <EventMarker m={m} />)}

                {focused &&
                    (<EditInfoWindow
                        focused={focused}
                        handleUpdate={handleUpdate}
                        handleArchive={handleArchive}
                        setFocused={setFocused}
                    />)}
                <Snackbar
                    open={snackOpen}
                    autoHideDuration={5000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </GoogleMap>
        </LoadScript >
    )
}

export default Main;