import Mainheader from "./pages/Components/Mainheader";
import Footer from "./shared/Footer";
import { Outlet } from "react-router-dom";

// import "./style/App.css";

function App() {
  return (
    <div>
      <Mainheader />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
