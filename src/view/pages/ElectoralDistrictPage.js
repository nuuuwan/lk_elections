import { Component } from "react";
import { Box, Typography } from "@mui/material";
import { URLContext } from "../../nonview/base";

export default class ElectoralDistrictPage extends Component {
  constructor(props) {
    super(props);
    const contextItems = URLContext.getItems();
    const [pageID, edID] = contextItems;

    this.state = { pageID, edID };
  }

  render() {
    const { edID } = this.state;
    return (
      <Box>
        <Typography variant="h1">{edID} ElectoralDistrict</Typography>
      </Box>
    );
  }
}
