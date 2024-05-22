/* eslint-disable linebreak-style */
import React, { memo, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  useTheme,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import { range as _range } from 'lodash';
import PropTypes from 'prop-types';

const getRangePager = (totalPages: number, currentPage: number, largeScreen = true) => {
  let startPage;
  let endPage;
  const showingPaging = largeScreen ? 5 : 4;

  if (totalPages <= showingPaging) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= Math.ceil(showingPaging / 2)) {
    startPage = 1;
    endPage = showingPaging;
  } else if (currentPage + 2 >= totalPages) {
    startPage = largeScreen ? totalPages - 4 : totalPages - 2;
    endPage = totalPages;
  } else {
    startPage = largeScreen ? currentPage - 2 : currentPage - 1;
    endPage = largeScreen ? currentPage + 2 : currentPage + 1;
  }

  return _range(startPage, endPage + 1);
};

interface ItemProps {
  val: number | string;
  isActive?: boolean;
}

const Item = ({ val, isActive = false }: ItemProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingY: '5px',
        paddingX: '10px',
        borderRadius: '5px',
        backgroundColor: isActive ? theme.palette.primary.main : 'transparent',
      }}
    >
      <Typography
        sx={{
          color: isActive ? theme.palette.common.white : theme.palette.text.secondary,
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '20px',
        }}
      >
        {val}
      </Typography>
    </Box>
  );
};

interface PageItemsProps {
  upperBound: number;
  currentPage: number;
  onPageClicked: (page: number) => void;
  isLargeScreen: boolean;
}

const PageItems = ({
  upperBound,
  currentPage,
  onPageClicked,
  isLargeScreen,
}: PageItemsProps) => {
  const pageNum = getRangePager(upperBound, currentPage, isLargeScreen);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {pageNum[0] !== 1 && (
        <>
          <IconButton onClick={() => onPageClicked(1)}>
            <Item val="1" />
          </IconButton>
          <Item val="..." />
        </>
      )}

      {pageNum.map((val: any) => (
        <IconButton
          key={val}
          disabled={val === currentPage}
          onClick={() => onPageClicked(val)}
          sx={{ marginX: '5px' }}
        >
          <Item val={val} isActive={val === currentPage} />
        </IconButton>
      ))}

      {pageNum[pageNum.length - 1] !== upperBound && (
        <>
          <Item val="..." />
          <IconButton onClick={() => onPageClicked(upperBound)}>
            <Item val={upperBound} />
          </IconButton>
        </>
      )}
    </Box>
  );
};

interface PaginationProps {
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
  };
  onPressPrev: (url: string | null) => void;
  onPressNext: (url: string | null) => void;
  onChangePage: (page: number) => void;
  onChangeRow: (rows: number) => void;
  rowsPerPage: number[];
}

const Pagination = ({
  pagination,
  onPressPrev,
  onPressNext,
  onChangePage,
  onChangeRow,
  rowsPerPage,
}: PaginationProps) => {
  const theme = useTheme();
  const isLargeScreen = window.innerWidth > theme.breakpoints.values.md;
  const [rowPage, setRowPage] = useState<number>(5);

  const handleRowChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    onChangeRow(value);
    setRowPage(value);
  };

  return pagination === null || pagination.total === 0 ? null : (
    <Box sx={{ display: 'flex', flexDirection: 'row', zIndex: -1 }}>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography
          sx={{
            marginTop: 2,
            color: theme.palette.text.secondary,
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: '20px',
          }}
        >
          Rows per page
        </Typography>
        <Select
          value={pagination.per_page || rowPage}
          onChange={handleRowChange}
          sx={{
            marginLeft: 2,
            height: '35px',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 1,
          }}
        >
          {rowsPerPage.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          flex: 2,
          display: 'flex',
          flexDirection: isLargeScreen ? 'row' : 'column',
          justifyContent: isLargeScreen ? 'left' : 'center',
          alignItems: 'center',
          margin: 1,
        }}
      >
        <IconButton
          disabled={!pagination.prev_page_url}
          onClick={() => onPressPrev(pagination.prev_page_url)}
          sx={{ marginRight: 1 }}
        >
          <Item val="Prev" />
        </IconButton>

        <PageItems
          isLargeScreen={isLargeScreen}
          upperBound={pagination.last_page}
          currentPage={pagination.current_page}
          onPageClicked={onChangePage}
        />

        <IconButton
          disabled={!pagination.next_page_url}
          onClick={() => onPressNext(pagination.next_page_url)}
          sx={{ marginLeft: 1 }}
        >
          <Item val="Next" />
        </IconButton>
        <Box
          sx={{
            paddingTop: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingBottom: '5px',
          }}
        >
          <Typography
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
            }}
          >
            Total: {pagination.total}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPressNext: PropTypes.func.isRequired,
  onPressPrev: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRow: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.array.isRequired,
};

export default memo(Pagination);


// import * as React from 'react';
// import TablePagination from '@mui/material/TablePagination';

// interface PaginationCompleteProps {
//   page: number;
//   onChangePage: () => void;
//   rowsPerPage: number;
//   totalItems: number;
//   handleChangeRowsPerPage: () => void;
// }

// const PaginationComplete: React.FC<PaginationCompleteProps> = ({
//   page,
//   onChangePage,
//   rowsPerPage,
//   handleChangeRowsPerPage,
//   totalItems,
// }) => {

//   return (
//     <TablePagination
//       component="div"
//       count={totalItems}
//       page={page}
//       onPageChange={onChangePage}
//       rowsPerPage={rowsPerPage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//     />
//   );
// }

// export default PaginationComplete;
