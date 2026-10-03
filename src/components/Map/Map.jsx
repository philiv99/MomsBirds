import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactMapboxGl, { MapContext, Marker, Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapMgr from "../../services/mapmanager.js";
import Pins from './Mapbox/Pins.jsx'
import './Map.less';
import config from "config";
import SidePanel from '../SidePanel/SidePanel.jsx';

const homeLat = 41.498828;
const homeLng = -81.571005;
const defaultZoomLevel = 2;

// Stable references so react-mapbox-gl only applies them on mount; new array
// literals each render would make it reset the zoom/center (snapping way out)
// and fight Pins' fit-to-bounds.
const initialCenter = [homeLng, homeLat];
const initialZoom = [defaultZoomLevel];

const MapBoxMap = ReactMapboxGl({
  accessToken: config.mapboxGLKey,
  attributionControl: false
});

const Map = ({items}) => {
  // Pins owns all map movement (fit-to-bounds on data change, fly-to on click),
  // so the map only needs a static initial view here.
  return (<MapBoxMap id="mapDiv"
    style= "mapbox://styles/mapbox/streets-v9"
    center={initialCenter}
    zoom={initialZoom}
    containerStyle={{
      height: '81vh',
      width: '98vw',
      paddingTop: '5px'
    }}
  >
  <MapContext.Consumer>
    {(map) => {
      mapMgr.setMap(map);
    }}
  </MapContext.Consumer>
  <Pins data={items || []} />
  <SidePanel />
  </MapBoxMap>);
}

const select = appState => ({
  items: appState.content.items || []
})

export default connect(select)(Map)
