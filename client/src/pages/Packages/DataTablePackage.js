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

const DataTablePackages = ({ packages, getPackages }) => {
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
      name: "paid_now",
      label: "Tipo Pagamento",
      options: {
        display: true,
      },
    },

    {
      name: "price",
      label: "Preço",
      options: {
        display: true,
      },
    },
  ];

  const currentRow = useStateLink({
    id: null,
    hrefEdit: "/volumes/editar/",
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
        price: "R$ " + pack.price.toFixed(2).replace(".", ","),
        paid_now: pack.paid_now ? "Pagamento Imediato" : "Pagamento Posterior",
      });
    });
    setData(rows);
  }

  const handleDelete = async () => {
    try {
      await api.delete("/package/remove/" + modalDelete.id);
      successNotification("Sucesso", "Sucesso ao deletar volume");

      getPackages();
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
        title={""}
        tooltipEdit={"Editar volume"}
        tooltipDelete={"Deletar volume"}
        tooltipAdd={"Cadastrar novo volume"}
        options={options}
        data={data}
        currentRow={currentRow}
        columns={columns}
        hrefAdd={"/volumes/cadastrar"}
        setModalDelete={setModalDelete}
        showEdit={true}
      />

      <Modal show={modalDelete.show} animation={true}>
        <Modal.Header>
          <Modal.Title>Excluir volume</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você tem certeza que deseja excluir o volume?</Modal.Body>
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
