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
        <Page.Card
          title={
            getMonthName(props.match.params.month) +
            ", " +
            props.match.params.year
          }
        >
          <div className="divList">
            {transactions !== null ? (
              <DataTableDeliverys transactions={transactions} />
            ) : (
              "Carregando informações..."
            )}
          </div>
          {transactions !== null ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                flexDirection: "row",
                margin: 5,
              }}
            >
                <h2>
                  Total:
                  {String(
                    " R$ " +
                      transactions.reduce((a, b) => a + (b["total"] || 0), 0)
                  )}
                </h2>

              {/* <h4 style={{ marginRight: 10, color: "#5eba00" }}>
                Total pago:
                {String(
                  " R$ " +
                    transactions
                      .filter((a) => a.paid)
                      .reduce((a, b) => a + (b["total"] || 0), 0)
                )}
              </h4>

              <h4 style={{ color: "#cd201f" }}>
                Total faltante:
                {String(
                  " R$ " +
                    transactions
                      .filter((a) => !a.paid)
                      .reduce((a, b) => a + (b["total"] || 0), 0)
                )}
              </h4> */}
            </div>
          ) : (
            ""
          )}
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default MonthDetailPage;
