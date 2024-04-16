import { Box, Typography } from "@mui/material";

import { LinkContext } from "../atoms";

export default function GenericListView({
  items,
  title,
  getContext,
  getLabel,
  getIcon,
}) {
  let prevLabel = undefined;
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" sx={{ color: "#888" }}>
        {title}
      </Typography>
      <Box>
        {items.map(function (item, i) {
          const context = getContext(item);
          const label = getLabel(item);
          const Icon = getIcon(item);
          let addGap = false;
          if (
            prevLabel &&
            prevLabel.substring(0, 1) !== label.substring(0, 1)
          ) {
            addGap = true;
          }
          const paddingTop = addGap ? 1 : 0;
          prevLabel = label;

          return (
            <Box
              key={"item-" + i}
              sx={{ m: 0, p: 0, paddingLeft: 1, paddingTop }}
            >
              <LinkContext context={context}>
                <Box display="flex" alignItems="center">
                  {Icon ? (
                    <Icon
                      sx={{ color: "#ccc", marginRight: 1, fontSize: "80%" }}
                    />
                  ) : null}
                  <Typography variant="body2">{label}</Typography>
                </Box>
              </LinkContext>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
