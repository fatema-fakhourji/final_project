import "./Order.css";
import jacket from "./images/jacket.png";
import del from "./images/del.png";
import logo from "./images/logo.png";
import cartlogo from "./images/cartlogo.png";
import facebook from "./images/facebook.png";
import whatsapp from "./images/whatsapp.png";
import instagram from "./images/instagram.png";
import gmail from "./images/gmail.png";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "./NavBar";
import Footer from "./Footer";
import swal from "sweetalert";

import { toast, ToastContainer, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Order() {
     useEffect(() => {
    console.clear();
  }, []);

  const sendEmail = () => {
    emailjs
      .send(
        "service_jd5xzbk",
        "template_ydo1j6i",
        {
          to_email: "badranrasha685@gmail.com",
          message:
            "Hello, this is a static message sent from the Contact Us form.",
        },
        "OZH-I9C8SPG44RNKZ"
      )
      .then(
        (result) => {
          // console.log(result.text);
        },
        (error) => {
          // console.log(error.text);
        }
      );
  };
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [quantity, setQuantity] = useState(1);
  const [cartquantity, setcartQuantity] = useState();
  const [totallPrice, setTotalPrice] = useState();
  const [phoneNum, setPhoneNum] = useState(sessionStorage.getItem("phone"));
  const [address, setAddress] = useState(sessionStorage.getItem("address"));

  
  function deleteProductFromLocalStorage(id) {
    const updatedProducts = cartItems.filter((product) => product._id !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
  }

  const [canorder, setcanorder] = useState(true);

  function checkUserRole() {
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || !userRole) {
      // User has the 'user' role, so navigate to the desired page

      setcanorder(false);
    } else {
      setcanorder(true);
    }
  }

  useEffect(() => {
    checkUserRole();
    totalcalculator();
  }, [canorder]);

  const totalcalculator = () => {
    const cartquan = cartItems.map((item) => item.quantity);
    const cartprice = cartItems.map((item) => item.priceAfterDiscount);
    var total = 0;
    const carttwo = [];
    for (let i = 0; i < cartquan.length; i++) {
      const item = {};

      item.quantity = cartquan[i];
      item.price = cartprice[i];
      item.totalprice = cartquan[i] * cartprice[i];
      carttwo.push(item);
      total += item.totalprice;
    }
   
    setTotalPrice(total);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (canorder) {
      sendEmail();
      const cartitemid = cartItems.map((item) => item._id);
      const cartquan = cartItems.map((item) => item.quantity);
      const cartsize = cartItems.map((item) => item.size);
      const carttitle = cartItems.map((item) => item.title);
      const cartcolor = cartItems.map((item) => item.color);
      const cartprice = cartItems.map((item) => item.priceAfterDiscount);
      var total = 0;
      const cart = [];
      for (let i = 0; i < cartquan.length; i++) {
        const item = {};
        item.productID = cartitemid[i];
        item.color = cartcolor[i];
        item.size = cartsize[i];
        item.title = carttitle[i];
        item.quantity = cartquan[i];
        item.price = cartprice[i];
        item.totalprice = cartquan[i] * cartprice[i];
        cart.push(item);
        total += item.totalprice;
      }
      

      
      // event.preventDefault();
      const response = await fetch("http://localhost:3030/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          payment_type: "Cash on Delivery",
          total_price: total,
          phone_number: phoneNum,
          address: address,
        }),
      });
      const data = await response.json();
      
      toast.success("your order is sent ", {
        position: toast.POSITION.TOP_RIGHT,
      });
      localStorage.clear();
      delayedRefresh();
    } else {
      toast.error("please sign in to continue this order", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const delayedRefresh = () => {
    setTimeout(function () {
      window.location.reload();
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  function handleProductClick(id) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteProductFromLocalStorage(id);
        const updatedCartItems = cartItems.filter((item) => item._id !== id);
        setCartItems(updatedCartItems);

        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your Order is safe!");
      }
    });
  }
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };




  function clearLocalStorage() {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear();
        window.location.reload();
        swal("Poof! Your file has been deleted!", {
          icon: "success",
        });
        window.location.reload();
      } else {
        swal("Your Order is safe!");
      }
    });
  }

 

  useEffect(() => { }, [totallPrice]);

  return (
    <>
      <NavBar />
      <ToastContainer />
      <p className="Orders-page">Orders</p>

      <div className="orders-div">
        <div className="order-style">
          {cartItems.map((item) => (
            <div className="order-det" key={item._id}>
              <div className="order-writing">
                <div className="order-title desOrder">
                  <h2>{item.title}</h2>
                </div>
                <p className="desOrder">Size: {item.size}</p>
                <p className="desOrder">Color: {item.color}</p>
                <p className="orderPrice desOrder">
                  Price:{" "}
                  {item.price == item.priceAfterDiscount ? (
                    <h4 className="childPrice">{item.price}$</h4>
                  ) : (
                    <h4 className="childPrice,desOrder">
                      {item.priceAfterDiscount}
                    </h4>
                  )}
                </p>
                <p className="desOrder">Quantity: {item.quantity}</p>

                <div className="quantity">
                  <img
                    className="delete-icon"
                    onClick={() => handleProductClick(item._id)}
                    src={del}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-total">
          <div>
            <p>Total:</p>
          </div>
          <div>
            <p>{totallPrice} $</p>
          </div>
        </div>
        <div className="order-pay">
          <div>
            <p>Payement Method:</p>
          </div>
          <div>
            <p>Cash on delivery</p>
          </div>
        </div>
        <button
          className="order-check"
          onClick={(event) => {
            handleSubmit(event);
          }}
        >
          Place Order
        </button>
        <button className="orderalldelete" onClick={() => clearLocalStorage()}>
          Delete Order
        </button>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Order;
