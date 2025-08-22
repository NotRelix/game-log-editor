import CreatePost from "./CreatePost/CreatePost";
import EditPost from "./EditPost/EditPost";
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
      {
        path: "posts/create",
        Component: CreatePost,
      },
      {
        path: "posts/:postId/edit",
        Component: EditPost,
      },
    ],
  },
];

export default routes;
