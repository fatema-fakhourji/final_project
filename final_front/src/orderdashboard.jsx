import "./orderdashboard.css";
import logo from "./images/logo.png";
import cartlogo from "./images/cartlogo.png";
import facebook from "./images/facebook.png";
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
      const response = await fetch("http://localhost:3030/api/orders");
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
      `http://localhost:3030/api/orders/${id}`
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
            <p className="nav-buttons">Winter Categories</p>
          </Link>
        </div>

        <div>
          {/* summmmmer category  */}
          <Link to="/Dashboard">
            <p className="nav-buttons">Summer Categories</p>
          </Link>
        </div>

        <div>
          <Link to="/Orderdashboard ">
            <p className="nav-buttons">Orders</p>
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
            <p className="nav-buttons">Sign out</p>
          </Link>
        </div>
      </div>
      <ToastContainer />
      <p className="Ordersdash-page">Orders</p>

      <div className="ordersdash-div">
        <div className="orderdash-style">
          {data.map((item) => (
            <div className="orderdash-det" key={item._id}>
              <div className="orderdash-writing">
                <div className="orderdash-title desOrder">
                  <h2>Order: {item._id}</h2>
                </div>
                <div className="cartit">
                  <h3>Cart:</h3>
                  <ul>
                    {item.cart.map((cartItem) => (
                      <li key={cartItem._id}>
                        <p>Title: {cartItem.title}</p>
                        <p>Size: {cartItem.size}</p>
                        <p>Color: {cartItem.color}</p>
                        <p>Quantity: {cartItem.quantity}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="desOrderdash">
                  Payment type: {item.payment_type}
                </p>
                <p className="desOrderdash">Total price: {item.total_price}$</p>
                <p className="desOrderdash">
                  Phone_number: {item.phone_number}
                </p>
                <p className="desOrderdash">Address: {item.address}</p>
                <p className="desOrderdash">Created at: {item.created_at}</p>
              </div>
              <div className="deldash">
                <img
                  onClick={() => handleProductClick(item._id)}
                  src={del}
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
