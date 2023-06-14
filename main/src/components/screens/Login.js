import React from "react";
 import Navbar from "./Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
const Login = () => {
    const [type, setType]=useState('password');
  const [icon, setIcon]=useState(eyeOff);

  const handleToggle=()=>{    
    if(type==='password'){
      setIcon(eye);      
      setType('text');
    }
    else{
      setIcon(eyeOff);     
      setType('password');
    }
  }

    const navigate=useNavigate();
    const [credentials, setcredentials] = useState({

        email: "",

        password: "",

    });
    const change = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                email: credentials.email,
                password: credentials.password,

            })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            toast.error("Please Enter Valid Data");
        }
        if(json.success){
        
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("token",json.token);
            console.log(localStorage.setItem("token",json.token));
            
           navigate("/");
           
        }

    }
    return (

        <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
            <Navbar/>
            </div>
            <div className="container">
                <form onSubmit={handlesubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{color:"wheat"}}>Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={change} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{color:"wheat"}}>Password</label>
                        <div className="input">
                        
                        <input type={type} className="form-control" name="password" value={credentials.password} onChange={change} id="exampleInputPassword1" />
                        <span onClick={handleToggle}><Icon icon={icon} size={25} style={{color:"black"}}/></span>
                        </div>
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">Don't Have An Account</Link>
                    <Link to="/password-reset" className="m-3 btn btn-dark">Forgot Password</Link>
                    
                </form>
                
            </div>
            <ToastContainer/>
        </div>

    )
}
export default Login;