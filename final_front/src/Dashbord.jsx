import "./dashbord.css";
import logo from "../src/images/logoo.png";
import trashcan from "../src/images/bin.svg";
import pen from "../src/images/pencil.svg";
import editbutton from "../src/images/editbutton.png";
import Addbutton from "../src/images/Addbutton.png";
import { useState } from "react";
import Collapsible from "react-collapsible";
import { Carousel, Modal } from "react-bootstrap";
import axios from "axios";
import rightarrow from "../src/images/right.png";
import leftarrow from "../src/images/left.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [property_id, setproperty_id] = useState(null);
  const [properties, setproperties] = useState(null);
  const [propname, setPropname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [type, setType] = useState("");
  const [edit, setImage] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectededitAgent, setSelectededitAgent] = useState(""); // Add selectedAgent state

  const [Newseason, setNewseason] = useState("summer");
  const [Newsale, setNewsale] = useState(0);

  const [title, setTitle] = useState("");
  // const [price, setPrice] = useState("");

  const [Products_id, setProducts_id] = useState(null);

  const [edittitle, setedittitle] = useState("");
  const [editprice, seteditPrice] = useState("");
  const [editDescription, seteditDescription] = useState("");
  const [color, setColor] = useState([]);
  const [Description, setDescription] = useState("");
  const [editType, seteditType] = useState("");
  const [pimage, setPimage] = useState("");
  const [threeimages, setthreeimages] = useState([]);

  const [productsdata, setproductsdata] = useState();

  const [cat_id, setcat_id] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.clear();
  }, []);

  function checkUserRole() {
    const userRole = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    // Get the user's role from session storage
    if (!token || userRole === "user") {
      // User has the 'user' role, so navigate to the desired page

      navigate("/Login", { replace: true });
    }
  }

  // make the session clearrrrrr

  function resetSession() {
    sessionStorage.clear(); // Clear the session storage
  }

  let sessionTimeout; // Variable to store the session timeout ID

  function startSessionTimer() {
    sessionTimeout = setTimeout(resetSession, 10 * 60 * 1000); // Set a timeout of 1 minute (1 * 60 * 1000 milliseconds)
  }

  function resetSessionTimer() {
    clearTimeout(sessionTimeout); // Clear the session timeout
    startSessionTimer(); // Start the session timer again
  }

  const handleAgentChange = (e) => {
    setSelectedAgent(e.target.value);
  };

  startSessionTimer();

  useEffect(() => {
    getCategories();
    checkUserRole();
    getAgent();
  }, [
    properties,
    Description,
    pimage,
    color,
    property_id,
    cat_id,
    Newsale,
    threeimages,
    Products_id,
    title,
    price,
    color,
    Description,
    edittitle,
    editType,
    editprice,
    editDescription,
    productsdata,
    price,
    description,
    type,
  ]);

  const getCategories = async () => {
    const response = await axios.get(`https://casamia-d2c6.onrender.com/property`);
    const categories = response.data.map((property) => ({
      id: property._id,
      title: property.title,
    }));
    setproperties(categories);
  };
  const getAgent = async () => {
    const response = await axios.get("https://casamia-d2c6.onrender.com/agent");
    const products = response.data.map((agent) => ({
      name: agent.name,
      id: agent._id,
    }));
    // console.log(products);
    setAgents(products);
  };
  const [productimage, setproductimage] = useState([]);

  function handleProductImage(e) {
    const selectedFiles = e.target.files;
    const newImages = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = () => {
          newImages.push(file);
          setproductimage(newImages);
        };

        reader.readAsDataURL(file);
      }
    }
  }

  const addCategory = async () => {
    startSessionTimer();
    const formData = new FormData();
    formData.append("title", propname);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("type", type);
    // Append the image files to the "image[]" field in the FormData
    for (let i = 0; i < productimage.length; i++) {
      formData.append("image", productimage[i]); // Append with "image[]" field name
    }
    // Append each agent ID to the "agents[]" field in the FormData
    agents.forEach((agent) => {
      formData.append("agents", agent.id); // Append with "agents[]" field name
    });

    try {
      await axios.post("https://casamia-d2c6.onrender.com/property", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Added category successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSale = (e) => {
    setNewsale(e.target.value);
  };

  const putCategory = async () => {
    try {
      const response = await axios.get(
        `https://casamia-d2c6.onrender.com/property/${Products_id}`
      );
      const property = response.data;

      const updatedAgents = [...property.agents]; // Create a copy of the agents array

      const selectedIndex = updatedAgents.indexOf(selectededitAgent);

      if (selectedIndex > -1) {
        // If the selectededitAgent exists in the agents array, remove it
        updatedAgents.splice(selectedIndex, 1);
      }

      updatedAgents.push(selectededitAgent); // Add the new agent to the copied array

      await axios.put(`https://casamia-d2c6.onrender.com/property/${Products_id}`, {
        title: edittitle,
        price: editprice,
        description: editDescription,
        type: editType,
        agents: updatedAgents, // Update the agents array with the modified copy
      });

      // Rest of the code...
    } catch (error) {
      console.error(error);
    }
  };

  const deletecategory = async (id) => {
    startSessionTimer();
    const response = await axios.delete(`https://casamia-d2c6.onrender.com/property/${id}`);
    console.log(response.data);

    // console.log("the category is deleted ")
    toast.success("category deleted  successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    console.clear();
  }, []);
  const deleteagent = async (id) => {
    startSessionTimer();
    const response = await axios.delete(
      `https://casamia-d2c6.onrender.com/agent/${property_id}`
    );
    console.log(property_id);

    // console.log("the category is deleted ")
    toast.success("agent deleted  successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
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
        console.log(Products_id);
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
  const OpenAddCategory = () => {
    document.getElementById("addcategoryform").style.display = "block";
  };

  const CloseAddCategory = () => {
    document.getElementById("addcategoryform").style.display = "none";
  };
  const OpenEditCategory = () => {
    document.getElementById("editcategoryform").style.display = "block";
  };

  const CloseEditCategory = () => {
    document.getElementById("editcategoryform").style.display = "none";
  };

  const [openIndex, setOpenIndex] = useState(-1);

  const [images, setImages] = useState([]);

  const handleImagesChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      imagesArray.push(URL.createObjectURL(file));
    }
    setImages(imagesArray);
  };

  return (
    <div>
      <ToastContainer />
      <div className="navbar-container">
        <div>
          <img className="logoimg" src={logo} alt="" />
        </div>

        <div>
          {/* winterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrcategoryyyyyyyyyyyyyyyyyyyyyyyy */}
          <Link to="/Winter">
            <p className="nav-buttons">AGENTS</p>
          </Link>
        </div>

        <div>
          {/* summmmmer category  */}
          <Link to="/Dashboard">
            <p className="nav-buttons">PROPERTIES</p>
          </Link>
        </div>

        <div>
          <Link to="/Orderdashboard ">
            <p className="nav-buttons">BOOKINGS</p>
          </Link>
        </div>

        {/* clear the session and go to the login  */}

        <div>
          <Link
            to="/Login"
            onClick={() => {
              sessionStorage.clear();
            }}
          >
            <p className="nav-buttons">SIGN OUT</p>
          </Link>
        </div>
      </div>

      <div className="headers">
        <div className="parent-headder">
          <p className="summer-parag">PROPERTIES</p>
        </div>
        <br></br>
        <div className="newcategory">
          <p> Add New Property</p>
          <button
            className="addbutton"
            onClick={() => {
              OpenAddCategory();
            }}
          >
            <img src={Addbutton} alt="" />
          </button>
        </div>
      </div>
      <div className="dash-div">
        <div className="prop-style">
          {data.map((item) => (
            <div className="divi" key={item._id}>
              <div>
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
                            <img
                              className="child-imageprop"
                              src={agent.image.url}
                              alt={agent.name}
                            />
                            <p className="child-image-buttonprop">
                              {agent.name}
                            </p>
                            <p className="child-image-buttonprop">
                              Price:{" "}
                              {item.price +
                                (agent.agentprice * item.price) / 100}{" "}
                              $
                            </p>
                            <button
                              className="del-btn"
                              onClick={() => {
                                setproperty_id(agent._id);
                                deleteagent(agent._id);
                              }}
                            >
                              <img src={trashcan} alt="" />
                            </button>
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
              </div>
              <button
                className="del-btn"
                onClick={() => {
                  OpenEditCategory();
                  setProducts_id(item._id);
                }}
              >
                <img src={pen} alt="" />
              </button>
              <button
                className="del-btn1"
                onClick={() => {
                  deletecategory(item._id);
                }}
              >
                <img src={trashcan} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="form-popup" id="addcategoryform">
        <h1>Add Property </h1>

        <label for="name">
          <b>Title</b>
        </label>
        <input
          type="text"
          placeholder="Enter category name"
          value={propname}
          onChange={(e) => setPropname(e.target.value)}
          required
        />
        <br />
        <label for="psw">
          <b>Price</b>
        </label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label for="psw">
          <b>Description</b>
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <br />
        <label for="psw">
          <b>Type</b>
        </label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <br />
        <label htmlFor="agent">
          <b>Agent</b>
        </label>
        <select
          id="agent"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
        >
          <option value="">Select an agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        <div>
          <label htmlFor="images">Choose Images:</label>
          <br />
          <input
            type="file"
            name="file"
            onChange={handleProductImage}
            multiple
          />
          <br />
        </div>

        <button type="submit" className="btn" onClick={addCategory}>
          Submit
        </button>
        <button
          type="button"
          className="btn cancel"
          onClick={() => CloseAddCategory()}
        >
          Close
        </button>
      </div>
      <div className="form-popup" id="editcategoryform">
        <h1>Edit Property </h1>

        <label for="name">
          <b>Title</b>
        </label>
        <input
          type="text"
          placeholder="Enter category name"
          value={edittitle}
          onChange={(e) => setedittitle(e.target.value)}
          required
        />
        <br />
        <label for="psw">
          <b>Price</b>
        </label>
        <input
          type="text"
          value={editprice}
          onChange={(e) => seteditPrice(e.target.value)}
        />
        <br />
        <label for="psw">
          <b>Description</b>
        </label>
        <input
          type="text"
          value={editDescription}
          onChange={(e) => seteditDescription(e.target.value)}
        />
        <br />
        <label for="psw">
          <b>Type</b>
        </label>
        <input
          type="text"
          value={editType}
          onChange={(e) => seteditType(e.target.value)}
        />
        <br />
        <label htmlFor="agent">
          <b>Agent</b>
        </label>
        <select
          id="agent"
          value={selectededitAgent}
          onChange={(e) => setSelectededitAgent(e.target.value)}
        >
          <option value="">Select an agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn" onClick={putCategory}>
          Submit
        </button>
        <button
          type="button"
          className="btn cancel"
          onClick={() => CloseEditCategory()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
