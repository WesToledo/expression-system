import React, { useEffect } from "react";
import { Page, Card, Grid, Form, Button } from "tabler-react";

const FormPackage = ({
  form,
  setForm,
  handleSubmit,
  title,
  confirmButtonText,
}) => {
  function handleOnChangeInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleOnChangeRadio(e) {
    setForm({
      ...form,
      paid_now: e.target.value == "true",
    });
  }

  function handleOnChangePrice({ target }) {
    const value = target.value;
    var newPrice = value.replace(".", "").split(",").join("");
    if (isNaN(newPrice)) {
      newPrice = form.price.replace(".", "").split(",").join("");
    }
    newPrice = (Number(newPrice) / 100).toLocaleString("pt-br", {
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    setForm({ ...form, price: newPrice });
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
          <Grid.Col md={12} lg={4} sm={12} xs={12} >
            <Form.Group isRequired label="Descrição">
              <Form.Input
                name="name"
                placeholder="Digite a descrição..."
                value={form.name}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>

          <Grid.Col md={12} lg={4} sm={12} xs={12} >
            <Form.Group label="Tipo">
              <Form.Radio
                isInline
                label="Pagamento Imediato"
                name="paid_now"
                value="true"
                onChange={handleOnChangeRadio}
                checked={form.paid_now}
              />
              <Form.Radio
                isInline
                label="Pagamento Posterior"
                name="paid_now"
                value="false"
                onChange={handleOnChangeRadio}
                checked={form.paid_now == false}
              />
            </Form.Group>
          </Grid.Col>

          <Grid.Col md={12} lg={4} sm={12} xs={12} >
            <Form.Group isRequired label="Preço">
              <Form.Input
                name="price"
                placeholder="Digite o preço..."
                value={form.price}
                onChange={handleOnChangePrice}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>
      </Page.Card>
    </Form>
  );
};

export default FormPackage;
