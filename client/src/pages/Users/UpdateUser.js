import React, { useState, useEffect } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notificationn";

import FormUser from "./form";

function EditUserPage(props) {
  const [form, setForm] = useState({
    name: undefined,
    login: undefined,
    type: undefined,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put("/user/update/" + props.match.params.id, form);
      successNotification("Sucesso", "Sucesso ao editar usuário");
      props.history.push("/usuarios");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao editar usuário");
    }
  }

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get("/user/" + props.match.params.id);
        const user = response.data.user;
        setForm(user);
      } catch (err) {
        dangerNotification("Erro", "Erro ao buscar usuário");
      }
    }
    getUser();
  }, []);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormUser
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Editar Usuário"}
          confirmButtonText={"Salvar Alteração"}
          type="editar"
        />
      </Page.Content>
    </Wrapper>
  );
}

export default EditUserPage;
