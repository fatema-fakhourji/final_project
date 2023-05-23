import pablo from "../src/images/logoo.png";
import "./Order.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import emailjs from "emailjs-com";

function Login() {
  useEffect(() => {
    console.clear();
  }, []);

  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [availability, setavailability] = useState("");
  const [address, setaddress] = useState("");
  const [appointmentScheduled, setAppointmentScheduled] = useState(false);

  const handleUsernameChange = (event) => {
    setusername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setphone(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setavailability(event.target.value);
  };

  const handleAddressChange = (event) => {
    setaddress(event.target.value);
  };

  const submitLogin = async () => {
    try {
      const data = {
        name: username,
        email: email,
        phone: phone,
        availability: availability,
        address: address,
      };
      const response = await axios.post(`http://localhost:3030/booking`, data);
      setAppointmentScheduled(true); // Update state after successful submission
    } catch (error) {
      console.error(error);
    }
  };

  const sendEmail = () => {
    emailjs
      .send(
        "service_jd5xzbk",
        "template_ydo1j6i",
        {
          to_email: "fatemaalbatoulfakhourji@gmail.com",
          message:
            "Hello, this is a static message sent from the Contact Us form.",
        },
        "OZH-I9C8SPG44RNKZ"
      )
      .then(
        (result) => {
          // console.log(result.text);
        },
        (error) => {
          // console.log(error.text);
        }
      );
  };

  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="containers">
        <p className="proptitlee">Not an Agency?</p>
        <ToastContainer />
        <div className="leftogg">
          <div className="formcontainer">
            {!appointmentScheduled ? (
              <>
                <h1 className="signin">
                  Contact us and Schedule an Appointment
                </h1>

                <label className="usernamepass">Name</label>
                <input
                  className="inputusernamepass"
                  onChange={handleUsernameChange}
                  value={username}
                  type="text"
                />
                <label className="usernamepass">Email</label>
                <input
                  className="inputusernamepass"
                  onChange={handleEmailChange}
                  value={email}
                  type="text"
                />
                <label className="usernamepass">Phone</label>
                <input
                  className="inputusernamepass"
                  onChange={handlePhoneChange}
                  value={phone}
                />
                <label className="usernamepass">Availability</label>
                <input
                  className="inputusernamepass"
                  onChange={handleAvailabilityChange}
                  value={availability}
                  type="text"
                />
                <label className="usernamepass">Address</label>
                <input
                  className="inputusernamepass"
                  onChange={handleAddressChange}
                  value={address}
                  type="text"
                />
                <button
                  className="submitlogin"
                  onClick={(event) => {
                    submitLogin();
                    sendEmail();
                    setAppointmentScheduled(true);
                  }}
                >
                  Submit
                </button>
              </>
            ) : (
              <p className="proptitlee">Appointment Scheduled</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
