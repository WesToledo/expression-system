import React, { useEffect } from "react";
import { useStateLink } from "@hookstate/core";

import { Page } from "tabler-react";

import api from "~/services/api";
import { getDate, getMonth } from "~/services/functions";

import Wrapper from "~/components/Wrapper";
import Form from "./form";

function AddPackagePage() {
  const form = useStateLink({
    client: undefined, // obj
    receiver: undefined, // obj
    date: undefined,
    month: undefined,
    total: undefined,
    paid: false,
    payday: undefined,
    obs: "",
  });

  const volumes = useStateLink([]);
  const clients = useStateLink([]);
  const receivers = useStateLink([]);

  function handleSubmit(e) {
    e.preventDefault();
    const response = {
      volumes: volumes.nested,
      date: getDate(),
      month: getMonth(),
      total: form.total,
      paid: form.paid,
      payday: form.payday,
    };

    console.log(response);
  }

  useEffect(() => {
    async function getClients() {
      try {
        const response = await api.get("/client");
        clients.set(response.data.client);
      } catch (err) {
        console.log("erro ao buscar clients", err);
      }
    }

    async function getReceivers() {
      try {
        const response = await api.get("/receiver");
        receivers.set(response.data.receiver);
      } catch (err) {
        console.log("erro ao buscar receivers", err);
      }
    }

    getClients();
    getReceivers();
  }, []);

  useEffect(() => {
    console.log(form.get());
  }, [form]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Form
          form={form}
          volumes={volumes}
          clients={clients}
          receivers={receivers}
          handleSubmit={handleSubmit}
          title={"Adicionar Volume"}
          confirmButtonText={"Salvar"}
        />
        <h1>
          {volumes.get().length
            ? volumes.get().reduce((accumulator, current) => {
                return { total: accumulator.total + current.total };
              }).total
            : "0"}
        </h1>
      </Page.Content>
    </Wrapper>
  );
}

export default AddPackagePage;
