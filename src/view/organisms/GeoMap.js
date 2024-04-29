import { Component } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { LatLng, Geo } from "../../nonview/base";

import "./GeoMap.css";
import { Box } from "@mui/material";

const URL_FORMAT = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default class GeoMap extends Component {
  constructor(props) {
    super(props);
    this.state = { geo: undefined };
  }

  async componentDidMount() {
    const { ent } = this.props;
    if (ent.id === "LK") {
      return;
    }
    const geoID = ent.id;

    const geo = await new Geo(geoID).load();
    this.setState({ geo });
  }

  renderMapWithPolygons() {
    const { geo } = this.state;

    const pathOptions = { fillColor: "#888", color: "#000" };
    const positions = LatLng.positions(geo);
    const bounds = LatLng.bounds(geo);

    const style = { width: window.innerWidth };

    return (
      <MapContainer bounds={bounds} key="2" style={style} zoomControl={false}>
        <TileLayer url={URL_FORMAT} />
        <Polygon positions={positions} pathOptions={pathOptions} />
      </MapContainer>
    );
  }

  renderEmptyMap() {
    const { ent } = this.props;
    const bounds =
      ent.id === "LK"
        ? LatLng.BOUNDS_LK
        : LatLng.getBoundsFromCentroid(ent.centroid);

    return (
      <Box>
        <MapContainer bounds={bounds} key="1" zoomControl={false}>
          <TileLayer url={URL_FORMAT} />
        </MapContainer>
      </Box>
    );
  }

  render() {
    const { geo } = this.state;

    if (!geo) {
      return this.renderEmptyMap();
    }
    return this.renderMapWithPolygons();
  }
}
