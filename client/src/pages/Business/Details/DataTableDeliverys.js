import React, { useEffect, useState } from "react";

import { Badge, Text } from "tabler-react";

import DataTable from "./DataTable";

import { getFormatedDate } from "~/services/functions";

const DataTableDeliverys = ({ transactions }) => {
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
      name: "paid",
      options: {
        filter: false,
        display: false,
        viewColumns: false,
      },
    },
    {
      name: "client",
      label: "Rementente",
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
      name: "obs",
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
  ];

  const options = {
    selectableRowsOnClick: true,
    selectableRows: "none",
  };

  useEffect(() => {
    refreshDataTable();
  }, [transactions]);

  function refreshDataTable() {
    var rows = [];
    transactions.map((transaction) => {
      rows.push({
        ...transaction,
        client: transaction.client.name,
        receiver: transaction.receiver.name,
        amount: transaction.volumes
          .map((volume) => volume.amount)
          .reduce((total, num) => total + num),
        total: "R$ " + transaction.total.toFixed(2).replace(".", ","),
        volumes: transaction.volumes
          .map((volume) => volume.amount + " " + volume.name)
          .join(", "),
        status: transaction.paid ? (
          <>
            <Badge color="success" className="mr-1">
              Pago
            </Badge>
            <Text.Small>{getFormatedDate(transaction.payday)}</Text.Small>
          </>
        ) : (
          <Badge color="danger" className="mr-1">
            Em Haver
          </Badge>
        ),
        paid: transaction.paid,
      });
    });
    setData(rows);
  }

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <DataTable title={""} options={options} data={data} columns={columns} />
  );
};

export default DataTableDeliverys;
