import asyncHandler from "express-async-handler";
import Product from "../Models/Product.js";
import Seller from "../Models/Seller.js"
import crypto from "crypto";

{/*Admin will create a new product  as of now */}
 export const createdProduct = asyncHandler (async (req,res)=>{
    const {
    sellerId,
    name,
    category,
    subcategory,
    partNumber,
    partNumberType,
    fitments,
    price,
    stock,
    oemPartNumber,
    aftermarketBrand,
    images,
  } = req.body;

 //now basic required fields check

 if(!sellerId || !name || !category || !subcategory|| !partNumber|| !partNumberType || price === undefined || stock === undefined){
    res.status(400);
    throw new Error("Missing required product fields");
 }
// Validate seller existence
const seller = await Seller.findById(sellerId);

if (!seller) {
    res.status(404);
        throw new Error("Seller is not approved to list products")
    
}
//seller approval check 
if(!seller.isApproved){
    res.status(403);
    throw new Error("Seller is not approved to list products");
}

//fitment validation
if(!Array.isArray(fitments) || fitments.length === 0){
    res.status(400);
    throw new Error("Atleast one vehicle fitment is required");
}
/*Generate idempotency key (sellerId+partNumber+partNumberType)
because client didint send us idempotency key
we have to make and then insert it into the product */

const idempotencyKey = crypto
.createHash("sha256")
.update(`${sellerId}-${partNumber}-${partNumberType}`)
.digest("hex");

//create product
const product= await Product.create({
    sellerId,
    name,
    category,
    partNumber,
    partNumberType,
    fitments,
    price,
    stock,
    oemPartNumber,
    aftermarketBrand,
    images,
    idempotencyKey,
});

//remove internal field before sending response because we dont want to show that key in frontend 
const responseProduct = product.toObject();  //it will make a plain JS and its a copy for response
delete responseProduct.idempotencyKey;

res.status(201).json ({
    message: "Product created successfully",
    product: responseProduct,
})
});
{/*Admin : approve product */}
export const approveProduct =  asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const product = await product.findById(id);

    if(!product) {
        res.status(404);
        throw new Error(" Product not found");
    }
    product.status = "approved";
    await product.save();

    res.status(200).json({
        message : " Product approved successfully",
    });
});
{/*Admin : reject product */}
export const rejectProduct = asyncHandler(async(req,res)=>{
    const {id}= req.params;

    const product = await Product.findById(id);
    
    if(!product){
        res.status(404);
        throw new Error("Product not found");
    }
    product.status = "rejected"
    await product.save();

    res.status(200).json({
        message : " Product rejected successfully",
    })
})
