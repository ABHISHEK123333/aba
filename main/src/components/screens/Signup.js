import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link,  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'

const Signup = () => {
    
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
        name: "",
        email: "",
        password: "",

    });
    const change = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    const handlesubmit = async (e) => {
        e.preventDefault();
        if(credentials.password.length<6){
            toast.error('Password should be atleast 6 characters long');
        }
        else{
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,

            })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("userEmail",credentials.email);
            localStorage.setItem("token",json.token);
            navigate("/");
            
        }

    }
}
    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
        <div>
        <Navbar/>
        </div>
            <div className="container">
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" style={{color:"white"}}>Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={change} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{color:"white"}}>Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={change} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" style={{color:"white"}}>Password</label>
                        <div className="input">
                        <input type={type} className="form-control" name="password" value={credentials.password} onChange={change} id="exampleInputPassword1" />
                        <span onClick={handleToggle}><Icon icon={icon} size={25} style={{color:"white"}}/></span>
                    </div>
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
                <ToastContainer/>
            </div>
        </div>
    )
}
export default Signup;