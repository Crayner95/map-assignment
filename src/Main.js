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

const Main = () => {
    const [markers, setMarkers] = useState([]);
    const [marker, setMarker] = useState(null);
    const [focused, setFocused] = useState(null);
    const [open, setOpen] = useState(false);
    const [openEvent, setOpenEvent] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const savedMarkers = JSON.parse(localStorage.getItem("markers"))
        if (savedMarkers) {
            setMarkers(savedMarkers);
        }
    }, [])


    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 41.3851, lng: 2.1734
    }

    const handleMapClick = (e) => {
        setMarker({ lng: e.latLng.lng(), lat: e.latLng.lat() });
        setOpen(true);
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleFormClose = () => {
        setMarker(null);
        setOpen(false);
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

    const addMarker = () => {
        const allMarkers = [{
            lat: marker.lat,
            lng: marker.lng,
            name: name,
            description: description,
            type: type,
            key: Math.floor(Math.random() * 1000000)
        }, ...markers]
        setMarkers(allMarkers)
        console.log(allMarkers);
        localStorage.setItem("markers", JSON.stringify(allMarkers))
    }

    const handleSave = () => {
        console.log(name, description, type)
        setOpen(false);
        setMarker(null);
        setName("");
        setDescription("");
        setType("");
        addMarker();
        setSnackOpen(true);
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

    const handelUpdate = (key) => {
        const newMarkers = markers.map((marker) => {
            if (focused.key === key) {
                const newMarker = {
                    name: focused.name,
                    key: key,
                }
            }
        });
        for (let marker of markers) {
            const newMarker = {
                name: focused.name,
                key: focused.key,
            }
            newMarkers.push(marker.key === key ? newMarker : marker)
        }

        setEdit(false);
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
                {marker && (<Marker
                    position={marker}
                    onClick={handleClickOpen}
                >
                    {open && <InfoWindow
                        onCloseClick={handleFormClose}
                    >
                        <div>
                            <Grid item xs={12} p={1}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    value={name}
                                    onChange={handleChangeName}
                                />
                            </Grid>
                            <Grid item xs={12} p={1}>
                                <TextField
                                    id="description"
                                    label="Description"
                                    value={description}
                                    onChange={handleChangeDescription}
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12} p={1}>
                                <Select
                                    fullWidth
                                    labelId="type"
                                    id="type"
                                    value={type}
                                    label="Type"
                                    onChange={handleChangeType}
                                >
                                    <MenuItem value={"poi"}>Point of Interest</MenuItem>
                                    <MenuItem value={"hazard"}>Hazard</MenuItem>
                                    <MenuItem value={"report"}>Report</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} p={1}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSave}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </div>
                    </InfoWindow>}
                </Marker>)}
                {markers && markers.map((m) => <Marker position={m} key={m.key} onClick={() => setFocused(m)}>

                </Marker>)}

                {focused && (<InfoWindow
                    position={focused}
                    onCloseClick={handleEventClose}
                >
                    <div>
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
                                onChange={handleChangeName}
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
                            >
                                Edit
                            </Button>}
                            {edit && <Button
                                variant="contained"
                                onClick={() => handelUpdate({ key: focused.key })}
                            >
                                Update
                            </Button>
                            }
                        </Grid>
                        <Grid item xs={12} p={1}>
                            <Button
                                variant="contained"
                            >
                                Archive
                            </Button>
                        </Grid>
                    </div>
                </InfoWindow>)}
                <Snackbar open={snackOpen} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Event {marker?.name} has been successfully saved
                    </Alert>
                </Snackbar>
            </GoogleMap>
        </LoadScript>
    )
}

export default Main;