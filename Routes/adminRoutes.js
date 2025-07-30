import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
import { adminLogin, adminLogout } from '../Controller/admin.js'
import { addProduct, deleteProduct, EditProduct } from '../Controller/productController.js'
import { category, deleteCategory, editCategory, showCategory, oneCategory } from '../Controller/categoryController.js'
import { editStatus, deleteOrder } from '../Controller/OrderController.js'
import admin from '../middleware/AdminSession.js'

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

router.use(admin)

// CATEGORY
router.get('/category', showCategory)
router.get('/category/:id', oneCategory)
router.post('/AddCategory', category)
router.delete('/deleteCategory/:id', deleteCategory)
router.put('/editCategory/:id', editCategory)



// PRODUCT
router.post('/AddProduct', pro.single('image'), addProduct)
router.put('/updateProduct/:id', pro.single('image'), EditProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/Logout', adminLogout)


// Order Status
router.put('/editStatus/:id', editStatus)
router.delete('/deleteOrder/:id', deleteOrder)






export default router