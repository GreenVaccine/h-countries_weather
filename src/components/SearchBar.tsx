import React, { FC, ChangeEvent } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import { regions } from "./constant/data";
import { SearchBarProps } from "../types/componentTypes";

export const SearchBar: FC<SearchBarProps> = ({ filter, handleFilter }) => {
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <InputLabel id="demo-select-small-label">Region</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={filter.region}
          label="Region"
          onChange={(e: SelectChangeEvent) => {
            handleFilter(e);
          }}
        >
          {regions.map((region: string, index: number) => (
            <MenuItem key={index} value={region === "All" ? "" : region}>
              {region}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, maxWidth: 150 }} size="small">
        <InputLabel htmlFor="component-outlined">Country Name</InputLabel>
        <OutlinedInput
          id="component-outlined"
          value={filter.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleFilter(e, "search");
          }}
          label="Country Name"
        />
      </FormControl>
    </>
  );
};
