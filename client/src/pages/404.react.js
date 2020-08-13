import React from "react";

import { Error404Page } from "tabler-react";

function Error404() {
  return (
    <Error404Page
      details="A página que está procurando não pode ser acessada..."
      subtitle="Página não encontrada"
      action="Voltar"
    />
  );
}

export default Error404;
