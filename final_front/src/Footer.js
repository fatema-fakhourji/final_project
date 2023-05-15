import './Product.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import logo from "../src/images/logo.png"
import cartlogo from "../src/images/cartlogo.png"
import facebook from "../src/images/facebook.png"
import whatsapp from "../src/images/whatsapp.png"
import instagram from "../src/images/instagram.png"
import gmail from "../src/images/gmail.png"
import { Link } from 'react-router-dom';
import tiktok from "../src/images/tik.png"

function Footer(){
return(
 <div className='footer'>

        <div className='footer-first'>

          <a href="/"><p className='footer-first-p '>Home </p></a>
          <Link to={"/"}><p className='footer-first-p ' > About Us </p></Link>
          <a href="/#winterCollection"><p className='footer-first-p '  >Winter Collection </p></a>
          <a href="/#summerCollection"><p className='footer-first-p ' >Summer Collection </p></a>





        </div>






        <div className='footer-second'>

          <p className='footer-second-p'> @ Copy Right: 2023</p>
          <p className='footer-second-p'>Powered by: Codi Team</p>


        </div>






        <div>


          <p className='footer-second-p'> Stay IN TOUCH:</p>
          <div className='footer-links'>
            <button className='button-footer-background' > <a href='https://wa.me/+96176063760'> <img className='images-buttons-footer' src={whatsapp} alt="" /></a></button>
            <button className='button-footer-background' >  <a href='https://www.tiktok.com/@pablo.lb12'><img className='images-buttons-footer' src={tiktok} alt="" /></a></button>
            <button className='button-footer-background' >   <a href=' https://instagram.com/pablo.lb1?igshid=YmMyMTA2M2Y='><img className='images-buttons-footer' src={instagram} alt="" /> </a>   </button>
            <button className='button-footer-background' >   <a href='mailto:shoppablo248@gmail.com'>   <img className='images-buttons-footer' src={gmail} alt="" /></a></button>



          </div>



        </div>


      </div>

);
}
export default Footer;