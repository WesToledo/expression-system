import React, { useEffect } from "react";
import { useStateLink } from "@hookstate/core";

import { Page } from "tabler-react";

import api from "~/services/api";
import { getDate, getMonth } from "~/services/functions";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import Wrapper from "~/components/Wrapper";
import Form from "./form";

function AddPackagePage(props) {
  const form = useStateLink({
    client: undefined, // obj
    receiver: undefined, // obj
    date: undefined,
    month: undefined,
    paid: false,
    payday: undefined,
    obs: "",
  });

  const volumes = useStateLink([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { client, receiver, paid, payday, obs } = form.get();
    const transaction = {
      client: client.value,
      receiver: receiver.value,
      volumes: volumes.value,
      date: getDate(),
      month: getMonth(),
      total: volumes.get().length
        ? volumes.get().reduce((accumulator, current) => {
            return { total: accumulator.total + current.total };
          }).total
        : 0,
      paid,
      payday,
      obs,
    };

    console.log(transaction);

    try {
      await api.post("/transaction/create", transaction);
      successNotification("Sucesso", "Sucesso ao adicionar volume");
      props.history.push("/home");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao adicionar volume");
    }
  }

  useEffect(() => {
    console.log(form.get());
  }, [form]);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <Form
          form={form}
          volumes={volumes}
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