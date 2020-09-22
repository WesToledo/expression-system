import React, { useEffect, useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import DataTablePackage from "./DataTablePackage";

import api from "~/services/api";
import { dangerNotification } from "~/services/notification";

function PackagesPage(props) {
  const [packages, setPackages] = useState(null);

  async function getPackages() {
    try {
      const response = await api.get("/package");
      setPackages(response.data.package);
    } catch (err) {
      dangerNotification("Erro", "Erro ao buscar volumes");
    }
  }

  useEffect(() => {
    getPackages();
  }, []);

  useEffect(() => {
    console.log(packages);
  }, [packages]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Volumes">
          <div className="divList">
            {packages !== null ? (
              <DataTablePackage packages={packages} getPackages={getPackages} />
            ) : (
              "Carregando informações"
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
}

export default PackagesPage;
