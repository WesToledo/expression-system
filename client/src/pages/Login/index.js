import React, { useState } from "react";
import { Formik } from "formik";
import { Link, withRouter } from "react-router-dom";

import api from "~/services/api";
import { login as setLoginCache } from "~/services/auth";

import { StandaloneFormPage, FormCard, FormTextInput } from "tabler-react";
import logoImg from "~/assets/img/tabler.png";

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
          setLoginCache(response.data.token, response.data.user._id);
          props.history.push("/home");
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
            <p>
              Esqueceu a senha? <Link to="/recuperar-senha">Recupere</Link>
            </p>
          </FormCard>
        </StandaloneFormPage>
      )}
    />
  );
}

export default withRouter(LoginPage);
