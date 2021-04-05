import React, { useState } from "react";

import { saveAs } from "file-saver";

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
import Tooltip from "@material-ui/core/Tooltip";
import PrintIcon from "@material-ui/icons/Print";

import { withStyles } from "@material-ui/core/styles";

import { getMonthName, getFormatedDate } from "~/services/functions";

const defaultToolbarSelectStyles = {
  iconButton: {},
  iconContainer: {
    marginRight: "24px",
  },
  inverseIcon: {
    transform: "rotate(90deg)",
  },
};

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

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4">
      <View style={styleDoc.header}>
        <Image style={styleDoc.headerImg} src="/assets/delivery-box.png" />
        <View style={styleDoc.headerTextContainer}>
          <Text style={styleDoc.headerText}>
            Data: {getFormatedDate(data[0].date)}
          </Text>
        </View>
      </View>
      <View style={styleDoc.infoContainer}>
        <Text style={styleDoc.infoText}>Entregas</Text>
      </View>
      <View style={styleDoc.container}>
        <View style={styleDoc.table}>
          {/* TableHeader */}
          <View style={styleDoc.tableRow}>
            <View style={styleDoc.tableColHeader}>
              <Text style={styleDoc.tableCellHeader}>Cliente</Text>
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
              <Text style={styleDoc.tableCellHeader}>OBS</Text>
            </View>
          </View>
          {/* TableContent */}
          {data.map((row) => (
            <View style={styleDoc.tableRow}>
              <View style={styleDoc.tableCol}>
                <Text style={styleDoc.tableCell}>{row.client}</Text>
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
                <Text style={styleDoc.tableCell}>{row.obs}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

function CustomToolbarSelect({ classes, selectedRowsData, setSelectedRows }) {
  const [openNewTab, setOpenNewTab] = useState({ open: false });

  function formatDate(ISODate) {
    var date = new Date(ISODate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return dt + "-" + month + "-" + year;
  }

  return (
    <div className={classes.iconContainer}>
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
          document={<MyDocument data={selectedRowsData} />}
          fileName={"Lista de Entregas"}
        >
          {({ blob, url, loading, error }) => {
            if (!loading)
              if (openNewTab.open && !openNewTab.hasOwnProperty("aux")) {
                setOpenNewTab({ aux: true });
                window.open(url, "_blank");
                saveAs(
                  url,
                  "Lista de entregas - " + formatDate(selectedRowsData[0].date)
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
