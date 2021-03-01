import React, { useEffect, useState } from "react";
import { Page, Grid, Card, Button } from "tabler-react";

import Wrapper from "./Wrapper";
import DataTablePackages from "./DataTablePackages";

import api from "~/services/api";
import { getFormatedDate } from "~/services/functions";
import {
  dangerNotification,
  successNotification,
} from "~/services/notification";

const DeliverManPage = (props) => {
  const [cargo, setCargo] = useState(null);
  const [packages, setPackages] = useState(null);

  async function getCargo() {
    try {
      const response = await api.get("/cargo/not-finish");
      if (response.data.cargo !== null) {
        setCargo(response.data.cargo);
        setPackages(response.data.cargo.packages);
      }
    } catch (err) {
      dangerNotification("Erro", "Erro ao busca entrega");
    }
  }

  async function handleFinish() {
    try {
      await api.put("/cargo/finish-delivery/" + cargo._id);
      successNotification("Sucesso", "Sucesso ao fechar entrega");
      setCargo(null);
      window.location.reload();
      
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao fechar entrega");
    }
  }

  useEffect(() => {
    getCargo();
  }, []);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Detalhes entrega">
          <Grid.Row>
            <Grid.Col>
              <div className="d-flex" style={{ float: "left" }}>
                {cargo !== null ? (
                  <Card.Body>Data:{getFormatedDate(cargo.date)}</Card.Body>
                ) : (
                  "Não existe carregamento aguardando entrega"
                )}
              </div>
            </Grid.Col>
          </Grid.Row>

          <div className="divList">
            {packages !== null ? (
              <DataTablePackages
                packages={packages}
                setPackages={setPackages}
              />
            ) : (
              ""
            )}
          </div>
          {cargo !== null ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <div>
                <Grid.Col>
                  <Button
                    type="submit"
                    color="danger"
                    className="ml-auto margin-btn"
                    onClick={handleFinish}
                  >
                    Terminar Entrega
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
};

export default DeliverManPage;
