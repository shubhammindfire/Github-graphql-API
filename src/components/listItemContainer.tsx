import { Avatar, Box } from "@mui/material";
import React from "react";

interface Props {
  name: string;
  url: string;
  primaryLanguage: { color: string; name: string };
}

const ListItemContainer: React.FC<Props> = ({ name, url, primaryLanguage }) => {
  return (
    <>
      <Box sx={{ ml: 2 }}>
        <a href={url}>{name}</a>
        <Box
          sx={{ display: "flex", alignItems: "center" }}
          className="d-flex flex-row align-items-baseline"
        >
          <Avatar
            sx={{
              bgcolor: primaryLanguage.color,
              width: 12,
              height: 12,
              mr: 2,
            }}
          >
            {""}
          </Avatar>
          <span>{primaryLanguage.name}</span>
        </Box>
      </Box>
      <hr />
    </>
  );
};

export default ListItemContainer;
