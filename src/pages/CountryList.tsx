import React, {
  useState,
  MouseEvent,
  ChangeEvent,
  FC,
  useMemo,
  useCallback,
} from "react";
import { SelectChangeEvent, Box, TablePagination } from "@mui/material";
import { Error, Loading } from "../components/errors/Error&Loading";
import { CountryList } from "../components/CountryList";
import { SearchBar } from "../components/SearchBar";
import { dataCountryType, dataFilterType } from "../types/dataTypes";

interface CountryDetailsPageProps {
  data: { countries: { edges: { node: dataCountryType }[] } };
  error: object | undefined;
  loading: boolean;
  FetchData: Function;
}

export const CountryListPage: FC<CountryDetailsPageProps> = ({
  data,
  error,
  loading,
  FetchData,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    window.innerWidth > 1535 ? 24 : 8
  );
  const [filter, setFilter] = useState<dataFilterType>({
    region: "",
    name: "",
  });

  const debounce = (func: Function, delay: number) => {
    let timer: any;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleDebouncedSearch = useCallback(
    debounce((value: string) => {
      FetchData(0, window.innerWidth > 1535 ? 24 : 8, {
        ...filter,
        name: value.slice(0, 1).toUpperCase() + value.slice(1),
      });
    }, 1000),
    [filter, FetchData] // Dependencies: filter and FetchData
  );

  const handleInfiniteScroll = useCallback(
    debounce((value: number) => {
      FetchData(page * rowsPerPage, value + 8, {
        ...filter,
      });
    }, 500),
    [filter, FetchData] // Dependencies: filter and FetchData
  );

  const countries = useMemo(() => {
    return data?.countries?.edges?.map((edge) => edge.node) || [];
  }, [data]);

  if (error) return <Error />;

  const handleFilter = (event: SelectChangeEvent, type?: string) => {
    const value = event.target.value;

    switch (type) {
      case "search":
        // Call the debounced search function
        handleDebouncedSearch(value);
        setFilter({ ...filter, name: value });
        break;
      default:
        FetchData(0, window.innerWidth > 1535 ? 24 : 8, {
          ...filter,
          region: value,
        });
        setFilter({ ...filter, region: value });
        break;
    }

    setPage(0);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    FetchData(newPage * rowsPerPage, window.innerWidth > 1535 ? 24 : 8, filter);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    FetchData(0, window.innerWidth > 1535 ? 24 : 8, filter);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const pageActive: boolean =
    filter.name.length < 1 && filter.region.length < 4 ? true : false;

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (
      scrollHeight - scrollTop <= clientHeight + 1 &&
      (countries.length < rowsPerPage || !pageActive)
    ) {
      handleInfiniteScroll(countries.length);
    }
  };

  return (
    <>
      <SearchBar filter={filter} handleFilter={handleFilter} />
      {loading ? (
        <Loading />
      ) : (
        <>
          {pageActive && (
            <TablePagination
              component="div"
              count={250}
              page={page}
              rowsPerPageOptions={
                window.innerWidth > 1535 ? [24, 40, 104] : [8, 24, 40, 104]
              }
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={null}
            />
          )}
          <Box
            sx={{
              height: "70vh",
              overflow: "auto",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: 2,
            }}
            onScroll={handleScroll}
          >
            <CountryList
              {...{
                page,
                loading,
                pageActive,
                countries,
                rowsPerPage,
                handleFilter,
                handleChangePage,
                handleChangeRowsPerPage,
              }}
            />
          </Box>
        </>
      )}
    </>
  );
};
