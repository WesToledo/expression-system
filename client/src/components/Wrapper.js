import * as React from "react";
import { Site, RouterContextProvider } from "tabler-react";
import { withRouter } from "react-router-dom";

import avatar from "~/assets/img/avatar.png";

import { getUserInfo } from "~/services/auth";

const navBarItems = [
  {
    value: "Usuarios",
    icon: "user",
    to: "/usuarios",
  },
  {
    value: "Volumes",
    icon: "box",
    to: "/volumes",
  },
  {
    value: "Clientes",
    icon: "user",
    to: "/clientes",
  },
  {
    value: "Destinatários",
    icon: "home",
    to: "/destinatarios",
  },
  {
    value: "Entregas",
    icon: "truck",
    to: "/entregas",
  },
  {
    value: "Financeiro",
    icon: "dollar-sign",
    to: "/financeiro",
  },
];

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
  // state = {
  //   notificationsObjects: [
  //     {
  //       unread: true,
  //       avatarURL: 'demo/faces/male/41.jpg',
  //       message: (
  //         <React.Fragment>
  //           <strong>Nathan</strong> pushed new commit: Fix page load performance
  //           issue.
  //         </React.Fragment>
  //       ),
  //       time: '10 minutes ago'
  //     },
  //     {
  //       unread: true,
  //       avatarURL: 'demo/faces/female/1.jpg',
  //       message: (
  //         <React.Fragment>
  //           <strong>Alice</strong> started new task: Tabler UI design.
  //         </React.Fragment>
  //       ),
  //       time: '1 hour ago'
  //     },
  //     {
  //       unread: false,
  //       avatarURL: 'demo/faces/female/18.jpg',
  //       message: (
  //         <React.Fragment>
  //           <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
  //         </React.Fragment>
  //       ),
  //       time: '2 hours ago'
  //     }
  //   ]
  // };

  render() {
    // const notificationsObjects = this.state.notificationsObjects || [];
    // const unreadCount = this.state.notificationsObjects.reduce(
    //   (a, v) => a || v.unread,
    //   false
    // );
    return (
      <Site.Wrapper
        headerProps={{
          href: "/home",
          alt: "Nome empresa",
          imageURL: "/assets/delivery-box.png",
          // notificationsTray: {
          //   notificationsObjects,
          //   markAllAsRead: () =>
          //     this.setState(
          //       () => ({
          //         notificationsObjects: this.state.notificationsObjects.map(
          //           v => ({ ...v, unread: false })
          //         )
          //       }),
          //       () =>
          //         setTimeout(
          //           () =>
          //             this.setState({
          //               notificationsObjects: this.state.notificationsObjects.map(
          //                 v => ({ ...v, unread: true })
          //               )
          //             }),
          //           5000
          //         )
          //     ),
          //   unread: unreadCount
          // },
          accountDropdown: accountDropdownProps,
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          // links: [
          //   /*
          //   <a href="#">First Link</a>,
          //   <a href="#">Second Link</a>,
          //   <a href="#">Third Link</a>,
          //   <a href="#">Fourth Link</a>,
          //   <a href="#">Five Link</a>,
          //   <a href="#">Sixth Link</a>,
          //   <a href="#">Seventh Link</a>,
          //   <a href="#">Eigth Link</a>,
          // */
          // ],
          // note:
          //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          copyright: (
            <React.Fragment>
              <div style={{ textAlign: "center" }}>
                Copyright © 2020 -<a href="."> Expression System</a>
                {" - "}
                Todos os Direitos Reservados.
              </div>
            </React.Fragment>
          ) /*
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}>
                <Button
                  href="https://github.com/tabler/tabler-react"
                  size="sm"
                  outline
                  color="primary"
                  RootComponent="a"
                >
                  Source code
                </Button>
              </Grid.Col>
            </React.Fragment>
          ),*/,
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
