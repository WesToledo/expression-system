import React, { useEffect, useState } from "react";
import { Page, Grid, Card } from "tabler-react";

import Wrapper from "~/components/Wrapper";
import DataTableDeliverys from "./DataTableDeliverys";

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
        <Page.Card title={getMonthName(props.match.params.month)}>
          <Grid.Row>
            <Grid.Col>
              <div className="d-flex" style={{ float: "left" }}>
                {transactions !== null ? (
                  <>
                    <Card.Body></Card.Body>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Grid.Col>
          </Grid.Row>

          <div className="divList">
            {transactions !== null ? (
              <DataTableDeliverys transactions={transactions} />
            ) : (
              "Carregando informações..."
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default DeliverysPage;
