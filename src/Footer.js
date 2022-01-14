import * as React from 'react';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { MarkerContext } from './App';


export default function Footer() {
    const { markers, setMarkers } = useContext(MarkerContext);

    const poiCount = markers.filter(marker => marker.type === "poi" && marker.archived === false).length
    const hazardCount = markers.filter(marker => marker.type === "hazard" && marker.archived === false).length;
    const reportCount = markers.filter(marker => marker.type === "report" && marker.archived === false).length;
    const totalCount = poiCount + hazardCount + reportCount

    const poiVisible = 15;
    const hazardVisible = 18;
    const reportVisible = 15;
    const totalVisible = poiVisible + hazardVisible + reportVisible

    return (
        <Box elevation={0} sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', padding: "15px", bgcolor: '#eee', textAlign: "left", overflowX: 'scroll', fontSize: "12px" }}>
            < div > <img src="./interest.png" style={{ width: "12px" }}></img> {poiVisible}/{poiCount} </div >
            <div><img src="./hazard.png" style={{ width: "12px" }}></img> {hazardVisible}/{hazardCount}</div>
            <div> <img src="./report.png" style={{ width: "12px" }}></img> {reportVisible}/{reportCount}</div>
            <div> Total {totalVisible}/{totalCount}</div>
        </Box >
    )
}
