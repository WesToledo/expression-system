import React, { useEffect } from "react";
import { useStateLink } from "@hookstate/core";
import { Page, Card, Grid, Form, Button } from "tabler-react";
import Select from "react-select";

import api from "~/services/api";

import DataTableVolumes from "./DataTableVolumesOfPackage";

const FormPackage = ({
  form,
  volumes,
  clients,
  receivers,
  handleSubmit,
  title,
  confirmButtonText,
}) => {
  const clientsOptions = [];
  const receiverOptions = [];
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

    getVolumes();
  }, []);

  useEffect(() => {
    clients.get().forEach((client) => {
      clientsOptions.push({
        value: client._id,
        label: client.name + ", " + client.reference_name,
      });
    });
  }, [clients]);

  useEffect(() => {
    receivers.get().forEach((receiver) => {
      receiverOptions.push({
        value: receiver._id,
        label: receiver.name + ", " + receiver.reference_name,
      });
    });
  }, [receivers]);

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
                href="/volumes"
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
                options={clientsOptions}
                defaultValue={form.client}
                onChange={handleOnChangeSelect}
              />
            </Form.Group>
          </Grid.Col>
          <Grid.Col md={12} lg={6} sm={12}>
            <Form.Group isRequired label="Para (Destinatário)">
              <Select
                name="receiver"
                options={receiverOptions}
                defaultValue={form.receiver}
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
                defaultValue={form.obs}
                onChange={handleOnChangeInput}
                name="obs"
                placeholder="Escreva aqui as observações sobre a entrega"
                rows={3}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
      </Page.Card>
    </Form>
  );
};

export default FormPackage;
