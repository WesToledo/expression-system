import React, { useEffect } from "react";
import { useStateLink } from "@hookstate/core";
import { Page, Card, Grid, Form, Button } from "tabler-react";
import Select from "react-select";

import api from "~/services/api";

import DataTableVolumes from "./DataTableVolumesOfPackage";

const FormPackage = ({
  form,
  volumes,
  handleSubmit,
  title,
  confirmButtonText,
}) => {
  const clientsOptions = useStateLink([]);
  const receiverOptions = useStateLink([]);
  const availableVolumes = useStateLink([]);

  useEffect(() => {
    async function getVolumes() {
      try {
        const response = await api.get("/package");
        availableVolumes.set(response.data.package);
      } catch (err) {
        console.log("erro ao buscar volumes");
      }
    }

    async function getClients() {
      try {
        const response = await api.get("/client");
        var aux = [];
        response.data.client.forEach((client) => {
          aux.push({
            value: client._id,
            label: client.name + ", " + client.reference_name,
          });
        });

        clientsOptions.set(aux);
      } catch (err) {
        console.log("erro ao buscar clients", err);
      }
    }

    async function getReceivers() {
      try {
        const response = await api.get("/receiver");
        var aux = [];
        response.data.receiver.forEach((receiver) => {
          aux.push({
            value: receiver._id,
            label: receiver.name + ", " + receiver.reference_name,
          });
        });
        receiverOptions.set(aux);
      } catch (err) {
        console.log("erro ao buscar receivers", err);
      }
    }

    getClients();
    getReceivers();
    getVolumes();
  }, []);

  function handleOnChangeSelect(selected, { name }) {
    form.set((f) => {
      return { ...f, [name]: selected };
    });
  }

  function handleOnChangeInput({ target }) {
    form.set((f) => {
      return { ...f, [target.name]: target.value };
    });
  }

  function handleOnChangeRadio(e) {
    console.log("asedsd")
    form.set((f) => {
      return { ...f, paid: e.target.value == "true" };
    });
  }

  useEffect(() => {
    console.log(form.get());
  }, [form]);

  return (
    <Form onSubmit={handleSubmit}>
      <Page.Card
        title={title}
        footer={
          <Card.Footer>
            <div className="d-flex" style={{ float: "left" }}>
              <Button
                type="submit"
                color="success"
                className="ml-auto margin-btn"
                onSubmit={handleSubmit}
                icon="save"
              >
                {confirmButtonText}
              </Button>
              <Button
                icon="x"
                RootComponent="a"
                href="/home"
                color="danger"
                className="margin-btn"
              >
                Cancelar
              </Button>
            </div>
          </Card.Footer>
        }
        onSubmit={(e) => {
          e.preventDefault(); /* DO SOMETHING HERE */
        }}
      >
        <Grid.Row>
          <Grid.Col md={12} lg={6} sm={12}>
            <Form.Group isRequired label="De (Rementente)">
              <Select
                name="client"
                options={clientsOptions.value}
                defaultValue={{ ...form.get().client }}
                onChange={handleOnChangeSelect}
              />
            </Form.Group>
          </Grid.Col>
          <Grid.Col md={12} lg={6} sm={12}>
            <Form.Group isRequired label="Para (Destinatário)">
              <Select
                name="receiver"
                options={receiverOptions.value}
                defaultValue={form.value.receiver}
                onChange={handleOnChangeSelect}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>

        <Page.Card title="Volumes">
          <DataTableVolumes
            volumes={volumes}
            availableVolumes={availableVolumes}
          />
        </Page.Card>

        <Grid.Row>
          <Grid.Col md={12} lg={12} sm={12}>
            <Form.Group
              label={
                <Form.Label aside={form.get().obs.length + "/100"}>
                  Observações
                </Form.Label>
              }
            >
              <Form.Textarea
                defaultValue={form.value.obs}
                onChange={handleOnChangeInput}
                name="obs"
                placeholder="Escreva aqui as observações sobre a entrega"
                rows={3}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col md={12} lg={4} sm={12} xs={12}>
            <Form.Group label="Pagamento">
              <Form.Radio
                isInline
                label="Pago"
                name="paid"
                value="true"
                onChange={handleOnChangeRadio}
                checked={form.paid}
              />
              <Form.Radio
                isInline
                label="Pagamento Posterior"
                name="paid"
                value="false"
                onChange={handleOnChangeRadio}
                checked={form.paid}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
      </Page.Card>
    </Form>
  );
};

export default FormPackage;
