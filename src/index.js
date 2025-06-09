import ReactDOM from "react-dom/client";
import "./index.css";
import { AppProvider } from "./app/AppContext";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import { router } from "./Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <RouterProvider router={router} />
    {/* Toast Container */}
    <Toaster
      toastOptions={{
        position: "top-center",
        style: {
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          padding: "16px",
          color: "black",
          zIndex: 999999999
        }
      }}
    />
  </AppProvider>
);
