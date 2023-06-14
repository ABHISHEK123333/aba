import React, { useState } from "react";
import {
   
   
    Link, json,useNavigate
  } from "react-router-dom";
  import Modal from "../../Model";
  import Cart from "./Cart";
  import Badge from 'react-bootstrap/Badge'
import { useCart } from "../Contextreducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar=()=>{
  let data=useCart();
  const[cartview,setcartview]=useState(false)
  const navigate=useNavigate();
  const logouthandle=()=>{
     toast.success("Logout Succesfully");
    localStorage.removeItem("token");
    navigate("/");
  }
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Go Food</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("token",json.token))?
        <li className="nav-item">
        <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Orders</Link>
      </li>
       :"" }
      {(!localStorage.getItem("token",json.token))?
      <div className="d-flex">
      
      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
   
    
      <Link className="btn bg-white text-success mx-1" to="/createuser">Sign Up</Link>
    
    </div>
      :<div className="d-flex">
    
    <div className="btn bg-white text-success mx-1" onClick={()=>{
      setcartview(true)
    }}>
      My Cart{" "}
      <Badge pill bg="danger">{data.length}</Badge>
    </div>
    {cartview?<Modal onClose={()=>{
      setcartview(false)
    }}> <Cart/></Modal>:null}
       
    <div className="btn bg-white text-danger mx-1" onClick={logouthandle}>
      Log Out
    </div>
  
      </div>}
        
   
        
        
      </ul>
    </div>
    <ToastContainer/>
  </div>
</nav>
        </>
    )
}
export default Navbar;