const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://danushsuresh2005_db_user:2BUkwkmL5vIdcfPq@cluster0.fcejvhd.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log('Database not connected');
})

const productschema = new mongoose.Schema({

    name:{
        type:String,
    },
    price:{
        type:Number,
    },
    description :{
        type:String,
    },
    image:{
        type:String,
}
})

const Product =  mongoose.model('Product',productschema);

const product = [ {
    id: 1,
    name : 'Product 1',
    price : 100
},{
    id : 2,
    name :'Product 2',
    price : 200
},{
     id : 3,
    name :'Product 3',
    price :300
}]    

// app.get('/product',(req,res)=>{
//     res.send(product)
// })
app.get('/user',(req,res)=>{
    res.send('hello user')
})
// app.get('/name',(req,res)=>{
//     res.send('I AM  DANUSH')
// })
// app.get('/about',(req,res)=>{
//     res.send('NOTHING TO SAY')
// })

// app.post('/add',(req,res)=>{
//     const data = req.body;
//     const {id,name,price} = data;
//     const newProduct = {
//         id : id,
//         name : name,
//         price : price,
// }   
//     product.push(newProduct);
//     res.send(product);
// });

app.post('/addproduct',async(req,res)=>{
    try{
    const data = req.body;
    const {name,price,description,image} = data;    
    const newProduct = new Product({
        name:name,
        price:price,
        description:description,
        image:image
    });
    await newProduct.save();
    res.send("product added successfully");
}catch(err){
    res.status(500).send(err);
}
});

app.get('/getproduct',async(req,res)=>{
    try{
        const data = await Product.find();
        res.send(data);
    }catch(err){
        res.status(500).send(err);
    }
});

app.get('/getproduct/:id',async(req,res)=>{
    const id = req.params.id;
    const product = await Product.findById(id);
    res.send(product);
}); 



 app.listen(3000,()=>{
 console.log ('Server is running on port 3000');
})