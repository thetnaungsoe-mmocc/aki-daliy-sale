import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";
import { styled } from '@mui/material/styles';


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.tableHeader.main,
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
export  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.tableRow.main,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));