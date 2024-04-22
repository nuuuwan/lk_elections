import { Box } from "@mui/material";

import { Header } from "../atoms";

export default function GenericListViewLazy({ title, items, renderItem }) {
  return (
    <Box sx={{ m: 2 }}>
      <Header level={2}>{title}</Header>
      {items.map(function (item, iItem) {
        return <Box key={"item-" + iItem}>{renderItem(item)}</Box>;
      })}
    </Box>
  );
}
