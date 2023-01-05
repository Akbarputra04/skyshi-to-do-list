import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, List } from "../screens";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list/:id",
    element: <List />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
