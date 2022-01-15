import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useContext } from 'react';
import { MarkerContext } from './App';
import EventMarker from './EventMarker';
import NewEventMarker from './NewEventMarker';

const defaultCenter = {
    lat: 41.3851, lng: 2.1734
}

const defualtZoom = 13;

const Main = () => {
    const [marker, setMarker] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dialogueOpen, setDialogueOpen] = useState(false);
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
        setName("");
        setDescription("");
        setType("");
    }


    const handleEventClose = () => {
        setFocused(null);
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeType = (e) => {
        setType(e.target.value)
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

    const handleEdit = () => {
        setName(focused.name);
        setDescription(focused.description);
        setType(focused.type);
        setEdit(true);
    }

    const handleUpdate = (key) => {
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
        setEdit(false);
    }

    const handleDialogueOpen = () => {
        setDialogueOpen(true);
    };

    const handleDialogueClose = () => {
        setDialogueOpen(false);
    };

    const handleArchive = (key) => {
        setDialogueOpen(false);
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
                {marker && (<NewEventMarker marker={marker} setMarker={setMarker} snackBar={snackBar} addMarker={addMarker} />)}
                {markers && markers.filter(marker => marker.archived === false).map((m) => <EventMarker m={m} />)}

                {focused && (<InfoWindow
                    position={focused}
                    onCloseClick={handleEventClose}
                >
                    <div style={{ textAlign: "left" }}>
                        <Grid item xs={12} p={1}>
                            {edit ? (<TextField
                                fullWidth
                                id="name"
                                label="Name"
                                value={name}
                                onChange={handleChangeName}
                            />)
                                : <Typography> Name: {focused.name} </Typography>}
                        </Grid>
                        <Grid item xs={12} p={1}>
                            {edit ? (<TextField
                                fullWidth
                                id="description"
                                label="Description"
                                value={description}
                                onChange={handleChangeDescription}
                            />)
                                : <Typography> Description: {focused.description} </Typography>}
                        </Grid>
                        <Grid item xs={12} p={1}>
                            {edit ?
                                (<Select
                                    fullWidth
                                    labelId="type"
                                    id="type"
                                    value={type}
                                    onChange={handleChangeType}
                                >
                                    <MenuItem value={"poi"}>Point of Interest</MenuItem>
                                    <MenuItem value={"hazard"}>Hazard</MenuItem>
                                    <MenuItem value={"report"}>Report</MenuItem>
                                </Select>)
                                : <Typography> Type: {focused.type} </Typography>}
                        </Grid>
                        <Grid item xs={12} p={1}>
                            {!edit && <Button
                                variant="contained"
                                onClick={handleEdit}
                                fullWidth
                            >
                                Edit
                            </Button>}
                            {edit && <Button
                                variant="contained"
                                fullWidth
                                onClick={() => handleUpdate(focused.key)}
                            >
                                Update
                            </Button>
                            }
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleDialogueOpen}
                            >
                                Archive
                            </Button>
                        </Grid>
                        <Dialog
                            open={dialogueOpen}
                            onClose={handleDialogueClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you would like to archive {name}?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogueClose}>No</Button>
                                <Button onClick={() => handleArchive(focused.key)} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </InfoWindow>)}
                <Snackbar open={snackOpen} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </GoogleMap>
        </LoadScript >
    )
}

export default Main;