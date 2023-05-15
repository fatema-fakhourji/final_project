
import pablo from "../src/images/pabloo.jpeg"
import "./signup.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {





    useEffect(() => {
    console.clear();
  }, []);




    const navigate = useNavigate();
    //   function navigateToSingUp (){
    //     navigate("/users/new", { replace: true });
    // }




    //     navigate("/Admin", { replace: true });

    const [username, setusername] = useState(null)

    const [password, setpassword] = useState(null)
    const [role, setrole] = useState('user')
    const [name, setname] = useState(null)
    const [address, setaddress] = useState(null)
    const [phone, setphone] = useState(null);



    const handleUsernameChange = (event) => {
        setusername(event.target.value);
    }




    const handlepasswordchange = (event) => {
        setpassword(event.target.value);
    }





    const handleName = (event) => {
        setname(event.target.value);
    }

    const handlephone = (event) => {
        setphone(event.target.value);
    }


    const handleaddress = (event) => {
        setaddress(event.target.value);
    }


















    useEffect(() => { }, [username, password, phone, address, name]);


    const submitregistration = async () => {
        try {
            const data = { email: username, password: password, role: role, address: address, phone: phone, name: name };
            const response = await axios.post(`http://localhost:3030/users`, data);

            // console.log(response.data.message)
            if (response.data.message == "User created successfully.") {

                sessionStorage.setItem('id', response.data._id);
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('role', response.data.role);
                sessionStorage.setItem('address', response.data.address);
                sessionStorage.setItem('phone', response.data.phone);

                navigate("/", { replace: true });
            } else {
                toast.error(response.data.message, { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className="container-signup" >
            <ToastContainer />


            <div className="signup-leftdiv">






                <img className="pablo-signup" src={pablo} alt="" />




                <div className="signup-form-container">


                    <h1 className="signup-in">Register</h1>

                    <label className="label-usernamepass-signup">Name</label>
                    <input type="text" className="input-usernamepass-signup" onChange={handleName} value={name} />


                    <label className="label-usernamepass-signup">phone</label>
                    <input type="Number" onChange={handlephone} value={phone} />

                    <label className="label-usernamepass-signup">Address</label>
                    <textarea name="" id="" cols="30" rows="10" onChange={handleaddress} value={address} ></textarea>


                    <label className="label-usernamepass-signup" >email</label>
                    <input className="input-usernamepass-signup" onChange={handleUsernameChange} value={username} type="text" />



                    <label className="label-usernamepass-signup"  >Password</label>
                    <input className="input-usernamepass-signup" onChange={handlepasswordchange} value={password} type="password" />


                    <button className="submit-signup" onClick={() => submitregistration()}>Submit</button>

                    <div className="login-word">
                        <h2>have an account </h2>
                        <Link to="/Login">    <h2>link login</h2></Link>
                    </div>
                </div>
            </div>




            <div className="signup-rightdiv">

            </div>












        </div>













    );
}

export default Signup;