import express from 'express'
import mongoose from 'mongoose'
import Dotenv from 'dotenv'
Dotenv.config()

import Product from './src/models/Product.js'

const app=express()
app.use(express.json())

const PORT=5000



const responce= async ()=>{
    const data=mongoose.connect(process.env.MONGO_DATA)
    if(data){
        console.log('connected to database')
    }
    else{
        console.log("not connected")
    }
}
responce()



app.post('/product', async (req,res)=>{
     const {name,description,price,imgurl,brand}=req.body
     if(!name){
        return res.json({
            success:false,
            message:'please provide a valid name'
        })

     }
     if(!description){
        return  res.json({
            success:false,
            message:"please provide a valid description"
        })
     }
     if(!price){
          return res.json({
            success:false,
            message:"please provide a valid price"
          })
     }
    

     const newProduct = new Product({
        name:name,
        description:description,
        price:price,
        imgurl:imgurl,
        brand:brand
     })

     const saveData= await newProduct.save()

     res.json({
        success:true,
        message:"successfully added",
        data:saveData
     })
})

app.get('/products',async (req,res)=>{

    const list= await Product.find()
    
    res.json({
        status:'ok',
        data:list,
        massage:'Student featch successfully'
    })



})


app.get('/product',async (req,res)=>{
    const {name}=req.query
   const list =await Product.findOne({name:name})
   if(list===null){
    return res.status(404).send('data not found')
   }

   res.json({
    status:'ok',
    data:list,
    massage:'Product featch successfully'
   })

})



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})