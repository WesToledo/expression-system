import React, { useEffect, useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import DataTableUsuarios from "./DataTableUser";

import api from "~/services/api";
import { dangerNotification } from "~/services/notificationn";

const UsuariosPage = (props) => {
  const [users, setUsers] = useState(null);

  async function getUsers() {
    try {
      const response = await api.get("/user");
      setUsers(response.data.user);
    } catch (err) {
      dangerNotification("Erro", "Erro ao buscar usuários");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Page.Card title="Usuários">
          <div className="divList">
            {users !== null ? (
              <DataTableUsuarios users={users} getUsers={getUsers} />
            ) : (
              "Carregando informações"
            )}
          </div>
        </Page.Card>
      </Page.Content>
    </Wrapper>
  );
};

export default UsuariosPage;
