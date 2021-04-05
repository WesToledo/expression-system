import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { saveAs } from "file-saver";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "tabler-react";

import { Typography, DialogActions, Dialog, Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
  dangerNotification,
  successNotification,
} from "~/services/notification";
import api from "~/services/api";
import { getDay, getMonthName } from "~/services/functions";

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
  const [openNewTab, setOpenNewTab] = useState({ open: false });

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
      setOpenNewTab({ open: true });
      window.location.reload(false);
    } catch (err) {
      dangerNotification("Erro", "Erro ao efetuar pagamento");
    }
  }

  Font.register({
    family: "Open Sans",
    fonts: [
      {
        src:
          "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
      },
      {
        src:
          "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
        fontWeight: 600,
      },
    ],
  });
  // Create styles
  const styleDoc = StyleSheet.create({
    header: {
      fontFamily: "Open Sans",
      height: "10%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerImg: { width: "50px", height: "50px", margin: "20" },
    headerTextContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 5,
    },
    headerTextStyle: { fontWeight: 600 },
    infoContainer: {
      marginLeft: "5%",
      display: "block",
    },
    infoText: { fontSize: 12, paddingVertical: "5px" },
    container: {
      fontFamily: "Open Sans",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    table: {
      display: "table",
      width: "90%",
      marginHorizontal: 20,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#e0e0e",
    },
    tableRow: { margin: "auto", flexDirection: "row" },
    tableColHeader: {
      width: "20%",
      borderColor: "#e0e0e",
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol: {
      width: "20%",
      borderStyle: "solid",
      borderColor: "#e0e0e",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderBottomWidth: 0,
    },
    tableCellHeader: {
      fontWeight: "bold",
      margin: "auto",
      fontSize: 12,
      padding: 8,
    },
    tableCell: { margin: "auto", marginVertical: 5, fontSize: 10 },
    footerContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginRight: "10%",
    },
    footerText: { padding: 5, fontSize: 12, fontWeight: 600 },
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4">
        <View style={styleDoc.header}>
          <Image style={styleDoc.headerImg} src="/assets/delivery-box.png" />
          <View style={styleDoc.headerTextContainer}>
            <Text style={styleDoc.headerText}>
              {getMonthName(rowsData[0].month) + " - " + rowsData[0].year}
            </Text>
          </View>
        </View>
        <View style={styleDoc.infoContainer}>
          <Text style={styleDoc.infoText}>
            Cliente: {rowsData[0].client.name}
          </Text>
        </View>
        <View style={styleDoc.container}>
          <View style={styleDoc.table}>
            {/* TableHeader */}
            <View style={styleDoc.tableRow}>
              <View style={styleDoc.tableColHeader}>
                <Text style={styleDoc.tableCellHeader}>Dia</Text>
              </View>
              <View style={styleDoc.tableColHeader}>
                <Text style={styleDoc.tableCellHeader}>Destinatário</Text>
              </View>
              <View style={styleDoc.tableColHeader}>
                <Text style={styleDoc.tableCellHeader}>Quantidade</Text>
              </View>
              <View style={styleDoc.tableColHeader}>
                <Text style={styleDoc.tableCellHeader}>Volumes</Text>
              </View>
              <View style={styleDoc.tableColHeader}>
                <Text style={styleDoc.tableCellHeader}>Total</Text>
              </View>
            </View>
            {/* TableContent */}
            {rowsData.map((row) => (
              <View style={styleDoc.tableRow}>
                <View style={styleDoc.tableCol}>
                  <Text style={styleDoc.tableCell}>{getDay(row.date)}</Text>
                </View>
                <View style={styleDoc.tableCol}>
                  <Text style={styleDoc.tableCell}>{row.receiver}</Text>
                </View>
                <View style={styleDoc.tableCol}>
                  <Text style={styleDoc.tableCell}>{row.amount}</Text>
                </View>
                <View style={styleDoc.tableCol}>
                  <Text style={styleDoc.tableCell}>{row.volumes}</Text>
                </View>
                <View style={styleDoc.tableCol}>
                  <Text style={styleDoc.tableCell}>{row.total}</Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styleDoc.footerContainer}>
            <Text style={styleDoc.footerText}>
              TOTAL: R${" "}
              {rowsData
                .map((row) => Number(row.total.substring(3).replace(",", ".")))
                .reduce((total, num) => total + num)
                .toFixed(2)
                .replace(".", ",")}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

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
      <div>
        <PDFDownloadLink
          document={<MyDocument />}
          fileName={"Comprovante de pagamento"}
        >
          {({ blob, url, loading, error }) => {
            if (!loading)
              if (openNewTab.open && !openNewTab.hasOwnProperty("aux")) {
                setOpenNewTab({ aux: true });
                window.open(url, "_blank");
                saveAs(
                  url,
                  "Comprovante de pagamento " +
                    rowsData[0].client.name +
                    " - " +
                    getMonthName(rowsData[0].month)
                );
              }
            return loading ? "" : "";
          }}
        </PDFDownloadLink>
      </div>
    </Dialog>
  );
};
export default forwardRef(PayModal);
