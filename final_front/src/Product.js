import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Carousel, Modal } from "react-bootstrap";
import emailjs from "emailjs-com"; // Corrected import statement
import NavBar from "./NavBar";
import Footer from "./Footer";
import swal from "sweetalert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Property.css";
import rightarrow from "../src/images/right.png";
import leftarrow from "../src/images/left.png";
import Arrow from "../src/images/Arrow.png";

function Prop() {
  useEffect(() => {
    console.clear();
  }, []);

  const [data, setData] = useState([]);
  const [propAgent, setPropAgent] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3030/agent");
        var profitdate = response.data.map((item) => item.properties);
        setData(response.data);
        setPropAgent(profitdate);
        console.log(profitdate);
      } catch (error) {
        console.log(error);
        // Handle error here
      }
    }

    fetchData();
  }, []);

  const [dataagent, setDataAgent] = useState([]);
  const [agentStuff, setAgentStuff] = useState([]);
  useEffect(() => {
    async function fetchDataagent() {
      try {
        const response = await axios.get("http://localhost:3030/property");
        setDataAgent(response.data);
        var hello = response.data.map((item) => item._id);
        setAgentStuff(hello);
        console.log(hello);
      } catch (error) {
        console.log(error);
        // Handle error here
      }
    }

    fetchDataagent();
  }, []);

  let agentt = [];
  for (let i = 0; i < propAgent.length; i++) {
    for (let j = 0; j < agentStuff.length; j++) {
      if (propAgent[i] === agentStuff[j]) {
        agentt.push(agentStuff[j]);
      }
    }
  }
  console.log(agentt);

  const scroll = () => {
    var left = document.querySelector(".scroll-devs");
    left.scrollBy(280, 0);
  };

  const scrollr = () => {
    var right = document.querySelector(".scroll-devs");
    right.scrollBy(-380, 0);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    const imageUrl = image.url; // Extract the URL from the image object
    setSelectedImage(imageUrl); // Update the selectedImage state with the URL
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <>
      <NavBar />
      <ToastContainer />

      <div className="ag-div">
        <p className="agtitle">AGENTS</p>
        <div className="ag-style">
          {data.map((item) => (
            <div className="agdivi">
              <React.Fragment key={item._id}>
                <div className="ag-det">
                  <div className="proppag">
                    <div className="agphoto">
                      <img
                        src={item.image.url}
                        className="imageProptResize"
                        alt="Property Image"
                        onClick={() => handleImageClick(item.image)}
                      />

                      <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        centered
                      >
                        <Modal.Body>
                          {selectedImage && (
                            <img
                              src={selectedImage}
                              className="fullScreenImage"
                              alt="Full Screen"
                            />
                          )}
                        </Modal.Body>
                      </Modal>
                    </div>

                    <div className="ag-writing">
                      <div className="ag-title desag">
                        <h2>{item.name}</h2>
                      </div>
                      <p className="desag">Email: {item.email}</p>
                      <p className="desag">Phone: {item.phone}</p>
                      <p className="desag">Agency: {item.agency}</p>
                    </div>
                  </div>
                </div>
                <div className="agwinter">
                  <p className="heading-ag" id="winterCollection">
                    Properties{" "}
                  </p>

                  <div className="scroll-ag">
                    <div className="parent-arrowag">
                      <button className="leftarrowag" onClick={() => scrollr()}>
                        <img className="arrows-heightsag" src={leftarrow} />
                      </button>
                    </div>

                    <div className="coverag">
                      <div className="scroll-devsag">
                        {item.properties.map((property) => (
                          <div key={property._id} className="childag">
                            <Link to={`/Propp/${property._id}`}>
                              {property.image && property.image.length > 0 && (
                                <img
                                  className="child-imageag"
                                  src={property.image[0].url}
                                  alt={property.title}
                                />
                              )}
                            </Link>
                            <p className="child-image-buttonag">
                              {property.title}
                            </p>
                            <p className="child-image-buttonag">
                              Price: {property.price + ((property.price * item.agentprice)/100)} $
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="parent-arrowag">
                      <button className="leftarrowag" onClick={() => scroll()}>
                        <img className="arrows-heightsag" src={rightarrow} />
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
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

export default Prop;
