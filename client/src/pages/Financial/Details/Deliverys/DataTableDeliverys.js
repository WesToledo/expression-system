import React, { useEffect, useState } from "react";

import { Badge, Text } from "tabler-react";

import DataTable from "./components/DataTable";

import { getFormatedDate, getDay } from "~/services/functions";

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
      name: "day",
      label: "Dia",
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
    selectableRows: "multiple",
  };

  useEffect(() => {
    refreshDataTable();
  }, [transactions]);

  function refreshDataTable() {
    var rows = [];
    transactions.map((transaction) => {
      rows.push({
        ...transaction,
        day: getDay(transaction.date),
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

  return (
    <DataTable title={""} options={options} data={data} columns={columns} />
  );
};

export default DataTableDeliverys;
