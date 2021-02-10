import React, { useEffect, useState } from "react";
import { Page, Grid, Card } from "tabler-react";

import Wrapper from "~/components/Wrapper";
import DataTableDeliverys from "./DataTableDeliverys";

import api from "~/services/api";
import { getFormatedDate, getMonthName } from "~/services/functions";
import { dangerNotification } from "~/services/notification";

const MonthDetailPage = (props) => {
  const [transactions, setTransactions] = useState(null);

  async function getTransactions() {
    try {
      const response = await api.get(
        "/business/list-by-year-and-month/" +
          props.match.params.year +
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
        <Page.Card title={getMonthName(props.match.params.month) + ", " + props.match.params.year}>
          <div className="divList">
            {transactions !== null ? (
              <DataTableDeliverys transactions={transactions} />
            ) : (
              "Carregando informações..."
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
              margin: 5
            }}
          >
            <div>
              {transactions !== null ? (
                <Grid.Col>
                  <h2>
                    Total:
                    {String(
                      "R$ " +
                        transactions.reduce((a, b) => a + (b["total"] || 0), 0)
                    )}
                  </h2>
                </Grid.Col>
              ) : (
                ""
              )}
            </div>
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default MonthDetailPage;
