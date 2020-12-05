import mapboxgl from 'mapbox-gl';
import config from "config";
import dataAccess from '../core/data/dataAccess.js';


let map = null;
mapboxgl.accessToken = config.key;
let mapboxGeocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'

let homeLat = 41.498828;
let homeLng = -81.571005;
let zoom = 9;
let oneMarkerZoomLevel = 13;
let maxDuration = 1500;
let currentMarkers = [];
let currentMarkersById = {};
let mapStyle = "mapbox://styles/mapbox/streets-v9";

function create(container, options) {

    if (!container) return;

    if (options) {
        homeLat = options.homeLat || 41.498828;
        homeLng = options.homeLng || -81.571005;
        zoom = options.zoom || 1;
        currentMarkers = [];
        mapStyle = options.mapStyle || "mapbox://styles/mapbox/streets-v9";
    }
        
    let center = new mapboxgl.LngLat(homeLng, homeLat);
    map = new mapboxgl.Map({
        container: container,
        style: mapStyle,
        center: center,
        zoom: zoom
    });
}

function isMapInitialized() {
    return map;
}

function fitBounds() {

    if (!currentMarkers || currentMarkers.length < 1) return;
        
    var lats = []; var lngs = []; 
    currentMarkers.forEach((m) => {
        var lnglat = m.getLngLat();
        lats.push(lnglat.lat);
        lngs.push(lnglat.lng);
    })
    if (lats.length == 1) {
        let center = new mapboxgl.LngLat(lngs[0], lats[0]);
        map.flyTo({ center: center, zoom: oneMarkerZoomLevel,  maxDuration: maxDuration});
        return;
    };
    var minlat = Math.min.apply(null, lats),
        maxlat = Math.max.apply(null, lats);
    var minlng = Math.min.apply(null, lngs),
        maxlng = Math.max.apply(null, lngs);
    var bbox = [[minlng,minlat],[maxlng,maxlat]];

    map.fitBounds(bbox, {padding: 100, maxDuration: maxDuration});
}

function removeMarkers() {
    currentMarkers.forEach((marker) => { marker.remove(); });
    currentMarkers = [];
    currentMarkersById = {};
}

function addMarker(markerOptions) {
    const birdLatLng = new mapboxgl.LngLat(markerOptions.lng, markerOptions.lat)
    let marker = new mapboxgl.Marker(markerOptions.el)
        .setLngLat(birdLatLng)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(markerOptions.popupHTML))
        .addTo(map);
    currentMarkers.push(marker);
    currentMarkersById[markerOptions.id] = marker;
}

function addMarkers(markerOptionList) {
    if (markerOptionList && markerOptionList.length>0) {
        markerOptionList.forEach((markerOption)=> { addMarker(markerOption)});
        fitBounds();
    }
}

function resize() {
    map.resize();
}

function getMap() {
    return map;
}

function closeAllPopups() {
    currentMarkers.forEach((marker) => {
        let markerPopup = marker.getPopup();
        if (markerPopup && markerPopup.isOpen())
            marker.togglePopup();
    })
}

function flyToMarkerId(id) {
    //closeAllPopups();
    const marker = currentMarkersById[id];
    var center = marker.getLngLat();
    map.flyTo({ center: center, zoom: oneMarkerZoomLevel, speed: 2});
    marker.togglePopup();
}

function reverseGeoCode(place) {
  const uri = encodeURI(`${mapboxGeocodeUrl}${place}.json?access_token=${ config.key}`);
  return dataAccess.get(uri)
                    .then(res => { 
                        console.log(JSON.stringify(res, null, 4));
                        return res;
                    });
}

