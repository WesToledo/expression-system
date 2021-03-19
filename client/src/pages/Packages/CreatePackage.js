import React, { useState } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import FormPackage from "./form";

function CreatepackagePage(props) {
  const [form, setForm] = useState({
    name: undefined,
    price: "0",
    paid_now: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/package/create", {
        ...form,
        price: form.price.replace(".", "").split(",").join("."),
      });
      successNotification("Sucesso", "Sucesso ao cadastrar volume");
      props.history.push("/volumes");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao cadastrar volume");
    }
  };

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormPackage
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Cadastrar Volume"}
          confirmButtonText={"Salvar Cadastro"}
        />
      </Page.Content>
    </Wrapper>
  );
}

export default CreatepackagePage;
