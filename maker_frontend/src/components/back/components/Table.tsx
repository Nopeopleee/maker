"use client";

// Next.js
import { useParams } from "next/navigation";

// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
  IconButton,
  Checkbox,
  styled,
} from "@mui/material";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import {
  setLoading,
  setUpdateTable,
  setTablePage,
  setRowsPerPage,
  setOrderBy,
  setOrder,
  setTableSelected,
} from "@/redux/slices/back/tableSlice";

// Config
import TableColumns from "@/config/table-column";

type TableColumnKeys = keyof typeof TableColumns;

const CustomTable = styled(Table)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.dark}`,
  borderCollapse: "collapse",
  "& .MuiTableRow-root:last-child .MuiTableCell-root": {
    borderBottom: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const data = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `John Doe ${index}`,
  email: `qwe ${index}`,
  created_at: `2021-10-01`,
}));

const MyTable = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { page } = params as { page: string };
  const {
    loading,
    updateTable,
    tablePage,
    rowsPerPage,
    orderBy,
    order,
    tableSelected,
  } = useSelector((state) => state.table);
  const { items, dataCount } = useSelector((state) => state.listData);

  const columns = TableColumns[page as TableColumnKeys];

  const handleSort = (column: string) => {
    dispatch(setOrderBy(column));
    dispatch(setOrder(order === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    dispatch(setTablePage(newPage));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      dispatch(setTableSelected(newSelected));
      return;
    }
    dispatch(setTableSelected([]));
  };

  const isSelected = (id: number) => tableSelected.indexOf(id) !== -1;

  const handleSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const selectedIndex = tableSelected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(tableSelected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(tableSelected.slice(1));
    } else if (selectedIndex === tableSelected.length - 1) {
      newSelected = newSelected.concat(tableSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        tableSelected.slice(0, selectedIndex),
        tableSelected.slice(selectedIndex + 1)
      );
    }

    dispatch(setTableSelected(newSelected));
  };

  return (
    <>
      <CustomTable>
        <CustomTableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={tableSelected.length === data.length}
                indeterminate={
                  tableSelected.length > 0 && tableSelected.length < data.length
                }
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell padding="checkbox">#</TableCell>
            {columns?.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => handleSort(column.id)}
                >
                  <Typography variant="button">{column.label}</Typography>
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {dataCount > 0 ? (
            items.map((row, index) => (
              <CustomTableRow key={index} selected={isSelected(row.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row.id)}
                    onChange={(event) => handleSelect(event, row.id)}
                  />
                </TableCell>
                <TableCell padding="checkbox">{index + 1}</TableCell>
                {columns?.map((column) => (
                  <TableCell key={column.id}>
                    {row[column.id as keyof typeof row]}
                  </TableCell>
                ))}
              </CustomTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length ?? 0 + 2} align="center">
                <Typography variant="body2">沒有資料</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </CustomTable>
      <TablePagination
        component="div"
        count={dataCount}
        onPageChange={handlePageChange}
        page={tablePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[15, 25, 50]}
        onRowsPerPageChange={handleRowsPerPageChange}
        labelRowsPerPage="每頁顯示:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} 共 ${count}`
        }
        showFirstButton
        showLastButton
      />
    </>
  );
};

export default MyTable;
