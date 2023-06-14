import React from "react";
import { useCart,useDispatchcart } from "../Contextreducer";
import { Icon } from 'react-icons-kit'
import {trashcan} from 'react-icons-kit/oct/trashcan'
export default function Cart(){
    let data=useCart();
    let dispatch=useDispatchcart();
    const handlecheckout=async()=>{
      let useremail=localStorage.getItem('userEmail');
      let response=await fetch("http://localhost:5000/api/orderData",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            order_data:data,
            email:useremail,
            order_date:new Date().toDateString()
           
        })
      
      }
      );
      const json=await response.json();
     
      if(json.success){
        dispatch({type:"DROP"})
      }
    }
    if(data.length===0){
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3 text-info"> The Cart Is Empty</div>
            </div>
        )
    }
    let totalprice=data.reduce((total,food)=>total+food.price,0);
    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className=" table table-hover">
                   <thead className="text-success fs-4">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Options</th>
                        <th scope="col">Amount</th>
                    </tr>
                   </thead>
                   <tbody>
                    {data.map((food,index)=>(
                      
                        <tr>
                            <th scope="row"  className="text-info">{index+1}</th>
                            
                            <td className="text-info">{food.name}</td>
                            <td className="text-info">{food.qty}</td>
                            <td className="text-info">{food.size}</td>
                            <td className="text-info">{food.price}</td>
                            <td><button type="button" className="btn p-0 text-danger" onClick={()=>{
                                dispatch({type:"REMOVE",index:index})
                            }}><Icon icon={trashcan}/></button></td>
                        </tr>
                    ))}
                   </tbody>
                </table>
               <div><h1 className="text-primary" >Total price: {totalprice}/-</h1></div>
                 <div>
                    <button className="btn bg-success mt-5" onClick={handlecheckout}>Check out</button>
                 </div>
            </div>
        </div>
    )
}