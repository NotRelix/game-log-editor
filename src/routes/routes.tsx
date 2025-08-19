import Login from "./Login/Login";
import Posts from "./Posts/Posts";
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
      {
        path: "users/:userId/posts",
        Component: Posts,
      },
    ],
  },
];

export default routes;
