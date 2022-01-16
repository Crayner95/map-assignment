import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';


export default function EditInfoWindow({ focused, handleUpdate, handleArchive, setFocused }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [edit, setEdit] = useState(false);
    const [dialogueOpen, setDialogueOpen] = useState(false);

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

    const handleDialogueOpen = () => {
        setDialogueOpen(true);
    };

    const handleDialogueClose = () => {
        setDialogueOpen(false);
        setFocused(null);
    };

    const handleEdit = () => {
        setName(focused.name);
        setDescription(focused.description);
        setType(focused.type);
        setEdit(true);
    }

    const handleFinishUpdate = () => {
        setEdit(false)
        handleUpdate(focused.key, name, description, type)
    }

    const handleArchiveButton = () => {
        setDialogueOpen(false)
        handleArchive(focused.key)
        setFocused(null);
    }

    return (
        <InfoWindow
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
                        onClick={handleFinishUpdate}
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
                        <Button onClick={handleArchiveButton} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </InfoWindow>
    )
}
