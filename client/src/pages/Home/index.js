import React, { useState, useEffect } from "react";
import { Page, Button } from "tabler-react";

import { Grid } from "tabler-react";

import api from "~/services/api";
import { getDate, getMonth } from "~/services/functions";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import Wrapper from "~/components/Wrapper";
import DataTablePackages from "~/pages/Home/DataTableCargo";

function Home(props) {
  const [cargo, setCargo] = useState({
    open: false,
  });

  const [packages, setPackages] = useState([
    {
      id: "asdasdasda",
      client: "Eu",
      receiver: "Eu de SP",
      amount: 3,
      observations: "altas observações",
      total: 10,
    },
  ]);

  async function handleCreateCargo() {
    try {
      await api.post("/cargo/create", {
        date: getDate(),
        month: getMonth(),
        open: true,
      });

      successNotification("Sucesso", "Sucesso criar carregamento");
      getCargo();
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao criar carregamento");
    }
  }

  async function getCargo() {
    try {
      const response = await api.get("/cargo");
      if (response.data.cargo) setCargo(response.data.cargo);
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao buscar carregamento");
    }
  }

  useEffect(() => {
    getCargo();
  }, []);

  useEffect(() => {
    if (cargo.packages) {
      setPackages(
        cargo.packages.map((pack) => {
          return {
            id: pack._id,
            client: pack.client.name,
            receiver: pack.receiver.name,
            amount: pack.volumes.length,
            observations: pack.obs,
            total: pack.total,
          };
        })
      );
    }
  }, [cargo]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Carregamento">
          <Page.Content>
            {cargo.open ? (
              <Grid.Row>
                <Grid.Col>
                  <DataTablePackages
                    packages={packages}
                    setPackages={setPackages}
                  />
                </Grid.Col>
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Grid.Col>
                  <div className="d-flex" style={{ float: "right" }}>
                    <Button
                      type="submit"
                      color="success"
                      className=""
                      icon="plus"
                      onClick={handleCreateCargo}
                    >
                      Criar Carregamento
                    </Button>
                  </div>
                </Grid.Col>
              </Grid.Row>
            )}
          </Page.Content>
          <Grid.Row>
            <Grid.Col>
              {cargo.open ? (
                <div className="d-flex" style={{ float: "right" }}>
                  <Button
                    type="submit"
                    color="danger"
                    className="ml-auto margin-btn"
                  >
                    Terminar Carregamento
                  </Button>
                </div>
              ) : (
                ""
              )}
            </Grid.Col>
          </Grid.Row>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
}

export default Home;
