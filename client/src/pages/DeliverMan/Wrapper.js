import * as React from "react";
import { Site, RouterContextProvider } from "tabler-react";
import { withRouter } from "react-router-dom";

import avatar from "~/assets/img/avatar.png";

import { getUserInfo } from "~/services/auth";

const navBarItems = [];

const userInfo = getUserInfo();

const accountDropdownProps = {
  avatarURL: avatar,
  name: userInfo.name,
  description: userInfo.type === "Admin" ? "Administrador" : "Entregador",
  options: [
    { icon: "user", value: "Perfil" },
    { isDivider: true },
    { icon: "log-out", value: "Sair", to: "/" },
  ],
};

class SiteWrapper extends React.Component {
  render() {
    return (
      <Site.Wrapper
        headerProps={{
          href: "/home",
          alt: "Nome empresa",
          imageURL: "/assets/delivery-box.png",

          accountDropdown: accountDropdownProps,
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          copyright: (
            <React.Fragment>
              <div style={{ textAlign: "center" }}>
                Copyright © 2020 -<a href="."> Expression System</a>
                {" - "}
                Todos os Direitos Reservados.
              </div>
            </React.Fragment>
          ),
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
