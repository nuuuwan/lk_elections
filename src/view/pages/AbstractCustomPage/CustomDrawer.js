import { Box, Drawer, IconButton } from "@mui/material";

import { MainMenu } from "../../organisms";

import MenuIcon from "@mui/icons-material/Menu";
import VersionView from "../../atoms/VersionView";
import CloseIcon from "@mui/icons-material/Close";
export default function CustomDrawer({ drawerOpen, setDrawerOpen }) {
  const onClick = function () {
    setDrawerOpen(!drawerOpen);
  };
  const Icon = drawerOpen ? CloseIcon : MenuIcon;

  return (
    <Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ zIndex: 3000, position: "fixed", top: 0, right: 0 }}
      >
        <Box sx={{ m: 2, p: 2, minWidth: 320 }}>
          <VersionView />
          <MainMenu />
        </Box>
      </Drawer>
      <Box sx={{ position: "fixed", top: 8, right: 12, zIndex: 4000 }}>
        <IconButton onClick={onClick}>
          <Icon />
        </IconButton>
      </Box>
    </Box>
  );
}
