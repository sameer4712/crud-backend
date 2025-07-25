import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
import { adminLogin, adminLogout } from '../Controller/admin.js'
import { addProduct } from '../Controller/productController.js'
import { category } from '../Controller/categoryController.js'

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

router.post('/login', adminLogin)

router.use((req, res, next) => {
    if (req.session.admin) {
        next()
    }
    else {
        res.json({ message: "You are not Logged in" })
    }

})
router.post('/AddCategory',category)
router.post('/AddProduct',pro.single('image'),addProduct)
router.get('/Logout', adminLogout)






export default router