import "./App.css";
import { useState } from "react";
import { Sidebar } from "./component/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Addnews } from "./component/pages/Addnews";
import { Viewnews } from "./component/pages/Viewnews";
import { Home } from "./component/pages/Home";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import menu_icon from "./component/images/menu.png";

function App() {
  toast.configure({
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    theme: "dark",
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
        <img
          className="menu-icon"
          src={menu_icon}
          alt="menu-icon"
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <Routes>
          <Route path="/" element={<Home setIsOpen={setIsOpen} />} />
          <Route
            path="/viewnews"
            element={<Viewnews setIsOpen={setIsOpen} />}
          />
          <Route path="/addnews" element={<Addnews setIsOpen={setIsOpen} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
