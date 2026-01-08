import asyncHandler from "express-async-handler";
import Product from "../Models/Product.js";
import Seller from "../Models/Seller.js"
import crypto from "crypto";
import mongoose from "mongoose";

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
    subcategory,
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
//get product
export const getProducts = asyncHandler(async(req,res)=>{
      let {page,limit,admin,sellerId} = req.query;
      //deafults+sanitzation
      page= Math.max(parseInt(page) || 1,1);
      limit =Math.min(parseInt(limit) || 20,20);

      const skip = (page -1)*limit; //pagination maths if in page 2 then skip 20

      let filter={};

      //Admin view which is highest priority
      if(admin === "true") {
        filter={};
      }
        //Seller dashboard view
      else if(sellerId) {

        if(!mongoose.Types.ObjectId.isValid(sellerId)){
          res.status(400);
          throw new Error("Invalid sellerId");
        }

          //validate seller exists
        const seller = await Seller.findById(sellerId);
        if(!seller){
          res.status(404);
          throw new Error("Seller not found");
        }
        // (block cross seller access (as for now))
        //later this will be replaced by JWT auth
        filter.sellerId = sellerId;
      }

      //buyer view (by default)
      else{
        filter["approval.status"]="approved";
      }

      const products= await Product.find(filter)
      .sort({ createdAt: -1})
      .skip(skip)
      .limit(limit)
      .populate("sellerId","shopName");

      const total= await Product.countDocuments(filter); //all ,matching products

      const totalPages = Math.ceil(total/limit)

      res.status(200).json({
        products,
        page,
        limit,
        total,
        totalPages,
      });
})

export const getProductById= asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const{sellerId, admin}= req.query;

  //first Validate productId
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400);
    throw new Error("Invalid product id");
  } 
  
  //second is Fetch product
  const product= await Product.findById(id).populate("sellerId","shopName");
  if(!product){
    res.status(404);
    throw new Error("Product not found")
  }

  //third Admin can see everything
  if(admin=== "true"){
    return res.status(200).json({product});
  }

  //fourth is that seller can see own product and status
  if(sellerId){
    if(!mongoose.Types.ObjectId.isValid(sellerId)){
      res.status(400);
      throw new Error("Invalid sellerId")
    }
    if (product.sellerId._id.toString()===sellerId){
      return res.status(200).json({product})
    }
    res.status(403);
    throw new Error("You are not allowed to see this product");
  }

  //fifth is that buyer can see only approved product
  if(product.approval.status !== "approved"){
    res.status(403);
    throw new Error("You are not allowed to view this product");

  }
  res.status(200).json({product});
})

{/*Admin : approve product */}
export const approveProduct =  asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const product = await Product.findById(id);

    if(!product) {
        res.status(404);
        throw new Error(" Product not found");
    }
   if(product.approval.status!== "pending"){
    res.status(409);
    throw new Error("Product cannot be approved")
   }
   product.approval.status= "approved";
   product.approval.approvedAt= new Date();
   product.approval.rejectedAt= null;
   product.approval.rejectionReason= null;

    //Snapshot for security purpose
   product.approval.lastActionBy ={
    adminId: req.user?.id || null,
    adminName: req.user?.name || "Admin"
   };

   await product.save();

    res.status(200).json({
        message : " Product approved successfully",
    });
});
{/*Admin : reject product */}
export const rejectProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.approval.status !== "pending") {
    res.status(409);
    throw new Error("Product cannot be rejected");
  }

  if (!reason) {
    res.status(400);
    throw new Error("Rejection reason is required");
  }

  product.approval.status = "rejected";
  product.approval.rejectedAt = new Date();
  product.approval.rejectionReason = reason;

  //snapshot 
  product.approval.lastActionBy = {
    adminId: req.user?.id || null,
    adminName: req.user?.name || "Admin",
  };

  await product.save();

  res.status(200).json({
    message: "Product rejected successfully",
    productId: product._id,
  });
});
