import * as React from 'react';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { MarkerContext } from './App';


export default function Footer() {
    const { markers, visibleMarker } = useContext(MarkerContext);

    const poiCount = markers.filter(marker => marker.type === "poi" && marker.archived === false).length
    const hazardCount = markers.filter(marker => marker.type === "hazard" && marker.archived === false).length;
    const reportCount = markers.filter(marker => marker.type === "report" && marker.archived === false).length;
    const totalCount = poiCount + hazardCount + reportCount

    if (!visibleMarker) {
        return null
    }

    const poiVisible = visibleMarker.poi.filter(marker => marker.archived === false).length;
    const hazardVisible = visibleMarker.hazard.filter(marker => marker.archived === false).length;
    const reportVisible = visibleMarker.report.filter(marker => marker.archived === false).length;
    const totalVisible = poiVisible + hazardVisible + reportVisible

    return (
        <Box elevation={0} sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', padding: "15px", bgcolor: '#eee', textAlign: "left", overflowX: 'scroll', fontSize: "12px" }}>
            <div><img src="./interest.png" style={{ width: "12px" }}></img> {poiVisible}/{poiCount}</div>
            <div><img src="./hazard.png" style={{ width: "12px" }}></img> {hazardVisible}/{hazardCount}</div>
            <div> <img src="./report.png" style={{ width: "12px" }}></img> {reportVisible}/{reportCount}</div>
            <div> Total {totalVisible}/{totalCount}</div>
        </Box >
    )
}
