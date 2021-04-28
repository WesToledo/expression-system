import React, { useEffect, useState } from "react";
import { Badge, Text, Grid, Form } from "tabler-react";

import { getFormatedDate } from "~/services/functions";
import api from "~/services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import DataTable from "./DataTable";

const DataTableDetail = ({ packages, getCargo }) => {
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
    {
      name: "status",
      label: "Situação",
      options: {
        display: true,
      },
    },
    {
      name: "paid",
      label: "Pago?",
      options: {
        display: true,
        filter: false,
        viewColumns: false,
      },
    },
  ];

  const options = {
    selectableRowsOnClick: false,
    selectableRows: "multiple",
  };

  async function handlePaidCheck(e) {
    try {
      console.log(e.target.checked);
      await api.put("/cargo/make-payment", {
        transaction: { _id: e.target.value, paid: e.target.checked },
      });
      successNotification("Sucesso", "Sucesso ao efetuar pagamento");
      getCargo();
    } catch (err) {
      dangerNotification("Erro", "Erro ao efetuar pagamento");
    }
  }

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
        status: pack.paid ? (
          <>
            <Badge color="success" className="mr-1">
              Pago
            </Badge>
            <Text.Small>{getFormatedDate(pack.payday)}</Text.Small>
          </>
        ) : (
          <Badge color="danger" className="mr-1">
            Em Haver
          </Badge>
        ),
        paid: (
          <Grid.Row className="justify-content-center">
            <Form.Checkbox
              label=" "
              value={pack._id}
              checked={pack.paid}
              onChange={handlePaidCheck}
            />
          </Grid.Row>
        ),
      });
    });
    setData(rows);
  }

  useEffect(() => {
    console.log(packages);
  }, [packages]);

  return (
    <DataTable title={""} options={options} data={data} columns={columns} />
  );
};

export default DataTableDetail;
