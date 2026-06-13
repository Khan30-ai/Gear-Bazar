import express from "express";
import upload from "../Middleware/upload.js";
import { uploadImage } from "../Controller/uploadController.js";

const router = express.Router();

router.post("/", upload.single("image"), uploadImage);

export default router;