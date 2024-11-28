import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../graphql/queries";
import { CountryDetails } from "../components/CountryDetails";
import { UseGraphqlFetch } from "../hooks/UseGraphqlFetch";
import { Error, Loading } from "../components/errors/Error&Loading";
import { dataLanguageType, dataCurrenciesType } from "../types/dataTypes";

export const CountryDetailsPage: FC = () => {
  const { id } = useParams();
  const [loading, error, data] = UseGraphqlFetch({
    GQL: GET_COUNTRY,
    variables: {
      code: id,
    },
  });

  if (error) return <Error />;

  const relData = data?.countries?.edges?.[0]?.node;

  const country = {
    ...relData,
    languages: relData?.languages?.edges?.map(
      (e: dataLanguageType) => e.node.name
    ),
    currencies: relData?.currencies?.edges?.map((e: dataCurrenciesType) => ({
      name: e.node.name,
      mark: e.node.symbol,
    })),
  };

  return <CountryDetails {...{ country, loading }} />;
};
