import React from "react";
import { Box, Pagination } from "@mui/material";
import classNames from "classnames";

interface FilmPaginationProps {
  totalPages: number;
  page: number;
  darkMode: boolean;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const FilmPagination: React.FC<FilmPaginationProps> = ({ totalPages, page, darkMode, handlePageChange }) => {
  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="center"
      className={classNames(darkMode ? "text-white" : "")}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{
          ".MuiPaginationItem-root": {
            color: darkMode ? "white" : "black",
            "&.Mui-selected": {
              backgroundColor: darkMode ? "#3f51b5" : "#1976d2",
              color: "white",
            },
          },
        }}
      />
    </Box>
  );
};

export default FilmPagination;
