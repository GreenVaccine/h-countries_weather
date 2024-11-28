import React, { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { Typography, Grid2, Paper, useTheme, Skeleton } from "@mui/material";
import { Weather } from "./Weather";
import { CountryDetailsProps } from "../types/componentTypes";
import { currenciesType, dataItemType } from "../types/dataTypes";

export const CountryDetails: FC<CountryDetailsProps> = ({
  country,
  loading,
}) => {
  const theme = useTheme();
  const countryDetail: dataItemType[] = [
    { label: "Country", value: country.name },
    { label: "Languages", value: country.languages?.join(", ") },
    {
      label: "Currencies",
      value:
        country.currencies && country.currencies.length > 0
          ? country.currencies
              .map((cur: currenciesType) => `${cur.name} - ${cur.mark}`)
              .join(", ")
          : "N/A",
    },
    { label: "Population", value: country.population?.toLocaleString() },
    {
      label: "Time Zones",
      value: country.timezones?.join(", "),
    },
    {
      label: "Neighbouring Countries",
      value:
        country.borders && country.borders.length > 0
          ? country.borders.map((border: string, index: number) => (
              <Fragment key={index}>
                <Link to={`/country/${border}`} className="nav-link">
                  {border}
                </Link>
                {index + 1 !== country.borders.length ? ", " : ""}
              </Fragment>
            ))
          : "None",
    },
  ];

  return (
    <Grid2 container columns={12} spacing={8} sx={{ margin: theme.spacing(3) }}>
      <Grid2 size={{ xs: 12, sm: 5, md: 6 }}>
        <Paper
          style={{
            top: "0",
            bottom: "0",
            height: "auto",
            padding: theme.spacing(5),
            gap: 2,
            minHeight: theme.spacing(66),
          }}
        >
          {loading
            ? new Array(countryDetail.length)
                .fill(0)
                .map((e: number, i: number) => (
                  <Typography
                    key={i}
                    variant="h5"
                    style={{ margin: theme.spacing(3) }}
                  >
                    <Skeleton variant="text" animation="wave"></Skeleton>
                  </Typography>
                ))
            : countryDetail.map((e: dataItemType, index: number) => (
                <Typography
                  key={index}
                  variant="h5"
                  style={{ margin: theme.spacing(3) }}
                >
                  <strong>{e.label}:</strong> {e.value}
                </Typography>
              ))}
        </Paper>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 7, md: 6 }}>
        <Weather country={country.name} />
      </Grid2>
    </Grid2>
  );
};
