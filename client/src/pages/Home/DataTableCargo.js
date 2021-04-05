import React, { useEffect, useState } from "react";
import { useStateLink } from "@hookstate/core";
import { Button, Grid, Form } from "tabler-react";

import { Modal } from "react-bootstrap";

import api from "services/api";
import {
  dangerNotification,
  successNotification,
} from "~/services/notification";

import DataTable from "~/components/DataTable";

const DataTableCargo = ({ packages, getCargo, setPackages }) => {
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
      name: "client",
      label: "Remetente",
      options: {
        display: true,
      },
    },
    {
      name: "receiver",
      label: "Destinatário",
      options: {
        display: true,
      },
    },
    {
      name: "amount",
      label: "Quantidade",
      options: {
        display: true,
      },
    },
    {
      name: "observations",
      label: "Observações",
      options: {
        display: true,
      },
    },
    {
      name: "total",
      label: "Total",
      options: {
        display: true,
      },
    },
    {
      name: "actions",
      label: "Carregado",
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
    selectableRowsOnClick: true,
    rowsSelected: rowSelected,
    rowsPerPage: 100,
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
  }, [packages]);

  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: undefined,
  });

  async function handleSentCheck(e) {
    e.preventDefault();
    const id = e.target.value;

    try {
      const response = await api.put("/transaction/sented/" + e.target.value, {
        checked: e.target.checked,
      });

      const diff = packages.filter((item) => item.id != id);
      const pack = response.data.package;

      diff.push({
        id: pack._id,
        client: pack.client.name,
        receiver: pack.receiver.name,
        amount: pack.volumes.length,
        observations: pack.obs,
        total: pack.total,
        sent: pack.sent,
      });

      setPackages(diff);

      successNotification("Sucesso", "Sucesso ao carregar entrega");
    } catch (err) {
      console.log(err);
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao carregar entrega");
    }
  }

  function refreshDataTable() {
    var rows = [];
    packages.map((pack) => {
      console.log(pack);
      rows.push({
        ...pack,
        total: "R$ " + pack.total.toFixed(2).replace(".", ","),
        actions: (
          <Grid.Row className="justify-content-center">
            <Form.Checkbox
              label=" "
              value={pack.id}
              checked={pack.sent}
              onChange={handleSentCheck}
            />
          </Grid.Row>
        ),
      });
    });
    setData(rows);
  }

  const handleDelete = async () => {
    try {
      await api.delete("/transaction/remove/" + modalDelete.id);
      successNotification(
        "Sucesso",
        "Sucesso ao deletar volume do carregamento"
      );

      getCargo();
      setModalDelete({ id: undefined, show: false });
      setRowSelected([]);
    } catch (err) {
      console.log(err);
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao deletar volume do carregamento");
    }
  };

  return (
    <>
      <DataTable
        title={"Volumes"}
        tooltipEdit={"Editar volume"}
        tooltipDelete={"Deletar volume"}
        tooltipAdd={"Adicionar novo volume"}
        options={options}
        data={data}
        currentRow={currentRow}
        columns={columns}
        hrefAdd={"/carregamento/adicionar"}
        setModalDelete={setModalDelete}
        showEdit={false}
      />

      <Modal show={modalDelete.show} animation={true}>
        <Modal.Header>
          <Modal.Title>Excluir volume</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir o pacote?</Modal.Body>
        <Modal.Footer>
          <Button
            color="danger"
            icon="x"
            onClick={() => {
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

export default DataTableCargo;
