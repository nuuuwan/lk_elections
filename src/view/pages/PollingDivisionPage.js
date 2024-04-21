import { Box, Breadcrumbs, CircularProgress, Typography } from "@mui/material";
import { Ent } from "../../nonview/base";

import { EntLink } from "../atoms";
import { CommonEntAnalysisView } from "../molecules";
import { GeoMap } from "../organisms";
import AbstractCustomPage from "./AbstractCustomPage";

export default class PollingDivisionPage extends AbstractCustomPage {
  static getPageID() {
    return "PollingDivision";
  }

  async componentDidMount() {
    await super.componentDidMount();
    const { pdID } = this.state;
    const pdEnt = await Ent.fromID(pdID);
    const edID = pdID.substring(0, 5);
    const edEnt = await Ent.fromID(edID);

    this.setState({
      pdID,
      pdEnt,
      edID,
      edEnt,
    });
  }

  get supertitle() {
    const { pdEnt, edEnt, countryEnt } = this.state;

    if (!countryEnt) {
      return null;
    }

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <EntLink ent={countryEnt} shortFormat={true} />
        <EntLink ent={edEnt} shortFormat={true} />
        <EntLink ent={pdEnt} shortFormat={true} />
      </Breadcrumbs>
    );
  }

  get title() {
    const { pdEnt, pdID } = this.state;
    if (!pdEnt) {
      return pdID;
    }
    return <EntLink ent={pdEnt} />;
  }
  get browserTitle() {
    const { pdEnt, pdID } = this.state;
    if (!pdEnt) {
      return pdID;
    }
    return pdEnt.name;
  }
  renderBlurb() {
    const { pdEnt, pdID, edEnt } = this.state;
    if (!pdEnt) {
      return null;
    }
    return (
      <Typography variant="body2" sx={{ paddingTop: 1, width: "80%" }}>
        The {pdEnt.name} Polling Division (Code: {pdID}), is a polling division
        in the {edEnt.name} Electoral District, of Sri Lanka.`
      </Typography>
    );
  }

  renderBodyMiddle() {
    const { pdEnt } = this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <GeoMap geoID={pdEnt.id} />

        {this.renderBlurb()}
      </Box>
    );
  }
  renderBodyRight() {
    const { pdEnt, edEnt, countryEnt, elections, pdEnts, partyGroups } =
      this.state;
    if (!pdEnt) {
      return <CircularProgress />;
    }
    const ents = [].concat(pdEnts, [edEnt, countryEnt]);
    return (
      <Box>
        <CommonEntAnalysisView
          ent={pdEnt}
          entsSimilar={[pdEnt, edEnt, countryEnt]}
          entsAll={ents}
          elections={elections}
          partyGroups={partyGroups}
        />
      </Box>
    );
  }
}
