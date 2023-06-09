import "./Home.css";
import logo from "../src/images/logo.png";
import slider1 from "../src/images/slider1.jpeg";
import slider2 from "../src/images/dubai.jpg";
import slider3 from "../src/images/pxfuel.jpg";
import slider4 from "../src/images/Quartier-financier-Dubai.jpg";
import jacket from "../src/images/jacket.png";
import rightarrow from "../src/images/arrowright.png";
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
  useEffect(() => {
    console.clear();
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
          Welcome to Casa Mia, your premier destination for all your real estate
          needs. At Casa Mia, we believe that finding the perfect home is an
          art, and we are dedicated to helping you unlock the door to your dream
          property. With a team of experienced professionals and a deep
          understanding of the real estate market, we are committed to providing
          exceptional service and personalized guidance to each and every
          client. Whether you're searching for a cozy apartment, a spacious
          family home, or a luxurious estate, Casa Mia is here to guide you
          every step of the way. Trust us to deliver unparalleled expertise,
          integrity, and a passion for real estate that will make your home
          buying or selling journey a seamless and rewarding experience. Welcome
          to Casa Mia, where your vision of home becomes a reality.{" "}
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default App;
