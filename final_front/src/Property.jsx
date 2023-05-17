import "./Property.css";
import del from "./images/del.png";
import rightarrow from "../src/images/arrowright.png";
import leftarrow from "../src/images/arrowleft.png";
import Arrow from "../src/images/Arrow.png";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import NavBar from "./NavBar";
import Footer from "./Footer";
import swal from "sweetalert";
import { Carousel } from "react-bootstrap";

import { toast, ToastContainer, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Prop() {
  const [categoryFetching, setCategory] = useState([]);
  const loadCategories = async () => {
    const res = await axios.get("http://localhost:3030/cat/");
    setCategory(res.data);
  };
  useEffect(() => {
    console.clear();
  }, []);

  useEffect(() => {
    loadCategories();
  }, []);

  // const sendEmail = () => {
  //   emailjs
  //     .send(
  //       "service_jd5xzbk",
  //       "template_ydo1j6i",
  //       {
  //         to_email: "badranrasha685@gmail.com",
  //         message:
  //           "Hello, this is a static message sent from the Contact Us form.",
  //       },
  //       "OZH-I9C8SPG44RNKZ"
  //     )
  //     .then(
  //       (result) => {
  //         // console.log(result.text);
  //       },
  //       (error) => {
  //         // console.log(error.text);
  //       }
  //     );
  // };
  
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
  }, [canorder]);


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

  const scroll = () => {
    var left = document.querySelector(".scroll-devs");
    left.scrollBy(280, 0);
  };

  const scrollr = () => {
    var right = document.querySelector(".scroll-devs");
    right.scrollBy(-380, 0);
  };

  const scrollsec = () => {
    var left = document.querySelector(".scroll-devos");
    left.scrollBy(380, 0);
  };

  const scrollrsec = () => {
    var right = document.querySelector(".scroll-devos");
    right.scrollBy(-380, 0);
  };
  return (
    <>
      <NavBar />
      <ToastContainer />
      <p className="proptitle">PROPERTIES</p>

      <div className="prop-div">
        <div className="prop-style">
          {cartItems.map((item) => (
            <div className="prop-det" key={item._id}>
              <div className="propp">
                <div>
                  {/* <Carousel interval={null}>
                    {item.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={image.url}
                          height={800} // Changed attribute name from "imageHeight" to "height"
                          width={1000} // Changed attribute name from "imageWidth" to "width"
                          className="imageProductResize"
                          alt={`Slide ${index}`} // Added an "alt" attribute for accessibility
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel> */}
                </div>
                <div className="prop-writing">
                  <div className="prop-title desprop">
                    <h2>{item.title}</h2>
                  </div>
                  <p className="desprop">Desription{item.size}</p>
                  <p className="desprop">Type {item.color}</p>
                  <p className="propPrice desprop">
                    Price:{" "}
                    {item.price == item.priceAfterDiscount ? (
                      <h4 className="childPrice">{item.price}$</h4>
                    ) : (
                      <h4 className="childPrice,desprop">
                        {item.priceAfterDiscount}
                      </h4>
                    )}
                  </p>
                  <p className="desprop">Quantity: {item.quantity}</p>

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
            </div>
          ))}
        </div>
        <div className="winter-collection">
          <p className="heading-collection" id="winterCollection">
            winter collection{" "}
          </p>

          <div className="scroll-collection">
            <div className="parent-arrow">
              <button className="leftarrow" onClick={() => scrollr()}>
                <img className="arrows-heights" src={leftarrow} />{" "}
              </button>
            </div>

            <div className="cover">
              <div className="scroll-devs">
                {categoryFetching
                  .filter(
                    (item) =>
                      item.season === "winter" || item.season === "Winter"
                  )
                  .map((item, index) => (
                    <div key={item._id} className="child">
                      {item.sale > 0 && (
                        <div className="discount">{item.sale}%</div>
                      )}
                      <Link to={`/ProductsPage/${item._id}`}>
                        <img
                          className="child-image"
                          src={item.image.url}
                          alt={item.name}
                        />
                      </Link>
                      <button className="child-image-button">
                        {item.name} <img src={Arrow} alt="" srcSet="" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="parent-arrow">
              <button className="leftarrow" onClick={() => scroll()}>
                <img className="arrows-heights" src={rightarrow} />
              </button>
            </div>
          </div>
        </div>
        <div className="prop-total">
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

export default Prop;
