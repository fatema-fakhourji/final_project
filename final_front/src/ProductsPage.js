import './ProductsPage.css';
import imagess from './images/jacket.png';
import imagesHover from './images/Vector.png';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import logo from "../src/images/logo.png"
import cartlogo from "../src/images/cartlogo.png"
import facebook from "../src/images/facebook.png"
import whatsapp from "../src/images/whatsapp.png"
import instagram from "../src/images/instagram.png"
import gmail from "../src/images/gmail.png"
import NavBar from "./NavBar";
import Footer from './Footer';
function ProductsPage() {
  const [cardDatas, setCardDatas] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const category_id = useParams();
  const [images,setimages]=useState({})
  const [title,setTitle]=useState("")
  const loadAllProducts = async () => {
    const res = await axios.get(`http://localhost:3030/product/productbyCategory/${category_id.category_id}`);
    setCardDatas(res.data);
    setCardImages(res.data.map((item,index) => item.image[0]));
  };
  
     useEffect(() => {
    console.clear();
  }, []);

 
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadTitle = async () => {
    const res = await axios.get(`http://localhost:3030/cat/${category_id.category_id}`);
    setTitle(res.data.name)
  };


 
  useEffect(() => {
    loadTitle();
  }, []);
  
  return (
    
    <div className="allProductsss">
      <NavBar/>
      <div className="allProductsPage">
      <div className="mainTitleProduct">{title}</div>
      <div className="card-list">
        {cardDatas.map((item, index) => (
          <div className='product-card' key={item._id}>
            <Link to={`/Product/${item._id}`}>
              <img
                className="allProductsImage"
                src={cardImages &&cardImages[index]?.url}
                alt={item.title}
              />
            </Link>
            <div className="backcolorOfProduc">
            <p className="allProductsTitle">{item.title}</p>
            <div className="price">
            {item.price == item.priceAfterDiscount  ? <h3>{item.price}$</h3> : 
              <div className="price"> 
                <h3>{ item.priceAfterDiscount}$</h3> 
                <h4>{item.price}$</h4>
              </div>
            }
           </div>
           </div>
          </div>
        ))}
      </div>
    </div>
     <Footer/>

    </div>
  );
  }export default ProductsPage;