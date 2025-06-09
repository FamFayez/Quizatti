import Mainheader from "./Components/Mainheader";
import Footer from "./shared/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import "./style/App.css";

function App() {
  return (
    <div>
      <Mainheader />
      <Outlet />
      <Footer />
      {/* Toast Container */}
      <Toaster
        toastOptions={{
          position: "top-center",
          className: "bg-dark rounded-pill",
          style: {
            padding: "16px",
            color: "white"
          }
        }}
      />
    </div>
  );
}

export default App;
