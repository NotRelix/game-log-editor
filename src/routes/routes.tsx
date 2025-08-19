import Login from "./Login/Login";
import Register from "./Register/Register";
import Root from "./Root/Root";

const routes = [
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
];

export default routes;
