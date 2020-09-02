import React, { useState, useEffect } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import FormClient from "./form";

function EditClientPage(props) {
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

  async function handleSubmit(e) {
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
      await api.put("/client/update/" + props.match.params.id, client);
      successNotification("Sucesso", "Sucesso ao editar cliente");
      props.history.push("/clientes");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao editar cliente");
    }
  }

  useEffect(() => {
    async function getClient() {
      try {
        const response = await api.get("/client/" + props.match.params.id);
        const client = response.data.client;

        setForm({
          name: client.name,
          reference_name: client.reference_name,
          via: client.address.via,
          number: client.address.number,
          neighborhood: client.address.neighborhood,
          state: client.address.state,
          city: client.address.city,
          fix_phone: client.fix_phone,
          cel_phone: client.cel_phone,
        });
      } catch (err) {
        dangerNotification("Erro", "Erro ao buscar cliente");
      }
    }
    getClient();
  }, []);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormClient
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Editar Cliente"}
          confirmButtonText={"Salvar Alteração"}
          type="editar"
        />
      </Page.Content>
    </Wrapper>
  );
}

export default EditClientPage;
