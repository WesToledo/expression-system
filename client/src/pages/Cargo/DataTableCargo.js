import React, { useEffect, useState } from "react";
import { useStateLink } from "@hookstate/core";
import { Button } from "tabler-react";

import IconButton from "@material-ui/core/IconButton";
import { KeyboardArrowRight } from "@material-ui/icons";

import { Modal } from "react-bootstrap";

import api from "services/api";

import {
  dangerNotification,
  successNotification,
} from "~/services/notification";

import { getFormatedDate } from "~/services/functions";

import DataTable from "~/components/DataTable";

const DataTableCargo = ({ cargos, getCargos, history }) => {
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
      name: "date",
      label: "Data",
      options: {
        display: true,
      },
    },
    {
      name: "amount",
      label: "Quantidade de volumes",
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
      name: "actions",
      label: "Ações",
      options: {
        display: true,
        filter: false,
        viewColumns: false,
      },
    },
  ];

  const currentRow = useStateLink({
    id: null,
    hrefEdit: "/carregamento/editar/",
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
          id: data[rowSelected].id,
        });
      }
    }
  }, [rowSelected]);

  useEffect(() => {
    refreshDataTable();
  }, [cargos]);

  function refreshDataTable() {
    var rows = [];
    cargos.map((cargo) => {
      rows.push({
        ...cargo,
        date: getFormatedDate(cargo.date),
        total: "R$ " + cargo.total.toFixed(2).replace(".", ","),
        amount: cargo.packages.length,
        actions: (
          <IconButton href={"/entregas/" + cargo._id}>
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
        ),
      });
    });
    setData(rows);
  }

  useEffect(() => {
    console.log(currentRow.get());
    console.log(cargos);
  }, [currentRow]);

  return (
    <DataTable
      title={""}
      tooltipEdit={"Editar volume"}
      tooltipDelete={"Deletar volume"}
      tooltipAdd={"Adicionar novo volume"}
      options={options}
      data={data}
      currentRow={currentRow}
      columns={columns}
      hrefAdd={"/carregamento/adicionar"}
      showEdit={false}
      showAdd={false}
    />
  );
};

export default DataTableCargo;
