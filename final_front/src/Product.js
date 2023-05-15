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
import emailjs from "emailjs-com";
import NavBar from "./NavBar";
import Footer from './Footer';

function Product() {
 

  
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [valueQuantity,setValueQuantity]=useState();
  const [data, setData] = useState({});
  const [sizes, setSizes] = useState([]);
  const [valueSizes, setValueSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [valueColors, setValueColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const productId = useParams();
  const [title,setTitle]=useState("");
  const [price,setPrice]=useState();
  // const { productId } = match.params;
   
     useEffect(() => {
    console.clear();
  }, []);

// Get all size and color buttons
const sizeButtons = document.querySelectorAll('.sizeDetailsName');
const colorButtons = document.querySelectorAll('.colorDetailsName');

// Add click event listeners to all buttons
sizeButtons.forEach(button => button.addEventListener('click', handleButtonClick));
colorButtons.forEach(button => button.addEventListener('click', handleButtonClick));

function handleButtonClick(event) {
  const button = event.target;
  const buttonGroup = button.parentNode;

  // Remove "selected" class from all buttons in the group
  buttonGroup.querySelectorAll('.selected').forEach(selectedButton => {
    selectedButton.classList.remove('selected');
  });

  // Add "selected" class to the clicked button
  button.classList.add('selected');
}

 














  
  useEffect(() => {
    loadSingleProduct();
  }, [productId]);

  useEffect(() => {
    setSizes(data.size || []);
  }, [data.size]);

  useEffect(() => {
    setColors(data.color || []);
  }, [data.color]);

  useEffect(() => {
    setImages(data.image || []);
  }, [data.image]);


  const saveToLocalStorage = () => {
  // Get the existing cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Check if the product is already in the cart
  const existingCartItemIndex = cartItems.findIndex((item) => item._id === data._id);

  if (existingCartItemIndex !== -1) {
    // If the product is already in the cart, increment its quantity
    cartItems[existingCartItemIndex].quantity += quantity;
  } else {
    // If the product is not in the cart, add it as a new item
    cartItems.push({
      _id: data._id,
      title: data.title,
      price: data.price,
      priceAfterDiscount: data.priceAfterDiscount,
      size: valueSizes,
      color: valueColors,
      quantity: quantity,
    });

  }

  // Save the updated cart items to local storage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

  

  const loadSingleProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3030/product/productByID/${productId.productId}`);
     
      setData(res.data);

      
    } catch (error) {
      console.error(error);
    }
  };


   function handleColorClick(event) {
   
    setValueColors(event.target.value);
    
  }
  
   function handleSizeClick(event) {
    
    setValueSizes(event.target.value);
    
    

  }


  const sizeListItems = sizes.map((size) => (
    <button
      className="sizeDetailsName"
      key={size.id}
      value={size}
      onClick={handleSizeClick}
    >
      {size}
      
      
    </button>
  ));

  
  const colorListItems = colors.map((color) =>
    <button
      className="colorDetailsName"
      key={color.id}
      value={color}
      onClick={handleColorClick}
    >
      {color}
    </button>
  );

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

 

  return (
    <div className="imagesProduct">
    <NavBar/>
      <div className='allProducts'>
      <Carousel interval={null}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={image.url}
              imageHeight={800}
              imageWidth={1000}
              className="imageProductResize"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="details">
        <p className="title">{data.title}</p>
        <div className="price">
        
            {data.price == data.priceAfterDiscount  ? <h3>{data.price}$</h3> : 
              <div className="price"> 
                <h3>{ data.priceAfterDiscount}$</h3> 
                <h4>{data.price}$</h4>
              </div>
            }
           </div>
        <p className="size">Size</p>
        <p className="sizeDetails">
          {sizeListItems}
        </p>
        <p className="size">Color</p>
        <p className="colorDetails">
        {colorListItems}
        </p>
      <div className="quantity-button">
      <p className='quantityText'>Quantity</p>
      <p className="borderr">
      <button className="quantity-button__decrease" onClick={handleDecrease}>
        -
      </button>
      <span className="quantity-button__quantity" >{quantity}</span>
      <button className="quantity-button__increase" onClick={handleIncrease}>
        +
      </button>
      </p>
    </div>
    <div className='description'>
      <p className="descriptionTitle">Description</p>
      <ul className='descriptionDetails'><li>{data.Description}</li></ul>
    </div>
    <div>
     <Link to={`/Order`}> <button className='cartButton' onClick={saveToLocalStorage}> Add to cart</button></Link>
    </div>
    </div>

      </div>
      <Footer/>
    </div>
  );
}

export default Product;