function getLocationDetails() {

//     curl "https://api.mapbox.com/geocoding/v5/mapbox.places/19.078059,59.739109.json?access_token=pk.eyJ1IjoicGhpbGl2IiwiYSI6ImNqdDV6NjQyOTBicGszeWxqZzl1MmIwbmwifQ.5X
// xqiL5_KUeJruTboUvZPg";
// {
//     "type": "FeatureCollection",
//     "query": [
//       19.078059,
//       59.739109
//     ],
//     "features": [
//       {
//         "id": "address.8933994917802442",
//         "type": "Feature",
//         "place_type": [
//           "address"
//         ],
//         "relevance": 1,
//         "properties": {
//           "accuracy": "point"
//         },
//         "text": "Berghamnsv├ñgen",
//         "place_name": "Berghamnsv├ñgen 35, 760 15 Gr├ñdd├╢, Sweden",
//         "center": [
//           19.077013,
//           59.738347
//         ],
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             19.077013,
//             59.738347
//           ]
//         },
//         "address": "35",
//         "context": [
//           {
//             "id": "postcode.6830263983064540",
//             "text": "760 15"
//           },
//           {
//             "id": "place.14820154477495270",
//             "wikidata": "Q1551396",
//             "text": "Gr├ñdd├╢"
//           },
//           {
//             "id": "region.7264393082495890",
//             "short_code": "SE-AB",
//             "wikidata": "Q104231",
//             "text": "Stockholm"
//           },
//           {
//             "id": "country.10685795727764470",
//             "wikidata": "Q34",
//             "short_code": "se",
//             "text": "Sweden"
//           }
//         ]
//       },
//       {
//         "id": "postcode.6830263983064540",
//         "type": "Feature",
//         "place_type": [
//           "postcode"
//         ],
//         "relevance": 1,
//         "properties": {
          
//         },
//         "text": "760 15",
//         "place_name": "760 15, Gr├ñdd├╢, Stockholm, Sweden",
//         "bbox": [
//           18.9566917763311,
//           59.6039917713453,
//           19.5688291304991,
//           59.821865550531
//         ],
//         "center": [
//           19.29,
//           59.76
//         ],
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             19.29,
//             59.76
//           ]
//         },
//         "context": [
//           {
//             "id": "place.14820154477495270",
//             "wikidata": "Q1551396",
//             "text": "Gr├ñdd├╢"
//           },
//           {
//             "id": "region.7264393082495890",
//             "short_code": "SE-AB",
//             "wikidata": "Q104231",
//             "text": "Stockholm"
//           },
//           {
//             "id": "country.10685795727764470",
//             "wikidata": "Q34",
//             "short_code": "se",
//             "text": "Sweden"
//           }
//         ]
//       },
//       {
//         "id": "place.14820154477495270",
//         "type": "Feature",
//         "place_type": [
//           "place"
//         ],
//         "relevance": 1,
//         "properties": {
//           "wikidata": "Q1551396"
//         },
//         "text": "Gr├ñdd├╢",
//         "place_name": "Gr├ñdd├╢, Stockholm, Sweden",
//         "bbox": [
//           18.9576,
//           59.649873,
//           19.458625,
//           59.804604
//         ],
//         "center": [
//           19.03806,
//           59.76667
//         ],
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             19.03806,
//             59.76667
//           ]
//         },
//         "context": [
//           {
//             "id": "region.7264393082495890",
//             "short_code": "SE-AB",
//             "wikidata": "Q104231",
//             "text": "Stockholm"
//           },
//           {
//             "id": "country.10685795727764470",
//             "wikidata": "Q34",
//             "short_code": "se",
//             "text": "Sweden"
//           }
//         ]
//       },
//       {
//         "id": "region.7264393082495890",
//         "type": "Feature",
//         "place_type": [
//           "region"
//         ],
//         "relevance": 1,
//         "properties": {
//           "short_code": "SE-AB",
//           "wikidata": "Q104231"
//         },
//         "text": "Stockholm",
//         "place_name": "Stockholm, Sweden",
//         "bbox": [
//           17.2443690224356,
//           58.6852181011858,
//           19.6861696939757,
//           60.3211392691356
//         ],
//         "center": [
//           18.16667,
//           59.33333
//         ],
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             18.16667,
//             59.33333
//           ]
//         },
//         "context": [
//           {
//             "id": "country.10685795727764470",
//             "wikidata": "Q34",
//             "short_code": "se",
//             "text": "Sweden"
//           }
//         ]
//       },
//       {
//         "id": "country.10685795727764470",
//         "type": "Feature",
//         "place_type": [
//           "country"
//         ],
//         "relevance": 1,
//         "properties": {
//           "wikidata": "Q34",
//           "short_code": "se"
//         },
//         "text": "Sweden",
//         "place_name": "Sweden",
//         "bbox": [
//           10.8383668128319,
//           55.280224001785,
//           24.1933684832876,
//           69.0599269995724
//         ],
//         "center": [
//           17.6754094331351,
//           64.9648751621697
//         ],
//         "geometry": {
//           "type": "Point",
//           "coordinates": [
//             17.6754094331351,
//             64.9648751621697
//           ]
//         }
//       }
//     ],
//     "attribution": "NOTICE: ┬⌐ 2020 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare."
//   }
}


export default { 
    create: create,
    addMarkers: addMarkers,
    removeMarkers: removeMarkers,
    isMapInitialized: isMapInitialized,
    resize: resize,
    getMap: getMap,
    flyToMarkerId: flyToMarkerId,
    fitBounds: fitBounds,
    reverseGeoCode: reverseGeoCode
}