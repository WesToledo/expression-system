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

import { getMonthName } from "~/services/functions";

import DataTable from "~/components/DataTable";

const DataTableDeliverys = ({ deliverys, idClient }) => {
  const [data, setData] = useState([]);
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
      name: "month",
      label: "Mês",
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
      label: "Ações",
      options: {
        display: true,
        filter: false,
        viewColumns: false,
      },
    },
  ];

  const options = {
    selectableRowsOnClick: false,
    selectableRows: "none",
  };

  useEffect(() => {
    refreshDataTable();
  }, [deliverys]);

  function refreshDataTable() {
    var rows = [];
    deliverys.map((delivery) => {
      rows.push({
        total: delivery.total.toFixed(2).replace(".", ","),
        month: getMonthName(delivery._id),
        actions: (
          <IconButton href={"/financeiro/" + idClient + "/" + delivery._id}>
            <KeyboardArrowRight fontSize="small" />
          </IconButton>
        ),
      });
    });
    setData(rows);
  }

  useEffect(() => {
    console.log(deliverys);
  }, [deliverys]);

  return (
    <DataTable
      title={""}
      tooltipEdit={"Editar volume"}
      tooltipDelete={"Deletar volume"}
      tooltipAdd={"Adicionar novo volume"}
      currentRow={{ _id: "", name: "" }}
      options={options}
      data={data}
      columns={columns}
      showEdit={false}
      showAdd={false}
    />
  );
};

export default DataTableDeliverys;
