import React, { useState, useEffect } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import FormReceiver from "./form";

function EditReceiverPage(props) {
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

  async function handleSubmit(e) {
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
      await api.put("/receiver/update/" + props.match.params.id, receiver);
      successNotification("Sucesso", "Sucesso ao editar destinatario");
      props.history.push("/destinatarios");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao editar destinatario");
    }
  }

  useEffect(() => {
    async function getReceiver() {
      try {
        const response = await api.get("/receiver/" + props.match.params.id);
        const receiver = response.data.receiver;

        setForm({
          name: receiver.name,
          reference_name: receiver.reference_name,
          via: receiver.address.via,
          number: receiver.address.number,
          neighborhood: receiver.address.neighborhood,
          state: receiver.address.state,
          city: receiver.address.city,
          fix_phone: receiver.fix_phone,
          cel_phone: receiver.cel_phone,
        });
      } catch (err) {
        dangerNotification("Erro", "Erro ao buscar destinatario");
      }
    }
    getReceiver();
  }, []);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormReceiver
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Editar Destinatário"}
          confirmButtonText={"Salvar Alteração"}
          type="editar"
        />
      </Page.Content>
    </Wrapper>
  );
}

export default EditReceiverPage;
