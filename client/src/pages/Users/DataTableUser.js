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

const DataTableusers = ({ users, getUsers }) => {
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
      name: "login",
      label: "Login",
      options: {
        display: true,
      },
    },
    {
      name: "type",
      label: "Tipo",
      options: {
        display: true,
      },
    },
  ];

  const currentRow = useStateLink({
    id: null,
    hrefEdit: "/usuarios/editar/",
  });

  const options = {
    selectableRowsOnClick: true,
    rowsSelected: rowSelected,
    onRowsSelect: (rowsSelected, allRows) => {
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
  }, [users]);

  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: undefined,
  });

  function refreshDataTable() {
    var rows = [];
    users.map((user) => {
      if (user._id !== localStorage.getItem("user_id")) {
        const { _id, name, login, type } = user;
        rows.push({
          _id,
          name,
          login,
          type: type === "DeliverMan" ? "Entregador" : "Administrador",
        });
      }
    });
    setData(rows);
  }

  const handleDelete = async () => {
    try {
      await api.delete("/user/remove/" + modalDelete.id);
      successNotification("Sucesso", "Sucesso ao deletar usuário");

      getUsers();
      setModalDelete({ id: undefined, show: false });
      setRowSelected([]);
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao deletar usuário");
    }
  };

  return (
    <>
      <DataTable
        title={""}
        tooltipEdit={"Editar Usuário"}
        tooltipDelete={"Deletar Usuário"}
        tooltipAdd={"Cadastrar novo usuário"}
        options={options}
        data={data}
        currentRow={currentRow}
        columns={columns}
        hrefAdd={"/usuarios/cadastrar"}
        setModalDelete={setModalDelete}
      />

      <Modal show={modalDelete.show} animation={true}>
        <Modal.Header>
          <Modal.Title>Excluir Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir o usuário?</Modal.Body>
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

export default DataTableusers;
