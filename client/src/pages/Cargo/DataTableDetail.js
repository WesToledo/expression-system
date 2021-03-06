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

const DataTableDetail = ({ packages }) => {
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
      name: "volumes",
      label: "Volumes",
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

  const options = {
    selectableRowsOnClick: false,
    selectableRows: "none",
  };

  useEffect(() => {
    refreshDataTable();
  }, [packages]);

  function refreshDataTable() {
    var rows = [];
    packages.map((pack) => {
      rows.push({
        ...pack,
        client: pack.client.name,
        receiver: pack.receiver.name,
        amount: pack.volumes
          .map((volume) => volume.amount)
          .reduce((total, num) => total + num),
        total: "R$ " + pack.total.toFixed(2).replace(".", ","),
        volumes: pack.volumes
          .map((volume) => volume.amount + " " + volume.name)
          .join(", "),
      });
    });
    setData(rows);
  }

  useEffect(() => {
    console.log(packages);
  }, [packages]);

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

export default DataTableDetail;
