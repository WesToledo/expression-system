import React, { useEffect, useState, useRef, useCallback } from "react";
import { useStateLink } from "@hookstate/core";
import { Button, Grid, Form } from "tabler-react";

import { Modal } from "react-bootstrap";

import ModalAddVolume from "./ModalAddVolume";
import ModalDeleteVolume from "./ModalDeleteVolume";

import api from "services/api";
import {
  dangerNotification,
  successNotification,
} from "~/services/notification";

import DataTable from "~/components/DataTable";

const DataTableVolumes = ({ volumes, availableVolumes }) => {
  const addVolumeModalRef = useRef();
  const deleteVolumeModalRef = useRef();

  const [data, setData] = useState([]);
  const [rowSelected, setRowSelected] = useState(); // index of selected row
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
      label: "Descrição",
      options: {
        display: true,
      },
    },
    {
      name: "value",
      label: "Valor Unidade",
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
      name: "total",
      label: "Total",
      options: {
        display: true,
      },
    },
  ];

  const currentRow = useStateLink({
    id: null,
  });

  const options = {
    selectableRowsOnClick: true,
    rowsSelected: rowSelected,
    onRowSelectionChange: (rowsSelected, allRows) => {
      //return de indexes of the selected rows
      setRowSelected(allRows.map((row) => row.dataIndex));
    },
    print: false,
    filter: false,
    search: false,
    download: false,
    viewColumns: false,
  };

  useEffect(() => {
    if (data.length) {
      if (rowSelected.length) {
        currentRow.set({
          ...currentRow.get(),
          id: data[rowSelected].id,
          index: rowSelected[0],
        });
      }
    }
  }, [rowSelected]);

  useEffect(() => {
    setRowSelected([]);
    refreshDataTable();
  }, [volumes]);

  function refreshDataTable() {
    var rows = [];
    volumes.get().map((pack) => {
      rows.push({
        ...pack,
        value: "R$ " + pack.value.toFixed(2).replace(".", ","),
        total: "R$ " + pack.total.toFixed(2).replace(".", ","),
      });
    });
    setData(rows);
  }

  const handleOpenModalAddVolume = useCallback(() => {
    addVolumeModalRef.current.openModal();
  }, []);

  const handleOpenModalDeleteVolume = useCallback(() => {
    deleteVolumeModalRef.current.openModal(currentRow.get().id);
  }, []);

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
        setModalAddVisible={handleOpenModalAddVolume}
        setModalDeleteVisible={handleOpenModalDeleteVolume}
        showEdit={false}
      />

      <ModalAddVolume
        volumes={volumes}
        ref={addVolumeModalRef}
        availableVolumes={availableVolumes}
      />

      <ModalDeleteVolume
        volumes={volumes}
        ref={deleteVolumeModalRef}
        availableVolumes={availableVolumes}
      />
    </>
  );
};

export default DataTableVolumes;
