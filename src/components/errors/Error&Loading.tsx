import React, { FC } from "react";
import { Box, CircularProgress, Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
export const Loading: FC = () => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export const Error: FC = () => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link to="/">
        <Button variant="outlined" startIcon={<Home />}>
          Home
        </Button>
      </Link>
    </Box>
  );
};
