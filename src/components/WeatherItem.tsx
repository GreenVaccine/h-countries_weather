import React, { FC } from "react";
import { Grid2, Paper, useTheme } from "@mui/material";
import { UseProps } from "../types/componentTypes";

export const WeatherItem: FC<UseProps> = (props) => {
  const theme = useTheme();

  return (
    <Grid2 size={{ sm: 12, md: 6 }}>
      <Paper
        style={{
          padding: theme.spacing(1),
          gap: 2,
        }}
      >
        {props.children}
      </Paper>
    </Grid2>
  );
};
