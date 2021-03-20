import React, { useEffect, useState } from "react";
import { useStateLink } from "@hookstate/core";
import { Button } from "tabler-react";

import IconButton from "@material-ui/core/IconButton";
import { KeyboardArrowRight } from "@material-ui/icons";

import {
  dangerNotification,
  successNotification,
} from "~/services/notification";

import { getMonthName } from "~/services/functions";

import DataTable from "~/components/DataTable";

const DataTableMonths = ({ months, getMonths }) => {
  const [data, setData] = useState([]);
  const [rowSelected, setRowSelected] = useState();
  const columns = [
    {
      name: "id",
      options: {
        filter: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "month",
      label: "Mês",
      options: {
        display: true,
      },
    },
    {
      name: "year",
      label: "Ano",
      options: {
        display: true,
      },
    },
    {
      name: "count",
      label: "Número de entregas",
      options: {
        display: true,
      },
    },
    {
      name: "total",
      label: "Valor Total",
      options: {
        display: true,
      },
    },
    {
      name: "not_paid_value",
      label: "Valor em haver",
      options: {
        display: true,
      },
    },
    {
      name: "paid_value",
      label: "Valor Recebido",
      options: {
        display: true,
      },
    },
    {
      name: "actions",
      label: "Mais detalhes",
      options: {
        display: true,
        filter: false,
        viewColumns: false,
      },
    },
  ];

  const currentRow = useStateLink({
    id: null,
    hrefEdit: "/months/editar/",
  });

  const options = {
    selectableRowsOnClick: false,
    selectableRows: "none",
    rowsSelected: rowSelected,
    onRowSelectionChange: (rowsSelected, allRows) => {
      //return de indexes of the selected rows
      setRowSelected(allRows.map((row) => row.dataIndex));
    },
  };

  useEffect(() => {
    if (data.length) {
      if (rowSelected.length) {
        currentRow.set({
          ...currentRow.get(),
          id: data[rowSelected]._id,
        });
      }
    }
  }, [rowSelected]);

  useEffect(() => {
    refreshDataTable();
  }, [months]);

  function refreshDataTable() {
    var rows = [];
    months.map((month) => {
      rows.push({
        month: getMonthName(month._id.month),
        year: month._id.year,
        count: month.count + " pacote(s)",
        total: "R$ " + month.total.toFixed(2).replace(".", ","),
        paid_value: "R$ " + month.paid_value.toFixed(2).replace(".", ","),
        not_paid_value:
          "R$ " + month.not_paid_value.toFixed(2).replace(".", ","),
        actions: (
          <IconButton
            href={
              "/financeiro-empresa/" + month._id.year + "/" + month._id.month
            }
          >
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
        ),
      });
    });
    setData(rows);
  }

  return (
    <>
      <DataTable
        title={""}
        options={options}
        data={data}
        currentRow={currentRow}
        columns={columns}
        showEdit={false}
        showAdd={false}
      />
    </>
  );
};

export default DataTableMonths;
