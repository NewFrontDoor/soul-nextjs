import React from 'react';
import PropTypes from 'prop-types';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import {mapsKey} from '../../lib/config';

const Map = ({height, mapWidth, location}) => {
  return (
    <LoadScript id="script-loader" googleMapsApiKey={mapsKey}>
      <GoogleMap
        id="example-map"
        mapContainerStyle={{
          height,
          width: mapWidth
        }}
        zoom={14}
        center={{
          lat: location.lat,
          lng: location.lng
        }}
        options={{
          disableDefaultUI: true
        }}
      >
        <Marker
          position={{
            lat: location.lat,
            lng: location.lng
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

Map.propTypes = {
  location: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  mapWidth: PropTypes.number
};
