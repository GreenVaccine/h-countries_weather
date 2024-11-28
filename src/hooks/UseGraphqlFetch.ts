import { useQuery } from "@apollo/client";
import { UseGraphqlFetchProps } from "../types/componentTypes";

export const UseGraphqlFetch = ({ GQL, variables }: UseGraphqlFetchProps) => {
  const { loading, error, data, fetchMore } = useQuery(GQL, {
    variables,
  });

  const FetchData = (page: number, perPage: number, filter: any) => {
    const variables = {
      first: perPage,
      offset: page,
      ...filter,
    };

    fetchMore({
      variables,
      updateQuery: (GET_COUNTRIES, { fetchMoreResult }) => {
        if (!fetchMoreResult) return GET_COUNTRIES;
        return {
          countries: {
            ...fetchMoreResult.countries,
            edges: [...fetchMoreResult.countries.edges],
          },
        };
      },
    });
  };

  return [loading, error, data, FetchData];
};
