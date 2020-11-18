import React, { useEffect, useState } from "react";
import { Page, Grid, Card } from "tabler-react";

import Wrapper from "~/components/Wrapper";
// import DataTableDeliverys from "./DataTableDetails";

import api from "~/services/api";
import { getFormatedDate, getMonthName } from "~/services/functions";
import { dangerNotification } from "~/services/notification";

const DeliverysPage = (props) => {
  const [transactions, setTransactions] = useState([]);

  async function getTransactions() {
    try {
      const response = await api.get(
        "/financial/list-by-client-and-month/" +
          props.match.params.id +
          "/" +
          props.match.params.month
      );
      console.log(response);
      setTransactions(response.data.transactions);
    } catch (err) {
      dangerNotification("Erro", "Erro ao busca pacotes");
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Detalhes transactionse">
          <Grid.Row>
            <Grid.Col>
              <div className="d-flex" style={{ float: "left" }}>
                {transactions !== null ? (
                  <>
                    <Card.Body>
                      Mês:{getMonthName(props.match.params.month)}
                    </Card.Body>
                  </>
                ) : (
                  "Carregando informações..."
                )}
              </div>
            </Grid.Col>
          </Grid.Row>

          {/* <div className="divList">
            {transactions !== null ? (
              <DataTableDeliverys
                deliverys={transactions.deliverys}
                idtransactions={props.match.params.id}
              />
            ) : (
              "Carregando informações..."
            )}
          </div> */}
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default DeliverysPage;
