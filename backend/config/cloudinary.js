import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    try {
        if (!filepath) {
            return null
        }
        const uploadResult = await cloudinary.uploader.upload(filepath)
        // remove temp file if it exists
        try {
            if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath)
        } catch (unlinkErr) {
            console.error('Failed to remove temp file:', unlinkErr)
        }
        return uploadResult.secure_url

    } catch (error) {
        // attempt to remove temp file if present, but guard against errors
        try {
            if (filepath && fs.existsSync(filepath)) fs.unlinkSync(filepath)
        } catch (unlinkErr) {
            console.error('Failed to remove temp file after upload error:', unlinkErr)
        }
        console.error('Cloudinary upload error:', error)
        return null
    }
}

export default uploadOnCloudinary
    
