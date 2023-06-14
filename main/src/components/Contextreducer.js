import React, { createContext, useContext, useReducer } from "react";
const cartState =createContext();
const cartdispatch=createContext();
const reducer=(state,action)=>{
switch(action.type){
    case "ADD":
        return [...state,{id:action.id,name:action.name,qty:action.qty,size:action.size,price:action.price}]
    case "REMOVE":
        let newarr=[...state]
        newarr.splice(action.index,1)
        return newarr;

        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr
            case "DROP":
                let emptyarr=[]
                return emptyarr
    default :
    console.log("Invalid")
}
}

export const Cartprovider=({children})=>{
    const[state,dispatch]=useReducer(reducer,[]);
    return (
        <cartdispatch.Provider value={dispatch}>
            <cartState.Provider value={state}>
                {children}
            </cartState.Provider>
        </cartdispatch.Provider>
    )

}
export const useCart=()=>
    useContext(cartState);

export const useDispatchcart=()=>
    useContext(cartdispatch);

