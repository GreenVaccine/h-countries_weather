import { ReactElement, MouseEvent, ChangeEvent, ReactNode } from "react";
import { DocumentNode } from "graphql";
import { dataCountriesType } from "./dataTypes";

export interface UseProps {
  window?: () => Window;
  children?: ReactNode;
}

export interface SearchBarProps {
  filter: {
    region: string;
    name: string;
  };
  handleFilter: (
    e: SelectChangeEvent | ChangeEvent<HTMLInputElement>,
    type?: string
  ) => void;
}

export interface CountryListProps {
  countries: dataCountriesType[];
}

export interface CountryDetailsProps {
  country: {
    name: string;
    languages: string[];
    currencies: currenciesType[];
    population: number;
    timezones: string[];
    borders: string[];
  };
  loading: boolean;
}

export interface UseGraphqlFetchProps {
  GQL: DocumentNode;
  variables: {
    first?: number;
    offset?: number;
    region?: string;
    name?: string;
    alpha2Code?: string;
    code?: string;
  };
}

export interface WeatherProps {
  country: string;
}
