import React, { useEffect, useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import DataTableReceiver from "./DataTableReceiver";

import api from "~/services/api";
import { dangerNotification } from "~/services/notification";

const Receiver = (props) => {
  const [receivers, setReceivers] = useState(null);

  async function getReceivers() {
    try {
      const response = await api.get("/receiver");
      setReceivers(response.data.receiver);
    } catch (err) {
      dangerNotification("Erro", "Erro ao buscar destinatários");
    }
  }

  useEffect(() => {
    getReceivers();
  }, []);

  useEffect(() => {
    console.log(receivers);
  }, [receivers]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Destinatários">
          <div className="divList">
            {receivers !== null ? (
              <DataTableReceiver receivers={receivers} getReceivers={getReceivers} />
            ) : (
              "Carregando informações"
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default Receiver;
