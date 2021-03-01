import React, { useEffect, useState } from "react";
import { Form, Grid } from "tabler-react";

import api from "services/api";

import {
  dangerNotification,
  successNotification,
} from "~/services/notification";

import { getFormatedDate } from "~/services/functions";

import DataTable from "~/components/DataTable";
import { CompassCalibrationOutlined } from "@material-ui/icons";

const DataTablePackages = ({ packages, setPackages }) => {
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
      name: "actions",
      label: "Entregue",
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
  }, [packages]);

  async function handleDeliveryCheck(e) {
    e.preventDefault();
    const id = e.target.value;

    try {
      const response = await api.put(
        "/transaction/delivered/" + e.target.value,
        {
          checked: e.target.checked,
        }
      );

      const diff = packages.filter((item) => item._id !== id);
      diff.push({ ...response.data.package });
      setPackages(diff);

      successNotification("Sucesso", "Sucesso ao fechar entrega");
    } catch (err) {
      console.log(err);
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao fechar entrega");
    }
  }

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
        volumes: pack.volumes
          .map((volume) => volume.amount + " " + volume.name)
          .join(", "),
        actions: (
          <Grid.Row className="justify-content-center">
            <Form.Checkbox
              label=" "
              value={pack._id}
              checked={pack.delivered}
              onChange={handleDeliveryCheck}
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
    <DataTable
      title={""}
      tooltipEdit={"Editar volume"}
      tooltipDelete={"Deletar volume"}
      tooltipAdd={"Adicionar novo volume"}
      options={options}
      data={data}
      columns={columns}
      showEdit={false}
      showAdd={false}
    />
  );
};

export default DataTablePackages;
