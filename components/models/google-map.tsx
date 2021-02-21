import React from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  LoadScript,
  Marker,
  GoogleMapProps
} from '@react-google-maps/api';
import {mapsKey} from '../../lib/config';

type MapProps = {
  height: string;
  width: string;
  location: GoogleMapProps['center'];
};

const Map = ({height, width, location}: MapProps) => {
  return (
    <LoadScript id="script-loader" googleMapsApiKey={mapsKey}>
      <GoogleMap
        id="example-map"
        mapContainerStyle={{
          height,
          width
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
  width: PropTypes.number
};
