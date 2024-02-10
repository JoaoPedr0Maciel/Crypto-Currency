import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { NotFound } from "./NotFound";
import { Home } from "./Home";
import { Detail } from "./Detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
