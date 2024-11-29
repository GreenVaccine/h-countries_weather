import React, { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { CountryListPage } from "../pages/CountryList";
import { CountryDetailsPage } from "../pages/CountryDetails";
import { UseGraphqlFetch } from "../hooks/UseGraphqlFetch";
import { GET_COUNTRIES } from "../graphql/queries";

export const RoutesIndex: FC = () => {
  const [loading, error, data, FetchData] = UseGraphqlFetch({
    GQL: GET_COUNTRIES,
    variables: {
      first: window.innerWidth > 1535 ? 24 : 8,
      offset: 0,
      name: "",
      region: "",
    },
  });

  return (
    <Routes>
      <Route
        path="/h-countries_weather/list"
        element={<CountryListPage {...{ loading, error, data, FetchData }} />}
      />
      <Route
        path="/h-countries_weather/country/:id"
        element={<CountryDetailsPage />}
      />
      <Route
        path="/*"
        element={<Navigate to="/h-countries_weather/list" replace />}
      />
    </Routes>
  );
};
