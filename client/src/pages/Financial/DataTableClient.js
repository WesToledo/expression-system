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

  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: undefined,
  });

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

  const handleDelete = async () => {
    try {
      await api.delete("/client/remove/" + modalDelete.id);
      successNotification("Sucesso", "Sucesso ao deletar cliente");

      getClients();
      setModalDelete({ id: undefined, show: false });
      setRowSelected([]);
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao deletar cliente");
    }
  };

  return (
    <>
      <DataTable
        title={""}
        tooltipEdit={"Editar Cliente"}
        tooltipDelete={"Deletar Cliente"}
        tooltipAdd={"Cadastrar novo cliente"}
        options={options}
        data={data}
        currentRow={currentRow}
        columns={columns}
        hrefAdd={"/clientes/cadastrar"}
        setModalDelete={setModalDelete}
        showEdit={false}
        showAdd={false}
      />
    </>
  );
};

export default DataTableClients;
