import {
    MapContainer,
    TileLayer,
    useMap,
    Marker,
    Popup,
  } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import { useSelector } from 'react-redux';
  import Leaflet from 'leaflet';
  import icon from '../assets/plane-marker.png';
  import { useState } from 'react';
  import SideDetail from './SideDetail';
  
  const MapView = () => {
    const state = useSelector((store) => store);
    const [showDetails, setShowDetails] = useState(false);
    const [detailId, setDetailId] = useState();
  
    // Using the icon creation function from brochure storage.
    const planeMarker = Leaflet.icon({
      iconUrl: icon,
      iconSize: [45, 45],
    });
  
    // It works when you click on the detail button.
    const handleClick = (id) => {
      // We will keep the id in the state (it will go to the component as a prop)
      setDetailId(id);
      // It allows the side window to be opened.
      setShowDetails(true);
    };
  
    return (
      <div>
        <h2 className="counter">{state.flights.length} Plane Found.</h2>
        <MapContainer
          center={[38.685721, 35.506984]}
          zoom={7}
          scrollWheelZoom={true}
        >
          {/*  map to show*/}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/*
           * cursor on the screen
            * we have the location information of the cursor as a prop
            * requests an array, the first value of this array
            * second value of latitude is longitude
           */}
  
          {state.flights.map((flight) => (
            <Marker
              icon={planeMarker}
              position={[flight.lat, flight.lng]}
            >
              <Popup>
                <div className="popup">
                  <span>Code: {flight.code}</span>
                  <button onClick={() => handleClick(flight.id)}>
                    DETAIL
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
  
        {/*If showDetail state is true, open a side window on the screen. */}
        {showDetails && (
          <SideDetail id={detailId} setShowDetails={setShowDetails} />
        )}
      </div>
    );
  };
  
  export default MapView;