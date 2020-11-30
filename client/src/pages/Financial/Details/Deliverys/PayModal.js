import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "tabler-react";

import { Typography, DialogActions, Dialog, Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import api from "~/services/api";
import { dangerNotification, successNotification } from "~/services/notification";

import DataTable from "./PayModalTable";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const PayModal = (props, ref) => {
  const [open, setOpen] = useState(false);
  const [rowsData, setRowsData] = useState([]);

  const handleClickOpen = useCallback((selectedRowsData) => {
    setOpen(true);
    setRowsData(selectedRowsData);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleClickOpen,
    };
  });

  async function handleConfirmPayment() {
    try {
      await api.put("/financial/make-payment", {
        transactions: rowsData.map((row) => row._id),
      });
      successNotification("Sucesso", "Sucesso ao efetuar pagamento");
      handleClose();
      window.location.reload(false);
    } catch (err) {
      dangerNotification("Erro", "Erro ao efetuar pagamento");
    }
  }

  return (
    <Dialog
      maxWidth="md"
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Entregas realizadas
      </DialogTitle>
      <DialogContent dividers>
        <DataTable rowsData={rowsData} />

        <Grid
          container
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
          spacing={4}
        >
          <Grid item></Grid>
          <Grid item>
            <Typography variant="h6">
              Total:
              {rowsData.length !== 0
                ? rowsData
                    .map((row) =>
                      Number(row.total.substring(3).replace(",", "."))
                    )
                    .reduce((total, num) => total + num)
                    .toFixed(2)
                    .replace(".", ",")
                : 0}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          color="success"
          className="ml-auto margin-btn"
          icon="dollar-sign"
          onClick={handleConfirmPayment}
        >
          Confirmar Pagamento
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default forwardRef(PayModal);
