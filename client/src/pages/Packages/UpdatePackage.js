import React, { useState, useEffect } from "react";
import { Page } from "tabler-react";

import Wrapper from "~/components/Wrapper";

import api from "services/api";
import {
  successNotification,
  dangerNotification,
} from "~/services/notification";

import FormPackage from "./form";

function EditPackagePage(props) {
  const [form, setForm] = useState({
    name: undefined,
    price: "0",
    paid_now: true,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put("/package/update/" + props.match.params.id, {
        ...form,
        price: form.price.replace(".", "").split(",").join("."),
      });
      successNotification("Sucesso", "Sucesso ao editar volume");
      props.history.push("/volumes");
    } catch (err) {
      if (err.response.data.error)
        dangerNotification("Erro", err.response.data.error);
      else dangerNotification("Erro", "Erro ao editar volume");
    }
  }

  useEffect(() => {
    async function getPackage() {
      try {
        const response = await api.get("/package/" + props.match.params.id);
        const pack = response.data.package;

        setForm({
          ...pack,
          price: pack.price.toFixed(2).replace(".", ","),
        });
      } catch (err) {
        dangerNotification("Erro", "Erro ao buscar volume");
      }
    }
    getPackage();
  }, []);

  return (
    <Wrapper>
      <Page.Content className="card-header-form">
        <FormPackage
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          title={"Editar Volume"}
          confirmButtonText={"Salvar Alteração"}
          type="editar"
        />
      </Page.Content>
    </Wrapper>
  );
}

export default EditPackagePage;
