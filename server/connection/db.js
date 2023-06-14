const mongoose =require("mongoose");
const DB=process.env.DATA_BASE;
mongoose.connect(DB,{useNewUrlParser:true}).then(async()=>{
    console.log("succesfull");
}).catch((err)=>{
    console.log("error");
});