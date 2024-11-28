import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetFilteredCountries(
    $first: Int
    $offset: Int
    $region: String
    $name: String
  ) {
    countries(
      first: $first
      offset: $offset
      region_Icontains: $region
      name_Istartswith: $name
    ) {
      edges {
        node {
          name
          nativeName
          area
          flag
          region
          alpha3Code
          subregion
          capital
        }
      }
    }
  }
`;

export const GET_TOTAL = gql`
  query GetFilteredCountries {
    countries {
      edges {
        node {
          name
        }
      }
    }
  }
`;

export const GET_COUNTRY = gql`
  query GetFilteredCountry($code: String) {
    countries(alpha3Code: $code) {
      edges {
        node {
          id
          name
          nativeName
          area
          flag
          region
          subregion
          capital
          timezones
          population
          alpha3Code
          languages {
            edges {
              node {
                name
              }
            }
          }
          borders
          currencies {
            edges {
              node {
                name
                symbol
              }
            }
          }
        }
      }
    }
  }
`;
