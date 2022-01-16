import { Marker, InfoWindow } from '@react-google-maps/api';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { InputLabel, FormControl } from '@mui/material';




export default function NewEventMarker({ marker, setMarker, snackBar, addMarker }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true)
    }, [])

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleChangeType = (e) => {
        setType(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleFormClose = () => {
        setMarker(null);
        setOpen(false);
    }

    const handleSave = () => {
        setOpen(false);
        setMarker(null);
        addMarker(name, description, type);
        snackBar(`Event "${name}" has been successfully saved`);

    }

    return (
        <Marker
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
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} p={1}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleSave}
                            disabled={type === ""}
                        >
                            Save
                        </Button>
                    </Grid>
                </div>
            </InfoWindow>}
        </Marker>
    )
}
