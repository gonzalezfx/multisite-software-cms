import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import defaultMarkerIcon from "./defaultMarker";

class BasicMap extends React.Component {
  zoom = 14;

  render() {
    const markerCords = [this.props.latitude, this.props.longitude];

    return (
      <Map
        center={markerCords}
        zoom={this.zoom}
        scrollWheelZoom={false}
        className={`leaflet-map ${this.props.className}`}
        zoomControl={
          this.props.zoomControl !== undefined ? this.props.zoomControl : true
        }
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerCords} icon={defaultMarkerIcon}>
          {this.props.popup && this.props.popup}
        </Marker>
      </Map>
    );
  }
}

export default BasicMap;
