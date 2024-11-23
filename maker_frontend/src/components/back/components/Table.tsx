"use client";

// Next.js
import { useParams, useRouter } from "next/navigation";

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
  Checkbox,
  styled,
  Link,
} from "@mui/material";

// Redux
import { useSelector, useDispatch } from "@/redux/store";
import { tableSlice } from "@/redux/slices/back/tableSlice";

// Config
import TableColumns from "@/config/table-column";
import { ReactNode } from "react";

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

const MyTable = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { page } = params as { page: string };

  // Redux State
  const {
    updateTable,
    loading,
    tablePage,
    rowsPerPage,
    orderBy,
    order,
    tableSelected,
  } = useSelector((state) => state.table);
  const { items, dataCount } = useSelector((state) => state.listData);

  // Redux Actions
  const {
    setUpdateTable,
    setTablePage,
    setRowsPerPage,
    setOrderBy,
    setOrder,
    setTableSelected,
  } = tableSlice.actions;

  const columns = TableColumns[page as TableColumnKeys];

  const handleSort = (column: string) => {
    dispatch(setOrderBy(column));
    dispatch(setOrder(order === "asc" ? "desc" : "asc"));
    dispatch(setUpdateTable(!updateTable));
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    dispatch(setTablePage(newPage));
    dispatch(setUpdateTable(!updateTable));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setTablePage(0));
    dispatch(setUpdateTable(!updateTable));
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id);
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

  const handleGoToEdit = (id: number) => {
    router.push(`/backend/${page}/edit?id=${id}`);
  };

  const renderRow = (
    column: (typeof TableColumns)[TableColumnKeys][number] & { link?: boolean },
    row: (typeof items)[number]
  ): ReactNode => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value = row as any;
    column.id.split(".").forEach((key) => {
      if (!value) return;
      value = value[key];
    });

    return (
      <TableCell key={column.id}>
        {column.link ? (
          <Link
            underline="hover"
            sx={{ cursor: "pointer" }}
            onClick={() => handleGoToEdit(row.id)}
          >
            <Typography variant="body2">{value}</Typography>
          </Link>
        ) : (
          <Typography variant="body2">{value}</Typography>
        )}
      </TableCell>
    );
  };

  return (
    <>
      <CustomTable>
        <CustomTableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={
                  items?.length ? tableSelected.length === items?.length : false
                }
                indeterminate={
                  tableSelected.length > 0 &&
                  tableSelected.length < items?.length
                }
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell padding="checkbox">#</TableCell>
            {columns?.map((column) => (
              <TableCell
                key={column.id}
                width={columns.length === 1 ? "100%" : undefined}
              >
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={(columns?.length ?? 0) + 2} align="center">
                <Typography variant="body2">載入中...</Typography>
              </TableCell>
            </TableRow>
          ) : dataCount > 0 ? (
            items.map((row, index) => (
              <CustomTableRow key={index} selected={isSelected(row.id)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected(row.id)}
                    onChange={(event) => handleSelect(event, row.id)}
                  />
                </TableCell>
                <TableCell padding="checkbox">{index + 1}</TableCell>
                {columns?.map((column) =>
                  // <TableCell key={column.id}>
                  //   {row[column.id as keyof typeof row]}
                  // </TableCell>
                  renderRow(column, row)
                )}
              </CustomTableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={(columns?.length ?? 0) + 2} align="center">
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
