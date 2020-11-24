import React from "react";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { getFormatedDate } from "~/services/functions";

const useRowStyles = makeStyles({
  container: {
    minWidth: 600,
  },

  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell component="th" scope="row">
        {row.receiver}
      </TableCell>
      <TableCell align="center">{row.volumes}</TableCell>
      <TableCell align="center">
        {getFormatedDate(new Date(row.date))}
      </TableCell>
      <TableCell align="center">{row.total}</TableCell>
    </TableRow>
  );
}

export default function CollapsibleTable({ rowsData }) {
  const classes = useRowStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Destinatário</TableCell>
            <TableCell align="left">Volumes</TableCell>
            <TableCell align="left">Data</TableCell>
            <TableCell align="left">Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((row) => (
            <Row key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
