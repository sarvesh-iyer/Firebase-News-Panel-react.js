import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Sidebar.css";
import home from "./images/home.png";
import view from "./images/view.png";
import add from "./images/add.png";

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/addnews") {
      setActiveTab("AddNews");
    } else if (location.pathname === "/viewnews") {
      setActiveTab("ViewNews");
    }
  }, [location]);

  return (
    <div className={`sidebar ${isOpen ? "sidebar" : "hide"}`}>
      <nav>
        <div
          className="close-sidebar"
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p
            className={activeTab === "Home" ? "active" : ""}
            onClick={() => {
              setActiveTab("Home");
              setIsOpen(false);
            }}
          >
            <span>
              <img src={home} />
            </span>
            Home
          </p>
        </Link>
        <Link to="/viewnews" style={{ textDecoration: "none" }}>
          <p
            className={activeTab === "ViewNews" ? "active" : ""}
            onClick={() => {
              setActiveTab("ViewNews");
              setIsOpen(false);
            }}
          >
            <span>
              <img src={view} />
            </span>
            View News
          </p>
        </Link>
        <Link to="/addnews" style={{ textDecoration: "none" }}>
          <p
            className={activeTab === "AddNews" ? "active" : ""}
            onClick={() => {
              setActiveTab("AddNews");
              setIsOpen(false);
            }}
          >
            <span>
              <img src={add} />
            </span>
            Add News
          </p>
        </Link>
      </nav>
    </div>
  );
};
