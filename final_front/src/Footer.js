import "./Product.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import logo from "../src/images/logo.png";
import cartlogo from "../src/images/cartlogo.png";
import facebook from "../src/images/face.png";
import whatsapp from "../src/images/whats.png";
import instagram from "../src/images/insta.png";
import { Link } from "react-router-dom";
import tiktok from "../src/images/linkedin.png";

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-first">
          <Link to={"/Property"}>
            <p className="footer-first-p ">PROPERTIES </p>
          </Link>
          <Link to={"/Product"}>
            <p className="footer-first-p "> AGENTS </p>
          </Link>
          <Link to={"/Order"}>
            <p className="footer-first-p ">NOT AN AGENCY?</p>
          </Link>
        </div>

        <div className="fixx">
          <p className="footer-second-p"> Stay in Touch:</p>
          <div className="footer-links">
            <button className="button-footer-background">
              {" "}
              <a href="https://wa.me/+96179119624">
                {" "}
                <img className="images-buttons-footer" src={whatsapp} alt="" />
              </a>
            </button>
            <button className="button-footer-background">
              {" "}
              <a href="https://www.linkedin.com/in/fatimah-fakhourji-263b0615a">
                <img className="images-buttons-footer" src={tiktok} alt="" />
              </a>
            </button>
            <button className="button-footer-background">
              {" "}
              <a href=" https://www.instagram.com/mylifeas_aphysicist/">
                <img className="images-buttons-footer" src={instagram} alt="" />{" "}
              </a>{" "}
            </button>
            <button className="button-footer-background">
              {" "}
              <a href="">
                {" "}
                <img className="images-buttons-footer" src={facebook} alt="" />
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="rights">
        <p className="ppp">@ Copy Right: 2023 - Powered by: Fatema Fakhourji</p>
      </div>
    </div>
  );
}
export default Footer;
