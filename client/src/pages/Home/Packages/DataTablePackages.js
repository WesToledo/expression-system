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

const DataTablePackages = ({ packages, setPackages }) => {
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
  ];

  const currentRow = useStateLink({
    id: null,
    hrefEdit: "/carregamento/editar/",
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
  }, [packages]);

  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: undefined,
  });

  function refreshDataTable() {
    var rows = [];
    packages.map((pack) => {
      rows.push({
        ...pack,
        total: "R$ " + pack.total.toFixed(2).replace(".", ","),
      });
    });
    setData(rows);
  }

  const handleDelete = async () => {
    try {
      await api.delete("/cargo/remove/" + modalDelete.id);
      successNotification("Sucesso", "Sucesso ao deletar volume");

      setPackages();
      setModalDelete({ id: undefined, show: false });
      setRowSelected([]);
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao deletar volume");
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
        hrefAdd={"/carregamento/adcionar"}
        setModalDelete={setModalDelete}
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

export default DataTablePackages;
