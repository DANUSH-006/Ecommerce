const express = require('express');
const mongoose = require('mongoose'); 
const app = express();  
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/homework")
.then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log('Database not connected');
});

const productschema = new mongoose.Schema({

    customername:{
        type:String,
    },
    productname:{
        type:String,
    },
    quantity :{
        type:Number,
    },
    price:{
        type:Number,
    },
    status:{
        type:String,
    }
});

const product =  mongoose.model('productdetails',productschema);

app.post('/add',async(req,res)=>{
    try{
    const data = req.body;
    const {customername,productname,quantity,price,status} = data;    
    const newProduct = new product({
        customername:customername,
        productname:productname,
        quantity:quantity,
        price:price,
        status:status
    });
    await newProduct.save();
    res.send("product added successfully");
}catch(err){
     console.log("ERROR:", err);
    res.status(500).send(err);
}
});

app.get('/get',async(req,res)=>{
    try{
        const products = await product.find();  
        res.send(products);
    }catch(err){
         console.log("ERROR:", err);
        res.status(500).send(err);
    }
});

app.listen(1212,()=>{
 console.log ('Server is running on port 1212');
})