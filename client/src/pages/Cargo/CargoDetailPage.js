import React, { useEffect, useState } from "react";
import { Page, Grid, Card } from "tabler-react";

import Wrapper from "~/components/Wrapper";
import DataTableDetail from "./Details/DataTableDetail";

import api from "~/services/api";
import { getFormatedDate } from "~/services/functions";
import { dangerNotification } from "~/services/notification";

const CargoDetailPage = (props) => {
  const [cargo, setCargo] = useState(null);

  async function getCargo() {
    try {
      const response = await api.get("/cargo/one/" + props.match.params.id);
      setCargo(response.data.cargo);
    } catch (err) {
      dangerNotification("Erro", "Erro ao busca entrega");
    }
  }

  useEffect(() => {
    getCargo();
  }, []);

  useEffect(() => {
    console.log(cargo);
  }, [cargo]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Detalhes entrega">
          <Grid.Row>
            <Grid.Col>
              <div className="d-flex" style={{ float: "left" }}>
                {cargo !== null ? (
                  <>
                    <Card.Body>Data:{getFormatedDate(cargo.date)}</Card.Body>

                    <Card.Body>
                      Total: {cargo.total.toFixed(2).replace(".", ",")}
                    </Card.Body>
                  </>
                ) : (
                  "Carregando informações..."
                )}
              </div>
            </Grid.Col>
          </Grid.Row>

          <div className="divList">
            {cargo !== null ? (
              <DataTableDetail packages={cargo.packages} />
            ) : (
              "Carregando informações..."
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default CargoDetailPage;
