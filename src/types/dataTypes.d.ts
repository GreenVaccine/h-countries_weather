export interface dataLanguageType {
  node: { name: string };
}

export interface dataCurrenciesType {
  node: { name: string; symbol: string };
}

export interface dataCountryType {
  name: string;
  alpha3Code: string;
  capital: string;
  region: string;
  flag: string;
}

export interface currenciesType {
  name: string;
  mark: string;
}

export interface dataFilterType {
  region: string;
  name: string;
}

export interface dataWeatherType {
  current: {
    weather_icons: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    feelslike: string;
    temperature: string;
    humidity: string;
    pressure: string;
    precip: number;
    cloudcover: number;
    uv_index: number;
  };
  location: {
    localtime: string;
    name: string;
  };
}

export interface dataItemType {
  label?: boolean | string;
  value?: ReactNode | string;
}
