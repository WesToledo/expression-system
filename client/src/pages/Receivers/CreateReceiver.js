import React, { useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import FormReceiver from "./form";

function CreateReceiverPage(props) {
  const [form, setForm] = useState({
    name: undefined,
    via: undefined,
    number: undefined,
    neighborhood: undefined,
    state: undefined,
    city: undefined,
    cel_phone: undefined,
    reference_name: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const receiver = {
        name: form.name,
        reference_name: form.reference_name,
        address: {
          via: form.via,
          number: form.number,
          neighborhood: form.neighborhood,
          state: form.state,
          city: form.city,
        },
        cel_phone: form.cel_phone,
      };
      await api.post("/receiver/create", receiver);
      successNotification("Sucesso", "Sucesso ao cadastrar destinatário");
      props.history.push("/destinatarios");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao cadastrar destinatário");
    }
  };

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormReceiver
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Cadastrar Destinatário"}
          confirmButtonText={"Salvar Cadastro"}
        />
      </Page.Content>
    </Wrapper>
  );
}

export default CreateReceiverPage;
