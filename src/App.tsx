import React, { FC } from "react";
import { Box, Toolbar } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { LayoutHeader } from "./components/layout/Header";
import { RoutesIndex } from "./routes/Index";
import { ScrollTop } from "./components/ScrollTop";

const App: FC = () => {
  return (
    <Router basename="/h-countries_weather">
      <LayoutHeader />
      <Toolbar id="back-to-top-anchor" />
      <Box component="main" sx={{ p: 3 }}>
        <RoutesIndex />
      </Box>
      <ScrollTop />
    </Router>
  );
};

export default App;
