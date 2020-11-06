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

  const [total, setTotal] = useState(0);

  const [packages, setPackages] = useState([]);

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

  async function handleFinish() {
    try {
      await api.put("/cargo/finish/" + cargo._id, {
        total: Number(total.toFixed(2)),
      });

      successNotification("Sucesso", "Sucesso ao fechar carregamento");
      setCargo({
        open: false,
      });
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao fechar carregamento");
    }
  }

  async function getCargo() {
    try {
      const response = await api.get("/cargo");
      if (response.data.cargo) setCargo(response.data.cargo);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    console.log(
      packages.length
        ? packages.reduce((accumulator, current) => {
            return { total: accumulator.total + current.total };
          }).total
        : 0
    );

    setTotal(
      packages.length
        ? packages.reduce((accumulator, current) => {
            return { total: accumulator.total + current.total };
          }).total
        : 0
    );
  }, [packages]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Carregamento">
          <Page.Content>
            {cargo.open ? (
              <Grid.Row>
                <Grid.Col>
                  <DataTablePackages packages={packages} getCargo={getCargo} />
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
          {cargo.open ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <div>
                <Grid.Col>
                  <h2>
                    Total: {String("R$" + total.toFixed(2)).replace(".", ",")}
                  </h2>
                </Grid.Col>
              </div>

              <div>
                <Grid.Col>
                  <Button
                    type="submit"
                    color="danger"
                    className="ml-auto margin-btn"
                    onClick={handleFinish}
                  >
                    Terminar Carregamento
                  </Button>
                </Grid.Col>
              </div>
            </div>
          ) : (
            ""
          )}
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
}

export default Home;
