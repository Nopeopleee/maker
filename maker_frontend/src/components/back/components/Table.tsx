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

const data = [
  {
    name: "John Doe",
    email: "qwe",
    created_at: "2021-10-01",
  },
  {
    name: "Jane Doe",
    email: "asd",
    created_at: "2021-10-02",
  },
  {
    name: "Foo Bar",
    email: "zxc",
    created_at: "2021-10-03",
  },
  {
    name: "Baz Qux",
    email: "rty",
    created_at: "2021-10-04",
  },
  {
    name: "Quux Corge",
    email: "fgh",
    created_at: "2021-10-05",
  },
];

const MyTable = () => {
  const params = useParams();
  const { page } = params as { page: string };

  const columns = TableColumns[page as TableColumnKeys];

  return (
    <>
      <CustomTable>
        <CustomTableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell padding="checkbox">#</TableCell>
            {columns?.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel>{column.label}</TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {data.map((row, index) => (
            <CustomTableRow key={index}>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell padding="checkbox">{index + 1}</TableCell>
              {columns?.map((column) => (
                <TableCell key={column.id}>
                  {row[column.id as keyof typeof row]}
                </TableCell>
              ))}
            </CustomTableRow>
          ))}
        </TableBody>
      </CustomTable>
      <TablePagination
        component="div"
        count={data.length}
        onPageChange={() => {}}
        page={0}
        rowsPerPage={15}
        rowsPerPageOptions={[15, 25, 50]}
        onRowsPerPageChange={() => {}}
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
