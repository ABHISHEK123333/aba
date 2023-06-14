const express =require("express");

const nodemailer=require('nodemailer');
require('dotenv').config();
 const router=express.Router();
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
 const user=require("../models/user.js");
 const secretcode=process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"arunraj6394@gmail.com",
        pass:"thsw cgju mynj xtuz"
    }
}) 
router.post("/sendpasswordlink",async(req,res)=>{
 

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await user.findOne({email:email});
        console.log("userfind",userfind);
        const token = jwt.sign({_id:userfind._id},secretcode,{
            expiresIn:"120s"
        });
        
        const setusertoken = await user.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
        console.log("setusertoken",setusertoken);
        if(setusertoken){
            
            const mailOptions = {
                from:"arunraj6394@gmail.com",
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Succsfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }

});
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await user.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,secretcode);

        console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// change password

router.post("/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await user.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,secretcode);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,10);

            const setnewuserpass = await user.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})
router.post('/createuser',async(req,res)=>{
    const salt=await bcrypt.genSalt(10);
    let secpassword=await bcrypt.hash(req.body.password,salt);
try {
   await user.create({
        name:req.body.name,
        email:req.body.email,
        password:secpassword,

    }).then(res.json({success:true}));

} catch (error) {
    console.log(error);
}
 })
 router.post("/loginuser",async(req,res)=>{
    let email=req.body.email;
    try {
     let useremail=  await user.findOne({email});
     if(!useremail){
        return res.status(400).json({errors:"Try Login With Credentials"})
     }
     const compare=await bcrypt.compare(req.body.password,useremail.password)
     if(!compare){
        return res.status(400).json({errors:"Try Login With Credentials"})
     }
     const data={
        user:{
            id:useremail.id
        }
     }


     const token=jwt.sign(data,secretcode);
     return res.json({success:true,token:token})
    
    } catch (error) {
        
        res.status(400).json({errors:"last"})
    }
}
 )
 module.exports=router;