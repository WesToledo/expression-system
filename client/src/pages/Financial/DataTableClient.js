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

import DataTable from "~/components/DataTable";

const DataTableClients = ({ clients, getClients }) => {
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
      name: "name",
      label: "Nome",
      options: {
        display: true,
      },
    },
    {
      name: "reference_name",
      label: "Nome de referência",
      options: {
        display: true,
      },
    },
    {
      name: "address",
      label: "Endereço",
      options: {
        display: true,
      },
    },
    {
      name: "actions",
      label: "Mais informações",
      options: {
        display: true,
        filter: false,
        viewColumns: false,
      },
    },
  ];

  const currentRow = useStateLink({
    id: null,
    hrefEdit: "/clientes/editar/",
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
  }, [clients]);

  function refreshDataTable() {
    function formatAddress({ via, number, neighborhood, state, city }) {
      return (
        via + ", " + number + ", " + neighborhood + ", " + state + ", " + city
      );
    }

    var rows = [];
    clients.map((client) => {
      rows.push({
        ...client,
        address: formatAddress(client.address),
        actions: (
          <IconButton href={"/financeiro/" + client._id}>
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
        tooltipEdit={"Editar Cliente"}
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

export default DataTableClients;
