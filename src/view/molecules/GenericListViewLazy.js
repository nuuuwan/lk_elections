import { Box } from "@mui/material";

import { Header } from "../atoms";

export default function GenericListViewLazy({ title, items, renderItem }) {
  return (
    <Box sx={{ marginTop: 2, marginBottom: 2 }}>
      <Header level={2}>{title}</Header>
      <Box>
        {items.map(function (item, iItem) {
          return <Box key={"item-" + iItem}>{renderItem(item)}</Box>;
        })}
      </Box>
    </Box>
  );
}
