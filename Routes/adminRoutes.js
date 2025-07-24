import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

import { addProduct } from '../Controller/productController.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'productImage')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
})
const pro = multer({ storage: storage });


router.post('/addProduct',pro.single('image'),addProduct)




export default router