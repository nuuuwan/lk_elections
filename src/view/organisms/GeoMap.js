import { Component } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  render() {
    const { center, zoom, geo } = this.props;

    const pathOptions = { fillColor: "#888", color: "#000" };

    const positions = geo.map(function (polygon) {
      return polygon.map(function (latLng) {
        const [lat, lng] = latLng;
        return [lng, lat];
      });
    });
    return (
      <MapContainer center={center} zoom={zoom} zoomControl={false}>
        <TileLayer url={URL_FORMAT} />
        <Polygon positions={positions} pathOptions={pathOptions} />;
      </MapContainer>
    );
  }
}
