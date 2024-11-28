import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  Grid2,
  Avatar,
  Typography,
  CardContent,
  CardActionArea,
  useTheme,
  Paper,
} from "@mui/material";
import { CountryListProps } from "../types/componentTypes";
import { dataCountryType } from "../types/dataTypes";

export const CountryList: FC<CountryListProps> = ({ countries }) => {
  const theme = useTheme();

  return (
    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10 }}>
      {countries.map((country: dataCountryType) => (
        <Grid2 size={{ xs: 10, sm: 5, xl: 2.5 }} key={country.name}>
          <Paper
            elevation={8}
            sx={{
              bgcolor: "#e0e0e0",
              "&:hover": {
                bgcolor: "#fafafa",
              },
            }}
          >
            <Link className="nav-link" to={`/country/${country.alpha3Code}`}>
              <CardActionArea>
                <CardContent>
                  <Grid2
                    container
                    columns={{ xs: 12 }}
                    direction="row"
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Grid2 size={6}>
                      <Typography variant="h5">{country.name}</Typography>
                      <Typography variant="body2">
                        Capital: {country.capital}
                      </Typography>
                      <Typography variant="body2">
                        Region: {country.region}
                      </Typography>
                    </Grid2>
                    <Grid2 size={6}>
                      <Avatar
                        sx={{
                          top: 0,
                          bottom: 0,
                          right: 0,
                          left: 0,
                          width: "auto",
                          height: theme.spacing(15),
                        }}
                        alt={country.name}
                        src={country.flag}
                        variant="square"
                      />
                    </Grid2>
                  </Grid2>
                </CardContent>
              </CardActionArea>
            </Link>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
};
