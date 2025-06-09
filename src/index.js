import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProvider } from "./app/AppContext";
import { RouterProvider } from "react-router";
import { router } from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
