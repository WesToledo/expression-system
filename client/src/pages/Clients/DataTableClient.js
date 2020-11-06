import React, { useEffect, useState } from "react";
import { useStateLink } from "@hookstate/core";
import { Button } from "tabler-react";

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
      name: "fix_phone",
      label: "Telefone Fixo",
      options: {
        display: true,
      },
    },
    {
      name: "cel_phone",
      label: "Telefone Celular",
      options: {
        display: true,
      },
    },
  ];

  const currentRow = useStateLink({
    id: null,
    hrefEdit: "/clientes/editar/",
  });

  const options = {
    selectableRowsOnClick: true,
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
        showEdit={true}
      />

      <Modal show={modalDelete.show} animation={true}>
        <Modal.Header>
          <Modal.Title>Excluir Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir o cliente?</Modal.Body>
        <Modal.Footer>
          <Button
            color="danger"
            icon="x"
            onClick={() => {
              console.log(modalDelete);
              setModalDelete({ id: undefined, show: false });
            }}
          >
            Não
          </Button>
          <Button
            color="success"
            icon="trash"
            icon="check"
            onClick={handleDelete}
          >
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DataTableClients;
