import React, { useEffect, useRef, useState } from "react";
import { useCart,useDispatchcart } from "./Contextreducer";

const Card=(props)=>{
    const priceref=useRef();
    let dispatch=useDispatchcart();
    let data=useCart();
    let options=props.options;
    let priceoption=Object.keys(options);
   const[qty,setqnty]=useState(1);
   const[size,setsize]=useState("");
   let finalprice=qty*parseInt(options[size]);

    const handlecart=async ()=>{
        let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalprice, qty: qty })
          return
        
        }
        else if (food.size !== size) {
         await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalprice,qty:qty,size:size})
   
    return
        }
        return
    }
    }
       
        useEffect(()=>{
            setsize(priceref.current.value);
        },[]);
return (
    <div>
                <div className="card mt-3 " style={{ "width": "18rem","maxHeight":"360px" }}>
                    <img src={props.foodItem.img} style={{height:"120px",objectFit:"fill"}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                       <div className="container w 100" >
                        <select className="m-2 h-100 bg-success" onChange={(e)=>{
                            setqnty(e.target.value)
                        }}>{Array.from(Array(6),(e,i)=>{
                            return (
                                <option key={i+1} value ={i+1}  >{i+1}</option>
                            )
                        })}</select>
                        <select className="m-2 h-100  bg-success rounded" ref={priceref} onChange={(e)=>{
                            setsize(e.target.value)
                        }}>
                            {priceoption.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            ₹{finalprice}
                        </div>
                        <hr/>
                        <button className="btn btn-success justify-content-center ms-2" onClick={handlecart}>Add to cart</button>
                       </div>
                    </div>
                </div>
            </div>
)
}
export default Card;