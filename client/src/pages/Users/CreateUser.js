import React, { useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notificationn";

import FormUser from "./form";

const CreateUserPage = (props) => {
  const [form, setForm] = useState({
    name: undefined,
    login: undefined,
    type: "DeliverMan",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/create", form);
      successNotification("Sucesso", "Sucesso ao cadastrar usuário");
      props.history.push("/usuarios");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao cadastrar usuário");
    }
  };

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormUser
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Cadastrar Usuário"}
          confirmButtonText={"Salvar Cadastro"}
          type="cadastrar"
        />
      </Page.Content>
    </Wrapper>
  );
};

export default CreateUserPage;
