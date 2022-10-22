import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const actions = [
  {
    icon: <FolderOpenIcon />,
    name: "Repo",
    url: "https://github.com/jeremias-jalil/birrasanta",
  },
  {
    icon: <GitHubIcon />,
    name: "GitHub",
    url: "https://github.com/jeremias-jalil",
  },
  {
    icon: <LinkedInIcon />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jeremiasjalil/",
  },
];

export default function BasicSpeedDial() {
  return (
    <Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              window.open(action.url, "_blank");
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
