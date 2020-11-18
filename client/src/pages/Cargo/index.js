import React, { useEffect, useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import DataTableCargo from "./DataTableCargo";

import api from "~/services/api";
import { dangerNotification } from "~/services/notification";

const CargoPage = (props) => {
  const [cargos, setCargos] = useState(null);

  async function getCargos() {
    try {
      const response = await api.get("/cargo/all");
      setCargos(response.data.cargos);
    } catch (err) {
      dangerNotification("Erro", "Erro ao buscar clientes");
    }
  }

  useEffect(() => {
    getCargos();
  }, []);

  useEffect(() => {
    console.log(cargos);
  }, [cargos]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Entregas">
          <div className="divList">
            {cargos !== null ? (
              <DataTableCargo cargos={cargos} getCargos={getCargos} />
            ) : (
              "Carregando informações..."
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default CargoPage;
