import React, { useState } from "react";
import { Page, Button } from "tabler-react";

import { Grid } from "tabler-react";

import Wrapper from "~/components/Wrapper";
import DataTablePackages from "~/pages/Home/DataTablePackages";

function Home() {
  const [cargoIsOpen, setCargoiIsOpen] = useState(true);

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

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Carregamento">
          <Page.Content>
            {packages.length ? (
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
              {packages.length ? (
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
