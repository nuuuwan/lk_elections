import { Component } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { LatLng } from "../../nonview/base";

import "./GeoMap.css";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  render() {
    const { geo } = this.props;

    const pathOptions = { fillColor: "#888", color: "#000" };

    const positions = LatLng.positions(geo);
    const bounds = LatLng.bounds(geo);

    return (
      <MapContainer bounds={bounds} zoomControl={false}>
        <TileLayer url={URL_FORMAT} />
        <Polygon positions={positions} pathOptions={pathOptions} />;
      </MapContainer>
    );
  }
}
