import React, { useState, useEffect } from "react";
import { Page, Button } from "tabler-react";

import { Grid, Form } from "tabler-react";

import api from "~/services/api";

import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import Wrapper from "~/components/Wrapper";
import DataTableCargo from "~/pages/Home/DataTableCargo";

function Home(props) {
  const [cargo, setCargo] = useState({
    open: false,
  });

  const [total, setTotal] = useState(0);
  const [packages, setPackages] = useState([]);
  // const [isAllSented, setIsAllSented] = useState(false);

  const [date, setDate] = useState(new Date());

  async function handleCreateCargo() {
    try {
      await api.post("/cargo/create", {
        date: date.toISOString(),
        month: new Date(date).getMonth() + 1,
        open: true,
      });

      successNotification("Sucesso", "Sucesso abrir carregamento");
      getCargo();
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao abrir carregamento");
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
      //console.log(response);
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
            amount: pack.volumes
              .map((p) => {
                return p.amount + " " + p.name;
              })
              .join(", "),
            observations: !pack.volumes[0].paid_now
              ? pack.volumes[0].name + " " + pack.obs
              : pack.obs,
            total: pack.total,
            sent: pack.sent,
            paid_now: pack.volumes[0].paid_now,
          };
        })
      );
    }
  }, [cargo]);

  useEffect(() => {
    setTotal(
      packages.length
        ? packages.reduce(
            (accumulator, current) => {
              return { total: accumulator.total + current.total };
            },
            { total: 0 }
          ).total
        : 0
    );
    // setIsAllSented(packages.every((pack) => pack.sent));
  }, [packages]);

  function getFormatedDate(ISODate) {
    var date = new Date(ISODate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + dt;
  }

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Carregamento">
          <Page.Content>
            {cargo.open ? (
              <Grid.Row>
                <Grid.Col>
                  <DataTableCargo
                    packages={packages}
                    getCargo={getCargo}
                    setPackages={setPackages}
                    cargo={cargo}
                  />
                </Grid.Col>
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Grid.Col className="row justify-content-around align-items-center">
                  <div>
                    <Form.Group isRequired label="Data">
                      <Form.Input
                        type="date"
                        defaultValue={getFormatedDate(new Date().toISOString())}
                        onChange={(e) => setDate(new Date(e.target.value))}
                      />
                    </Form.Group>
                  </div>
                  <div>
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
                    Total:
                    {"R$" + packages.length
                      ? packages
                          .reduce(
                            (accumulator, current) => {
                              if (current.paid_now)
                                return {
                                  total: accumulator.total + current.total,
                                };
                              else return { total: accumulator.total };
                            },
                            { total: 0 }
                          )
                          .total.toFixed(2)
                          .replace(".", ",")
                      : 0}
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
