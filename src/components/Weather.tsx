import React, { FC, Fragment, useEffect, useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { Typography, Grid2, Avatar, useTheme, Skeleton } from "@mui/material";
import { WeatherItem } from "./WeatherItem";
import { WeatherProps } from "../types/componentTypes";
import { getWeatherData } from "../services/GetWeather";
import { dataWeatherType, dataItemType } from "../types/dataTypes";

export const Weather: FC<WeatherProps> = ({ country }) => {
  const theme = useTheme();
  const [data, setData] = useState<dataWeatherType | null>(null);

  useEffect(() => {
    getWeatherData(country).then((res) => {
      setData(res);
    });
  }, [country]);
  const weatherFields: dataItemType[][] = [
    [
      {
        label: false,
        value: (
          <Avatar
            variant="square"
            style={{
              right: "0",
              left: "0",
              width: "auto",
              height: theme.spacing(20),
            }}
            src={data?.current?.weather_icons?.[0]}
          />
        ),
      },
      { label: "Time", value: data?.location?.localtime },
      { label: "Location", value: data?.location?.name },
    ],
    [
      {
        label: false,
        value: (
          <Gauge
            value={data?.current?.wind_speed || 0}
            startAngle={-110}
            endAngle={110}
            sx={{
              right: "0",
              left: "0",
              width: "auto",
              height: theme.spacing(20),
            }}
            text={({ value }) => `${value} km/h`}
          />
        ),
      },
      { label: "Wind Degree", value: `${data?.current?.wind_degree || 0}°` },
      { label: "Wind Direction", value: data?.current?.wind_dir },
    ],
    [
      {
        label: "Temperature",
        value: `${data?.current?.feelslike || 0}°C / ${
          data?.current?.temperature || 0
        }°C`,
      },
      { label: "Humidity", value: `${data?.current?.humidity || 0}%` },
      { label: "Pressure", value: `${data?.current?.pressure} hPa` },
    ],
    [
      { label: "Precipitation", value: `${data?.current?.precip || 0}mm` },
      { label: "Cloud Cover", value: `${data?.current?.cloudcover || 0}%` },
      { label: "UV Index", value: data?.current?.uv_index },
    ],
  ];

  return (
    <Grid2 container spacing={4}>
      {weatherFields.map((weatherField: dataItemType[], index: number) => (
        <WeatherItem key={index}>
          {weatherField.map((item: dataItemType, i: number) => (
            <Fragment key={i}>
              {!item.label ? (
                !data ? (
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    sx={{
                      right: "0",
                      left: "0",
                      width: "auto",
                      height: theme.spacing(20),
                    }}
                  />
                ) : (
                  item.value
                )
              ) : (
                <Typography style={{ margin: theme.spacing(3) }}>
                  {!data ? (
                    <Skeleton animation="wave" />
                  ) : (
                    item.label + ":" + item.value
                  )}
                </Typography>
              )}
            </Fragment>
          ))}
        </WeatherItem>
      ))}
    </Grid2>
  );
};
