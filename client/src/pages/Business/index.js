import React, { useEffect, useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import DataTableMonths from "./DataTableMonths";

import api from "~/services/api";
import { dangerNotification } from "~/services/notification";

const BusinessPage = (props) => {
  const [months, setMonths] = useState(null);

  async function getMonths() {
    try {
      const response = await api.get("/business/list-by-month");
      setMonths(response.data.months);
    } catch (err) {
      dangerNotification("Erro", "Erro ao buscar dados");
    }
  }

  useEffect(() => {
    getMonths();
  }, []);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Cotação por mês">
          <div className="divList">
            {months !== null ? (
              <DataTableMonths months={months} getMonths={getMonths} />
            ) : (
              "Carregando informações..."
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default BusinessPage;
