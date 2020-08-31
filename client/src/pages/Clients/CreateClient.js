import React, { useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notificationn";

import FormClient from "./form";

const CreateUserPage = (props) => {
  const [form, setForm] = useState({
    name: undefined,
    via: undefined,
    number: undefined,
    neighborhood: undefined,
    state: undefined,
    city: undefined,
    fix_phone: undefined,
    cel_phone: undefined,
    reference_name: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const client = {
        name: form.name,
        reference_name: form.reference_name,
        address: {
          via: form.via,
          number: form.number,
          neighborhood: form.neighborhood,
          state: form.state,
          city: form.city,
        },
        fix_phone: form.fix_phone,
        cel_phone: form.cel_phone,
      };
      await api.post("/client/create", client);
      successNotification("Sucesso", "Sucesso ao cadastrar usuário");
      props.history.push("/clientes");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao cadastrar usuário");
    }
  };

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormClient
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Cadastrar Usuário"}
          confirmButtonText={"Salvar Cadastro"}
        />
      </Page.Content>
    </Wrapper>
  );
};

export default CreateUserPage;
