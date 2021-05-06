import React, { useState } from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PrintIcon from "@material-ui/icons/Print";

import { saveAs } from "file-saver";

import { getMonthName, getDay } from "~/services/functions";

import { withStyles } from "@material-ui/core/styles";

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

const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

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

const MyDocument = ({ rowsData }) => (
  <Document>
    <Page size="A4">
      <View style={styleDoc.header}>
        <Image style={styleDoc.headerImg} src="/assets/delivery-box.png" />

        <View style={styleDoc.headerTextContainer}>
          <Text style={styleDoc.headerTextLeft}>
            Expression Transportadora -{" "}
          </Text>
          <Text style={styleDoc.headerText}>
            {getMonthName(rowsData[0].month) + " - " + rowsData[0].year}
          </Text>
        </View>
      </View>
      <View style={styleDoc.infoContainer}>
        <Text style={styleDoc.infoText}>
          Cliente - {rowsData[0].client.name}
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
          {rowsData
            .sort((a, b) =>
              getDay(a.date) > getDay(b.date)
                ? 1
                : getDay(b.date) > getDay(a.date)
                ? -1
                : 0
            )
            .map((row) => (
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

function CustomToolbarSelect({
  classes,
  selectedRowsData,
  setSelectedRows,
  handleOpenModal,
}) {
  const [openNewTab, setOpenNewTab] = useState({ open: false });
  return (
    <div className={classes.iconContainer}>
      <Tooltip title={"Pagar"}>
        <IconButton
          className={(classes.iconButton, "text-success")}
          onClick={() => handleOpenModal(selectedRowsData)}
        >
          <AttachMoneyIcon className={classes.icon} />
        </IconButton>
      </Tooltip>

      <Tooltip title={"Imprimir"}>
        <IconButton
          className={(classes.iconButton, "text-success")}
          onClick={() => {
            console.log(selectedRowsData);
            setOpenNewTab({ open: true });
          }}
        >
          <PrintIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
      <div>
        <PDFDownloadLink
          document={<MyDocument rowsData={selectedRowsData} />}
          fileName={"Comprovante de pagamento"}
        >
          {({ blob, url, loading, error }) => {
            if (!loading)
              if (openNewTab.open && !openNewTab.hasOwnProperty("aux")) {
                setOpenNewTab({ aux: true });
                window.open(url, "_blank");
                saveAs(
                  url,
                  "Lista de volumes - " +
                    selectedRowsData[0].client.name +
                    " - " +
                    getMonthName(selectedRowsData[0].month)
                );
              }
            return loading ? "" : "";
          }}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default withStyles(defaultToolbarSelectStyles, {
  name: "CustomToolbarSelect",
})(CustomToolbarSelect);
