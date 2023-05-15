
import pablo from "../src/images/pabloo.jpeg"
import "./login.css"
import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {




       useEffect(() => {
    console.clear();
  }, []);





    const navigate = useNavigate();
    //   function navigateToSingUp (){
    //     navigate("/users/new", { replace: true });
    // }
    //     navigate("/Admin", { replace: true });





    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')


    const handleUsernameChange = (event) => {
        setusername(event.target.value);
    }




    const handlepasswordchange = (event) => {
        setpassword(event.target.value);
    }

    useEffect(() => { }, [username, password]);


    const submitlogin = async () => {
        try {
            const data = { email: username, password: password };
            const response = await axios.post(`http://localhost:3030/users/login`, data);
            console.log(response.data.role);
            console.log(response.data.token);
            if (response.data.role == "admin") {
                sessionStorage.setItem('id', response.data._id);
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('role', response.data.role);

                navigate("/Dashboard", { replace: true });
            } else if (response.data.role == "user") {
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
        <div className="container-login" >

            <ToastContainer />

            <div className="login-leftdiv">



                <img className="pablo-login" src={pablo} alt="" />




                <div className="login-form-container">


                    <h1 className="sign-in">Sign in</h1>

                    <label className="label-usernamepass" >Username</label>
                    <input className="input-usernamepass" onChange={handleUsernameChange} value={username} type="text" />


                    <label className="label-usernamepass"  >Password</label>
                    <input className="input-usernamepass" onChange={handlepasswordchange} value={password} type="password" />


                    <button className="submit-login" onClick={() => submitlogin()}>Submit</button>

                    <div className="signup-word">
                        <h2>need an account </h2>

                        <Link to="/signup">  <h2>link signup</h2></Link>
                    </div>
                </div>
            </div>




            <div className="login-rightdiv">

            </div>












        </div>













    );
}

export default Login;