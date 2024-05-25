import React, { useEffect, useState } from 'react';

import { EventsData } from '@/libs/features/wikiEvents/eventsSlice';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material';

interface Data {
  id: number;
  name: string;
  age: number;
}

enum DIRECTION {
  ASC = 'asc',
  DESC = 'desc',
}

enum SORT_PROP {
  YEAR = 'year',
  TEXT = 'text',
}

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexBasis: 'calc(50% - 32px)',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    minHeight: 485,
  },
  title: {
    pt: 2,
    pl: 2,
    color: 'primary.main',
  },
  cell: {
    year: {
      maxWidth: 60,
      width: 60,
    },
  },
  pagination: {},
};

type SortableTableProps = { list: Array<EventsData>; title?: string; disableYear?: boolean };

const SortableTable = ({ list, title, disableYear = false }: SortableTableProps) => {
  const [data, setData] = useState<Array<EventsData>>(list);
  const [orderBy, setOrderBy] = useState<SORT_PROP>(SORT_PROP.YEAR);
  const [order, setOrder] = useState<DIRECTION>(DIRECTION.ASC);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleSort = (property: SORT_PROP) => {
    const isAsc = orderBy === property && order === DIRECTION.ASC;
    setOrderBy(property);
    setOrder(isAsc ? DIRECTION.DESC : DIRECTION.ASC);
    setData((prevData) =>
      prevData.slice().sort((a, b) => {
        if (isAsc) {
          return a[property] > b[property] ? 1 : -1;
        } else {
          return a[property] < b[property] ? 1 : -1;
        }
      })
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setData(list);
  }, [list]);

  return (
    <Paper sx={styles.paper}>
      <TableContainer>
        {title && (
          <Typography variant="h6" id={title} sx={styles.title}>
            {title}
          </Typography>
        )}
        <Table size="small">
          <TableHead>
            <TableRow>
              {!disableYear && (
                <TableCell sx={styles.cell.year}>
                  <TableSortLabel
                    active={orderBy === SORT_PROP.YEAR}
                    direction={order}
                    onClick={() => handleSort(SORT_PROP.YEAR)}
                  >
                    Year
                  </TableSortLabel>
                </TableCell>
              )}

              <TableCell>
                <TableSortLabel
                  active={orderBy === SORT_PROP.TEXT}
                  direction={order}
                  onClick={() => handleSort(SORT_PROP.TEXT)}
                >
                  Description
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(({ year, text }) => (
                <TableRow key={text}>
                  {!disableYear && <TableCell sx={styles.cell.year}>{year}</TableCell>}
                  <TableCell>{text}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        sx={styles.pagination}
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Items:"}
      />
    </Paper>
  );
};

export default SortableTable;
