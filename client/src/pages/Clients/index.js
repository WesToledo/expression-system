import React, { useEffect, useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import DataTableClients from "./DataTableClient";

import api from "~/services/api";
import { dangerNotification } from "~/services/notification";

const ClientPage = (props) => {
  const [clients, setClients] = useState(null);

  async function getClients() {
    try {
      const response = await api.get("/client");
      setClients(response.data.client);
    } catch (err) {
      dangerNotification("Erro", "Erro ao buscar clientes");
    }
  }

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    console.log(clients);
  }, [clients]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Clientes">
          <div className="divList">
            {clients !== null ? (
              <DataTableClients clients={clients} getClients={getClients} />
            ) : (
              "Carregando informações"
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default ClientPage;
