import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


export default function VersatileMarker({data, activeMarker, setActiveMarker}) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")


    useEffect(() => {
        setOpen(activeMarker.lat === data.lat && activeMarker.lng === data.lng)
    }, [activeMarker])

    const handleMarkerClick = (e) => {
        setActiveMarker(data)
    }

    const handleCloseClick = (e) => {
        setOpen(false)
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

    const handleSave = (e) => {
        console.log(name, description, type)
    }

    return (
        <Marker 
                position={{ lat: data.lat, lng: data.lng }}
                onClick={handleMarkerClick}
        >
            
            {open && <InfoWindow 
                onCloseClick={handleCloseClick}
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
                            onClick={handleSave}>
                                Save
                        </Button>
                    </Grid>


                </div>
            </InfoWindow>}
        </Marker>
    )
}
