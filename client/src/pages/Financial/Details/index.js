import React, { useEffect, useState } from "react";
import { Page, Grid, Card } from "tabler-react";

import Wrapper from "~/components/Wrapper";
import DataTableDeliverys from "./DataTableDetails";

import api from "~/services/api";
import { getFormatedDate } from "~/services/functions";
import { dangerNotification } from "~/services/notification";

const DeliveryPage = (props) => {
  const [client, setClient] = useState(null);

  async function getClient() {
    try {
      const response = await api.get(
        "/financial/list-by-client/" + props.match.params.id
      );
      setClient(response.data.client);
    } catch (err) {
      dangerNotification("Erro", "Erro ao busca entrega");
    }
  }

  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    console.log(client);
  }, [client]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Detalhes Cliente">
          <Grid.Row>
            <Grid.Col>
              <div className="d-flex" style={{ float: "left" }}>
                {client !== null ? (
                  <>
                    <Card.Body>Nome:{client.name}</Card.Body>

                    <Card.Body>
                      Endereço:
                      {client.address.via +
                        ", " +
                        client.address.number +
                        ", " +
                        client.address.neighborhood +
                        ", " +
                        client.address.state +
                        ", " +
                        client.address.city}
                    </Card.Body>
                  </>
                ) : (
                  "Carregando informações..."
                )}
              </div>
            </Grid.Col>
          </Grid.Row>

          <div className="divList">
            {client !== null ? (
              <DataTableDeliverys
                deliverys={client.deliverys}
                idClient={props.match.params.id}
              />
            ) : (
              "Carregando informações..."
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default DeliveryPage;
