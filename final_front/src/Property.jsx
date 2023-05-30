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
  const [propStuff, setPropStuff] = useState([]);
  const [propAgent, setPropAgent] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://casamia-d2c6.onrender.com/property");
        var profitdate = response.data.map((item) => item.agents);
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
        const response = await axios.get("https://casamia-d2c6.onrender.com/agent");
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
    setSelectedImage(image);
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

      <div className="prop-div">
        <p className="proptitle">PROPERTIES</p>
        <div className="prop-style">
          {data.map((item) => (
            <div className="divi">
              <React.Fragment key={item._id}>
                <div className="prop-det">
                  <div className="propp">
                    <div className="prophoto">
                      <Carousel interval={null}>
                        {item.image.map((image, index) => (
                          <Carousel.Item
                            key={index}
                            onClick={() => handleImageClick(image)}
                          >
                            <img
                              src={image.url}
                              className="imageProptResize"
                              alt={`Slide ${index}`}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>

                      <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        centered
                      >
                        <Modal.Body>
                          {selectedImage && (
                            <img
                              src={selectedImage.url}
                              className="fullScreenImage"
                              alt="Full Screen"
                            />
                          )}
                        </Modal.Body>
                      </Modal>
                    </div>
                    <div className="prop-writing">
                      <div className="prop-title desprop">
                        <h2>{item.title}</h2>
                      </div>
                      <p className="desprop">Description: {item.description}</p>
                      <p className="desprop">Type: {item.type}</p>
                    </div>
                  </div>
                </div>
                <div className="propwinter">
                  <p className="heading-prop" id="winterCollection">
                    Agents{" "}
                  </p>

                  <div className="scroll-prop">
                    <div className="parent-arrowprop">
                      <button
                        className="leftarrowprop"
                        onClick={() => scrollr()}
                      >
                        <img className="arrows-heightsprop" src={leftarrow} />
                      </button>
                    </div>

                    <div className="coverprop">
                      <div className="scroll-devsprop">
                        {item.agents.map((agent) => (
                          <div key={agent._id} className="childprop">
                            <Link to={`/Agent/${agent._id}`}>
                              <img
                                className="child-imageprop"
                                src={agent.image.url}
                                alt={agent.name}
                              />
                            </Link>
                            <p className="child-image-buttonprop">
                              {agent.name}
                            </p>
                            <p className="child-image-buttonprop">
                              Price: {item.price + ((agent.agentprice * item.price)/100)} $
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="parent-arrowprop">
                      <button
                        className="leftarrowprop"
                        onClick={() => scroll()}
                      >
                        <img className="arrows-heightsprop" src={rightarrow} />
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
