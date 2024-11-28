// src/weatherAPI.ts
import axios from "axios";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.weatherstack.com/current";

export const getWeatherData = async (city: string, date?: string) => {
  const response = await axios.get(WEATHER_API_URL, {
    params: {
      query: city,
      access_key: WEATHER_API_KEY,
      units: "m",
      historical_date: date,
    },
  });

  return response.data;
};
