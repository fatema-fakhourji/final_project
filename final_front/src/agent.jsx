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
        const response = await axios.get(`http://localhost:3030/agent/${agentID.id}`);
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
    const imageUrl = image.url;
    setSelectedImage(imageUrl);
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
        <div className="ag-div">
          <p className="agtitle">{data.name}</p>
          <div className="ag-style">
            <div className="agdivi">
              <div className="ag-det">
                <div className="proppag">
                  <div className="agphoto">
                    <img
                      src={data.image.url}
                      className="imageAgResize"
                      alt="Property Image"
                      onClick={() => handleImageClick(data.image)}
                    />

                    <Modal show={showModal} onHide={handleCloseModal} centered>
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
                      <h2>{data.name}</h2>
                    </div>
                    <p className="desag">Email: {data.email}</p>
                    <p className="desag">Phone: {data.phone}</p>
                    <p className="desag">Agency: {data.agency}</p>
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
