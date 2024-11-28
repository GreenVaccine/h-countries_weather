import { ApolloClient, InMemoryCache } from "@apollo/client";

const countries = new ApolloClient({
  uri: process.env.REACT_APP_COUNTRY_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

export default countries;
