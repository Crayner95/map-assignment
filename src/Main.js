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

const defaultCenter = {
    lat: 41.3851, lng: 2.1734
}

const defualtZoom = 13;

const Main = () => {
    const [marker, setMarker] = useState(null);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [zoom, setZoom] = useState(defualtZoom)

    const { markers, setMarkers, hoveredMarkerId, setHoveredMarkerId, focused, setFocused } = useContext(MarkerContext);


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
        setOpen(true);
        setName("");
        setDescription("");
        setType("");
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
            key: Math.floor(Math.random() * 10000000),
            archived: false,
            date: (new Date()).toLocaleString()
        }, ...markers]
        setMarkers(allMarkers)
        console.log(allMarkers);
    }

    const handleSave = () => {
        console.log(name, description, type)
        setOpen(false);
        setMarker(null);
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

    const MarkerType = (marker, hovered) => {
        let url = null;
        if (marker.type === "poi") {
            url = "./interest.png"
        } else if (marker.type === "hazard") {
            url = "./hazard.png"
        } else if (marker.type === "report") {
            url = "./report.png"
        }
        if (!window.google) {
            return url
        }

        const size = hovered ? new window.google.maps.Size(64, 64) : new window.google.maps.Size(48, 48)
        const anchor = hovered ? new window.google.maps.Point(32, 32) : new window.google.maps.Point(24, 24)

        return {
            url: url,
            scaledSize: size,
            anchor: anchor
        }
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
        setOpen(false)
    }

    const handleMarkerHover = (key) => {
        setHoveredMarkerId(key);
    }

    const handleVisible = () => {
        console.log("hello")
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
                {markers && markers.filter(marker => marker.archived === false).map((m) => <Marker
                    position={m}
                    key={m.key}
                    onClick={() => setFocused(m)}
                    icon={MarkerType(m, m.key === hoveredMarkerId)}
                    onMouseOver={() => handleMarkerHover(m.key)}
                    onMouseOut={() => handleMarkerHover(null)}
                >

                </Marker>)}

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
                        Event "{name}" has been successfully saved
                    </Alert>
                </Snackbar>
            </GoogleMap>
        </LoadScript >
    )
}

export default Main;