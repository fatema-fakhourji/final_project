import "./orderdashboard.css";
import logo from "./images/logoo.png";
import cartlogo from "./images/cartlogo.png";
import facebook from "./images/facebook.png";
import trashcan from "../src/images/bin.svg";
import whatsapp from "./images/whatsapp.png";
import instagram from "./images/instagram.png";
import gmail from "./images/gmail.png";
import React, { useCallback, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import NavBar from "./NavBar";
import Footer from "./Footer";
import del from "./images/del.png";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orderdashbord() {
  useEffect(() => {
    console.clear();
  }, []);

  const [data, setData] = useState([]);
  const [cartStuff, setCartStuff] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://casamia-d2c6.onrender.com/booking");
      const json = await response.json();
      setData(json);
      setCartStuff(json.map((item) => item.cart));
    }

    fetchData();
    checkUserRole();
  }, [data]);

  const handleProductClick = async (id) => {
    startSessionTimer();
    const response = await axios.delete(
      `https://casamia-d2c6.onrender.com/booking/${id}`
    );
    // console.log(response)
    toast.success("deleted  successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  function resetSession() {
    sessionStorage.clear(); // Clear the session storage
  }

  let sessionTimeout; // Variable to store the session timeout ID

  function startSessionTimer() {
    sessionTimeout = setTimeout(resetSession, 10 * 60 * 1000); // Set a timeout of 1 minute (1 * 60 * 1000 milliseconds)
  }

  function resetSessionTimer() {
    clearTimeout(sessionTimeout); // Clear the session timeout
    startSessionTimer(); // Start the session timer again
  }

  startSessionTimer();

  const navigate = useNavigate();

  function checkUserRole() {
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || userRole === "user") {
      // User has the 'user' role, so navigate to the desired page

      navigate("/Login", { replace: true });
    }
  }

  return (
    <>
      <div className="navbar-container">
        <div>
          <img className="logoimg" src={logo} alt="" />
        </div>

        <div>
          {/* winterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrcategoryyyyyyyyyyyyyyyyyyyyyyyy */}
          <Link to="/Winter">
            <p className="nav-buttons">AGENTS</p>
          </Link>
        </div>

        <div>
          {/* summmmmer category  */}
          <Link to="/Dashboard">
            <p className="nav-buttons">PROPERTIES</p>
          </Link>
        </div>

        <div>
          <Link to="/Orderdashboard ">
            <p className="nav-buttons">BOOKINGS</p>
          </Link>
        </div>

        {/* clear the session and go to the login  */}

        <div>
          <Link
            to="/Login"
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            <p className="nav-buttons">SIGN OUT</p>
          </Link>
        </div>
      </div>
      <ToastContainer />
      <p className="summer-parag">BOOKINGS</p>

      <div className="bookdash-div">
        <div className="bookdash-style">
          {data.map((item) => (
            <div className="bookdash-det" key={item._id}>
              <div className="bookdash-writing">
                <div className="bookdash-title desbook">
                  <h2>Booking Number: {item._id}</h2>
                </div>
                <p className="desbookdash">
                  Name: {item.booking}
                </p>
                <p className="desbookdash">Email: {item.email}</p>
                <p className="desbookdash">
                  Phone Number: {item.phone}
                </p>
                <p className="desbookdash">Availability: {item.availability}</p>
                <p className="desbookdash">Address: {item.address}</p>
              </div>
              <div className="delbbokdash">
                <img
                  onClick={() => handleProductClick(item._id)}
                  src={trashcan}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Orderdashbord;
