const express =require("express");
const router=express.Router();
const Order=require("../models/Orders.js")
router.post('/myOrderData', async (req, res) => {
    try {
        let mydata=await Order.findOne({'email':req.body.email})
        res.json({orderData:mydata})
    } catch (error) {
        res.status(400).send("Server Error", error.message)
    }
})
module.exports=router;