import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useContext } from 'react';
import { MarkerContext } from './App';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Footer from './Footer';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();


export default function Dashboard(props) {
    const [open, setOpen] = React.useState(true);
    const { markers, hoveredMarkerId, setHoveredMarkerId, setFocused } = useContext(MarkerContext);

    const existingMarkers = markers.filter(marker => marker.archived === false)


    const Type = (marker, hovered) => {
        if (marker.type === "poi") {
            return "./interest.png"
        } else if (marker.type === "hazard") {
            return "./hazard.png"
        } else if (marker.type === "report") {
            return "./report.png"
        } else if (marker.type === "") {
            return "./default.png"
        }
    }

    const typeName = (marker) => {
        if (marker.type === "poi") {
            return "Point of Interest"
        } else if (marker.type === "hazard") {
            return "Hazard"
        } else if (marker.type === "report") {
            return "Report"
        }
    }

    const handleHover = (key) => {
        setHoveredMarkerId(key);
    }

    const handleEventClick = (marker) => {
        setFocused(marker)
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            px: [0],
                            display: "flex",
                            flexDirection: 'column',
                            height: '100vh',
                            alignItems: 'stretch'
                        }}
                    >
                        <List sx={{ overflow: 'auto', maxWidth: 360, flexGrow: 1 }}>

                            {existingMarkers.length ?
                                existingMarkers.map((marker) => <ListItem
                                    alignItems="flex-start"
                                    onMouseOver={() => handleHover(marker.key)}
                                    onMouseOut={() => handleHover(null)}
                                    onClick={() => handleEventClick(marker)}
                                    key={marker.key}
                                    sx={{ bgcolor: marker.key === hoveredMarkerId ? '#eee' : 'white', cursor: 'pointer' }}>
                                    <ListItemAvatar>
                                        <Avatar alt="image" src={Type(marker)} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={marker.name}
                                        secondary={
                                            <div>
                                                <div>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {typeName(marker)}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {marker.date}
                                                    </Typography>
                                                </div>
                                            </div>
                                        }
                                    />
                                </ListItem>) :
                                "No events"

                            }
                        </List>
                        {existingMarkers.length > 0 && <Footer />}
                    </Toolbar>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <main>
                        {props.children}
                    </main>
                </Box>
            </Box>
        </ThemeProvider >
    );
}
