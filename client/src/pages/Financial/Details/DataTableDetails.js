import React, { useEffect, useState } from "react";
import { Badge } from "tabler-react";

import IconButton from "@material-ui/core/IconButton";
import { KeyboardArrowRight } from "@material-ui/icons";

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
      label: "Valor Total",
      options: {
        display: true,
      },
    },
    {
      name: "not_paid_value",
      label: "Valor em haver",
      options: {
        display: true,
      },
    },
    {
      name: "paid_value",
      label: "Valor Recebido",
      options: {
        display: true,
      },
    },
    {
      name: "actions",
      label: "Mais informações",
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
        paid_value: "R$ " + delivery.paid_value.toFixed(2).replace(".", ","),
        not_paid_value:
          "R$ " + delivery.not_paid_value.toFixed(2).replace(".", ","),
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
