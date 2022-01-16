import { Marker } from '@react-google-maps/api';
import { useContext } from 'react';
import { MarkerContext } from './App';

export default function EventMarker({ m }) {
    const { hoveredMarkerId, setFocused, setHoveredMarkerId } = useContext(MarkerContext);

    const handleMarkerHover = (key) => {
        setHoveredMarkerId(key);
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
        if (hovered) {
            return {
                scaledSize: new window.google.maps.Size(64, 64),
                anchor: new window.google.maps.Point(32, 32),
                url: url
            }
        } else {
            return {
                scaledSize: new window.google.maps.Size(48, 48),
                anchor: new window.google.maps.Point(24, 24),
                url: url

            }
        }
    }

    return (
        <Marker
            position={m}
            key={m.key}
            onClick={() => setFocused(m)}
            icon={MarkerType(m, m.key === hoveredMarkerId)}
            onMouseOver={() => handleMarkerHover(m.key)}
            onMouseOut={() => handleMarkerHover(null)}
        >

        </Marker>
    )
}
