import React, { useEffect } from "react";
import { Page, Card, Grid, Form, Button } from "tabler-react";

const FormClient = ({
  form,
  setForm,
  handleSubmit,
  title,
  confirmButtonText,
}) => {
  const handleOnChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(form);
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
                href="/clientes"
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
            <Form.Group isRequired label="Nome">
              <Form.Input
                name="name"
                placeholder="Digite o nome..."
                value={form.name}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>

          <Grid.Col md={12} lg={6} sm={12}>
            <Form.Group label="Nome de referência (malharia, empresa ...)">
              <Form.Input
                name="reference_name"
                placeholder="Digite o nome da referência..."
                value={form.reference_name}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col md={12} lg={6} sm={12}>
            <Form.Group isRequired label="Endereço">
              <Form.Input
                name="via"
                placeholder="Digite o endereço..."
                value={form.via}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>

          <Grid.Col md={12} lg={1} sm={12}>
            <Form.Group isRequired label="Número">
              <Form.Input
                name="number"
                type="Number"
                value={form.number}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>

          <Grid.Col md={12} lg={3} sm={12}>
            <Form.Group isRequired label="Bairro">
              <Form.Input
                name="neighborhood"
                placeholder="Digite o bairro..."
                value={form.neighborhood}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>
          <Grid.Col md={12} lg={2} sm={12}>
            <Form.Group isRequired label="Estado">
              <Form.Input
                name="state"
                placeholder="Digite o estado..."
                value={form.state}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col md={12} lg={2} sm={12}>
            <Form.Group isRequired label="Cidade">
              <Form.Input
                name="city"
                placeholder="Digite o cidade..."
                value={form.city}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col md={12} lg={2} sm={12}>
            <Form.Group label="Telefone Fixo">
              <Form.MaskedInput
                placeholder="Informe o telefone..."
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  ")",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                name="fix_phone"
                onChange={handleOnChangeInput}
                value={form.fix_phone}
              />
            </Form.Group>
          </Grid.Col>
          <Grid.Col md={12} lg={2} sm={12}>
            <Form.Group isRequired label="Telefone Celular">
              <Form.MaskedInput
                placeholder="Informe o telefone..."
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  ")",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                name="cel_phone"
                onChange={handleOnChangeInput}
                value={form.cel_phone}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
      </Page.Card>
    </Form>
  );
};

export default FormClient;
