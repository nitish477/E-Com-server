import { Schema,model } from "mongoose"

const productSchema=new Schema({
    name:String,
    price:String,
    description:String,
    imgurl:String,
    brand:String
})

const Product=model('Product',productSchema)

export default Product;