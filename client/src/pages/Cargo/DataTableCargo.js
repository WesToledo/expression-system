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

const DataTableCargo = ({ cargos, getCargos }) => {
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

  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: undefined,
  });

  function refreshDataTable() {
    var rows = [];
    cargos.map((cargo) => {
      rows.push({
        ...cargo,
        date: getFormatedDate(cargo.date),
        total: "R$ " + cargo.total.toFixed(2).replace(".", ","),
        amount: cargo.packages.length,
        actions: (
          <IconButton >
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
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

      getCargos();
      setModalDelete({ id: undefined, show: false });
      setRowSelected([]);
    } catch (err) {
      console.log(err);
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao deletar volume do carregamento");
    }
  };

  useEffect(() => {
    console.log(currentRow.get());
    console.log(cargos);
  }, [currentRow]);

  return (
    <>
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
        setModalDelete={setModalDelete}
        showEdit={false}
        showAdd={false}
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

export default DataTableCargo;
