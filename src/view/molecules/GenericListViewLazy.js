import { Box } from "@mui/material";

import { Header, SectionBox } from "../atoms";

export default function GenericListViewLazy({ title, items, renderItem }) {
  return (
    <SectionBox>
      <Header level={2}>{title}</Header>
      <Box>
        {items.map(function (item, iItem) {
          return <Box key={"item-" + iItem}>{renderItem(item)}</Box>;
        })}
      </Box>
    </SectionBox>
  );
}
