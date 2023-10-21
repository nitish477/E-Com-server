import express from 'express'
import mongoose from 'mongoose'
import Dotenv from 'dotenv'
Dotenv.config()

import Product from './src/models/Product.js'

const app = express()
app.use(express.json())

const PORT = 5000



const responce = async () => {
    const data = mongoose.connect(process.env.MONGO_DATA)
    if (data) {
        console.log('connected to database')
    }
    else {
        console.log("not connected")
    }
}
responce()



app.post('/product', async (req, res) => {
    const { name, description, price, imgurl, brand } = req.body
    if (!name) {
        return res.json({
            success: false,
            message: 'please provide a valid name'
        })

    }
    if (!description) {
        return res.json({
            success: false,
            message: "please provide a valid description"
        })
    }
    if (!price) {
        return res.json({
            success: false,
            message: "please provide a valid price"
        })
    }


    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        imgurl: imgurl,
        brand: brand
    })

    const saveData = await newProduct.save()

    res.json({
        success: true,
        message: "successfully added",
        data: saveData
    })
})

app.get('/products', async (req, res) => {

    const list = await Product.find()

    res.json({
        status: 'ok',
        data: list,
        massage: 'Student featch successfully'
    })



})


app.get('/product', async (req, res) => {
    const { name } = req.query
    const list = await Product.findOne({ name: name })
    if (list === null) {
        return res.status(404).send('data not found')
    }

    res.json({
        status: 'ok',
        data: list,
        massage: 'Product featch successfully'
    })

})

app.delete('/product/:id', async (req, res) => {
    const { id } = req.params
    await Product.deleteOne({ _id: id });

    res.json({
        status: 'ok',
        massage: `Delete Successfully id ${id}`
    })
})

app.put('/product/:id', async (req, res) => {
    const { id } = req.params
    const { name, description, price, imgurl, brand } = req.body
    if (!name) {
        return res.json({
            success: false,
            message: 'please provide a valid name'
        })

    }
    if (!description) {
        return res.json({
            success: false,
            message: "please provide a valid description"
        })
    }
    if (!price) {
        return res.json({
            success: false,
            message: "please provide a valid price"
        })
    }

    await Product.updateOne({ _id: id }, {
        $set: {
            name,
            description,
            price,
            imgurl,
            brand
        }
    })

    const updatedData = await Product.findOne({ _id: id })

    res.json({
        status: 'ok',
        list: updatedData,
        message: 'Update SuccessFully'
    })

})

app.patch('/product/:id', async (req, res) => {
    const { id } = req.params
    const { name, description, price, imgurl, brand } = req.body
    const products = await Product.findOne({ _id: id })

    if (name) {
        products.name = name;
    }
    if (description) {
        products.description = description;
    }
    if (price) {
        products.price = price;
    }
    if (imgurl) {
        products.imgurl = imgurl;
    }
    if (brand) {
        products.brand = brand;
    }

    const updatedProduct = await products.save()

    res.json({
        success: true,
        list: updatedProduct,
        message: "Updated Successfully"
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})