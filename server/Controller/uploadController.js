import asyncHandler from "express-async-handler";
import cloudinary from "../Config/Cloudinary.js";
import streamifier from "streamifier";

export const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error("No image uploaded");
    }

    const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "gearbazar-products",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

    const result = await uploadFromBuffer();

    res.status(200).json({
        message: "Image uploaded successfully",
        url: result.secure_url,
    });
});