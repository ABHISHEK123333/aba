import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

import Card from "../Card";
import Sdata from "../Sdata";
import Categories from "../Categories";
import Footer from "../Footer";
const Home = () => {
    const [serach,setsearch]=useState('');
    const [foodCat,setfoodCat]=useState([]);
    const [foodItem,setfooditem]=useState([]);
    const Setdata=()=>{
        setfoodCat(Categories);
       setfooditem(Sdata);
    }
    useEffect(()=>{
        Setdata();
    },[]);
    return (
        <>

           <div > <Navbar /></div>
           <div ><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
  <div className="carousel-inner" id="carousal">
  <div className="carousel-caption" style={{zIndex:"10"}}>
  <div className="d-flex justify-content-center" >
      <input className="form-control me-2" type="search" placeholder="Search" value={serach} onChange={(e)=>{
        setsearch(e.target.value);
      }} aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </div>
  </div>
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/500×300/?burger"  style={{filter:"brightness(30%)"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/500×300/?biryani" style={{filter:"brightness(30%)"}}  className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/500×300/?pastry" style={{filter:"brightness(30%)"}}  className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div></div>
           <div className="container">
            {
                foodCat !==[]
                ? foodCat.map((data)=>{
                    return (
                        <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                        {data.CategoryName}
                    </div>
                    <hr/>
                    {
                    foodItem !==[]
                    ? foodItem.filter((item)=>(item.CategoryName===data.CategoryName)&&(item.name.toLowerCase().includes(serach.toLocaleLowerCase())))
                    .map(filteritem=>{
                        return (
                            <div key={filteritem._id} className="col-12 col-md-2 col-lg-4">
                                <Card
                                foodItem={filteritem}
                                options={filteritem.options[0]}
                                

                                />
                            </div>
                        )
                    })
                    :<div>"No Such Data Is Found"</div>
                    }
                    </div>

                    )
                })
            :<div>******</div>}
            
            </div>
            <Footer/>
            
        </>
    )
}
export default Home;