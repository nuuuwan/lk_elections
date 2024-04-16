import { Box, Typography } from "@mui/material";

function PolygonList({ polygonList }) {
  return (
    <Box>
      <Typography variant="h6">{polygonList.length}</Typography>
    </Box>
  );
}

export default function GeoView({ geo }) {
  return <PolygonList polygonList={geo} />;
}
