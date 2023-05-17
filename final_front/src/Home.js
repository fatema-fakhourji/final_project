import "./Home.css";
import logo from "../src/images/logo.png";
import cartlogo from "../src/images/cartlogo.png";
import slider1 from "../src/images/slider1.jpeg";
import slider2 from "../src/images/dubai.jpg";
import slider3 from "../src/images/pxfuel.jpg";
import slider4 from "../src/images/Quartier-financier-Dubai.jpg";
import jacket from "../src/images/jacket.png";
import rightarrow from "../src/images/arrowright.png";
import leftarrow from "../src/images/arrowleft.png";
import facebook from "../src/images/facebook.png";
import whatsapp from "../src/images/whatsapp.png";
import instagram from "../src/images/instagram.png";
import gmail from "../src/images/gmail.png";
import axios from "axios";
import Arrow from "../src/images/Arrow.png";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
function App() {
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

  let currentSlide = 0;

  const imagesss = [
    { src: slider2, alt: "Image 1" },
    { src: slider3, alt: "Image 2" },
    { src: slider4, alt: "Image 3" },
  ];
  const delay = 2500;

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === imagesss.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

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
    <div className="App">
      <NavBar />

      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {imagesss.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="slideP"
            />
          ))}
        </div>

        <div className="slideshowDots">
          {imagesss.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="pablo-description">
        <p className="description-header">About Us</p>
        <p className="description-description" id="about-Us">
          Welcome to PABLO, your one-stop shop for stylish and affordable men's
          clothing. Our carefully curated collection features the latest trends
          in men's fashion, including casual wear, business attire, and formal
          wear. Pablo also help the customers to find the right clothing and
          accessories to suit their individual tastes and needs.{" "}
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default App;
