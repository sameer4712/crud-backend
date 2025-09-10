import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()
import { adminLogin, adminLogout, DashBoardCount } from '../Controller/admin.js'
import { addProduct, deleteProduct, EditProduct,PageRouting, showProduct } from '../Controller/productController.js'
import { category, deleteCategory, editCategory, showCategory, oneCategory } from '../Controller/categoryController.js'
import { editStatus, deleteOrder, AdminShowOrder } from '../Controller/OrderController.js'
import admin from '../middleware/AdminSession.js'
import { Active, showuser } from '../Controller/userContoller.js'

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


router.post('/Login', adminLogin)

// MiddleWare
router.use(admin)

router.get('/users', showuser)

// CATEGORY
router.get('/category', showCategory)
router.get('/category/:id', oneCategory)
router.post('/AddCategory', category)
router.delete('/deleteCategory/:id', deleteCategory)
router.put('/editCategory/:id', editCategory)

// PRODUCT
router.post('/AddProduct', pro.single('image'), addProduct)
router.get('/product', showProduct)
router.put('/updateProduct/:id', pro.single('image'), EditProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.post('/Logout', adminLogout)

router.get('/products', PageRouting)

// Order Status
router.get('/Order', AdminShowOrder)
router.put('/editStatus/:id', editStatus)

router.put('/EditUser/:id', Active)

router.get('/count', DashBoardCount)










export default router