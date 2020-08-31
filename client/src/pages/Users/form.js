import React, { useEffect } from "react";
import { Page, Card, Grid, Form, Button } from "tabler-react";

const FormUsuario = ({
  form,
  setForm,
  handleSubmit,
  title,
  confirmButtonText,
  type,
}) => {
  const handleOnChangeInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangePass = (e) => {
    const { value } = e.target;
    if (value !== form.password) {
      setForm({ ...form, errorSenha: "Senhas não combinam" });
    } else {
      setForm({ ...form, errorSenha: "" });
    }
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
                href="/usuarios"
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
            <Form.Group isRequired label="Login">
              <Form.Input
                name="login"
                placeholder="Digite o login..."
                value={form.login}
                onChange={handleOnChangeInput}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col md={12} lg={6} sm={12}>
            <Form.Group label="Tipo">
              <Form.Radio
                isInline
                label="Administrador"
                name="type"
                value="Admin"
                onChange={handleOnChangeInput}
                checked={form.type === "Admin"}
              />
              <Form.Radio
                isInline
                label="Entregador"
                name="type"
                value="DeliverMan"
                onChange={handleOnChangeInput}
                checked={form.type === "DeliverMan"}
              />
            </Form.Group>
          </Grid.Col>
        </Grid.Row>

        {type === "cadastrar" ? (
          <Grid.Row>
            <Grid.Col md={12} lg={4} sm={12}>
              <Form.Group label="Senha">
                <Form.Input
                  required
                  name="password"
                  placeholder="Digite a senha..."
                  value={form.password}
                  onChange={handleOnChangeInput}
                  type="password"
                  error={form.errorSenha}
                />
              </Form.Group>
            </Grid.Col>
            <Grid.Col md={12} lg={4} sm={12}>
              <Form.Group label="Confirmar Senha">
                <Form.Input
                  required
                  name="confirm_password"
                  placeholder="Confirme a senha..."
                  value={form.confirm_password}
                  onChange={handleOnChangePass}
                  type="password"
                />
              </Form.Group>
            </Grid.Col>
          </Grid.Row>
        ) : (
          ""
        )}
      </Page.Card>
    </Form>
  );
};

export default FormUsuario;
