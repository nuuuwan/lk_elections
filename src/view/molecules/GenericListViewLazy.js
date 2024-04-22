import { Box } from "@mui/material";

import { SectionBox } from "../atoms";

export default function GenericListViewLazy({ title, items, renderItem }) {
  return (
    <SectionBox title={title}>
      <Box>
        {items.map(function (item, iItem) {
          return <Box key={"item-" + iItem}>{renderItem(item)}</Box>;
        })}
      </Box>
    </SectionBox>
  );
}
