import React, { useState } from "react";
import { Formik } from "formik";
import { Link, withRouter } from "react-router-dom";

import api from "~/services/api";
import { login as setLoginCache } from "~/services/auth";

import { StandaloneFormPage, FormCard, FormTextInput } from "tabler-react";
import logoImg from "~/assets/img/delivery-box.png";

function LoginPage(props) {
  const [textButton, setTextButton] = useState({ text: "Entrar" });

  var stringsForm = {
    title: "Entrar",
    emailLabel: "Login",
    emailPlaceholder: "Insira o login",
    passwordLabel: "Senha",
    passwordPlaceholder: "Senha",
  };

  return (
    <Formik
      initialValues={{
        login: "",
        password: "",
      }}
      onSubmit={async (values, { setValues, setErrors }) => {
        const { login, password } = values;
        setTextButton({ text: "Carregando..." });

        try {
          const response = await api.post("/login", {
            login,
            password,
          });
          const { token, user } = response.data;
          setLoginCache(token, user._id, user.name, user.type);
          switch (user.type) {
            case "Admin":
              props.history.push("/home");
              break;
            case "DeliverMan":
              props.history.push("/entregador");
              break;
          }
        } catch (err) {
          setTextButton({ text: "Entrar" });
          setErrors({ email: "Erro ao tentar logar" });
        }
      }}
      render={({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <StandaloneFormPage imageURL={logoImg}>
          <FormCard
            title={stringsForm.title}
            buttonText={textButton.text}
            onSubmit={handleSubmit}
          >
            <FormTextInput
              name="login"
              label={stringsForm.emailLabel}
              placeholder={stringsForm.emailPlaceholder}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values && values.email}
              error={errors && errors.email}
            />
            <FormTextInput
              name="password"
              label={stringsForm.passwordLabel}
              type="password"
              placeholder={stringsForm.passwordLabel}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values && values.password}
              error={errors && errors.password}
            />
          </FormCard>
        </StandaloneFormPage>
      )}
    />
  );
}

export default withRouter(LoginPage);
