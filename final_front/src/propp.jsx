import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Carousel, Modal } from "react-bootstrap";
import emailjs from "emailjs-com";
import NavBar from "./NavBar";
import Footer from "./Footer";
import swal from "sweetalert";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./propp.css";
import rightarrow from "../src/images/right.png";
import leftarrow from "../src/images/left.png";
import Arrow from "../src/images/Arrow.png";

function Prop() {
  useEffect(() => {
    console.clear();
  }, []);

  const [data, setData] = useState(null);
  const agentID = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://casamia-d2c6.onrender.com/property/${agentID.id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [agentID.id]);

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

      {data && (
        <div className="ag11-div">
          <p className="agtitle">{data.title}</p>
          <div className="ag-style">
            <div className="agdivi">
              <div className="ag-det">
                <div className="proppag">
                  <div className="agphoto">
                    <Carousel interval={null}>
                      {data.image.map((image, index) => (
                        <Carousel.Item
                          key={index}
                          onClick={() => handleImageClick(image)}
                        >
                          <img
                            src={image.url}
                            className="imageAgResize"
                            alt={`Slide ${index}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>

                    <Modal show={showModal} onHide={handleCloseModal} centered>
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

                  <div className="ag-writing">
                    <div className="ag-title desag">
                      <h2>{data.title}</h2>
                    </div>
                    <p className="desag">Description: {data.description}</p>
                    <p className="desag">Type: {data.type}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Prop;
