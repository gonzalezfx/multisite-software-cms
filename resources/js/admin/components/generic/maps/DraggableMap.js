import React, { createRef } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import defaultMarkerIcon from './defaultMarker';
import { leafletSettings } from '../../../utils/defaultConfigs';

class DraggableMap extends React.Component {

  state = {
    center: {
      lat: leafletSettings.defaultLatitude,
      lng: leafletSettings.defaultLongitude,
    },
    marker: {
      lat: leafletSettings.defaultLatitude,
      lng: leafletSettings.defaultLongitude,
    },
    zoom: 14,
    initialized: false,
  };

  refmarker = createRef();

  componentDidMount() {
    if (this.props && this.props.value && !this.state.initialized) {
      const markerCoords = this.props.value;

      this.setState({
        center: {
          lat: markerCoords.latitude,
          lng: markerCoords.longitude,
        },
        marker: {
          lat: markerCoords.latitude,
          lng: markerCoords.longitude,
        },
        initialized: true,
      });
    }
  }

  updatePosition = () => {
    const marker = this.refmarker.current;

    if (marker != null) {
      this.setState({
        marker: marker.leafletElement.getLatLng(),
      });

      this.props.onChange(this.state.marker);
    }
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng]
    const markerPosition = [this.state.marker.lat, this.state.marker.lng]

    return (
      <Map center={position} zoom={this.state.zoom} className="leaflet-map">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={true}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref={this.refmarker}
          icon={defaultMarkerIcon}
        >
        </Marker>
      </Map>
    )
  }
}

export default DraggableMap;
