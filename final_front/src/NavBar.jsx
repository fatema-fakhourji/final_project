import "./Product.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import logo from "../src/images/logoo.png";
import cartlogo from "../src/images/cartlogo.png";
import facebook from "../src/images/facebook.png";
import whatsapp from "../src/images/whatsapp.png";
import instagram from "../src/images/instagram.png";
import gmail from "../src/images/gmail.png";
import { Link } from "react-router-dom";

function NavBar() {
  const [show, setshow] = useState(true);

  function checkUserRole() {
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || !userRole) {
      // User has the 'user' role, so navigate to the desired page

      setshow(true);
    } else {
      setshow(false);
    }
  }

  useEffect(() => {
    checkUserRole();
  }, []);

  return (
    <div className="navbar-container">
      <div>
        <Link to={'/'}>
        <img className="logoimg" src={logo} alt="" srcset="" />
        </Link>
      </div>

      <div className="navigation-buttons">
        <Link to={"/Property"}>
          <p className="nav-buttons">PROPERTIES</p>
        </Link>
        <Link to={"/Product"}>
          <p className="nav-buttons">AGENTS</p>
        </Link>
        <Link to={"/Order"}>
          <p className="nav-buttons">NOT AN AGENCY?</p>
        </Link>
      </div>
      <div className="last-header">
        <Link to={"/Login"} style={{ display: show ? "block" : "none" }}>
          <p className="nav-buttons">SIGN IN</p>
        </Link>
      </div>
    </div>
  );
}
export default NavBar;
