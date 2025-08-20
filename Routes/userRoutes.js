import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router();

import { register, Login, Logout, EditUser, deleteUser } from '../Controller/userContoller.js'
import { oneCategory, showCategory } from '../Controller/categoryController.js';
import { showProduct, OneProduct } from '../Controller/productController.js';
import { addToCart, showCart, EditCart, DeleteCart } from '../Controller/CartController.js';
import { createOrder, showOrder } from '../Controller/OrderController.js';
import user from '../middleware/UserSession.js';
import { checking } from '../middleware/middleware.js';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
})
const upload = multer({ storage: storage });



router.post('/Login', Login)
router.post('/register', upload.single('image'), register)
router.get('/category', showCategory)
router.get('/category/:id', oneCategory)
router.get('/products', showProduct)
router.get('/product/:id', OneProduct)

router.use(user)
// cart and order details 
router.post('/cart/:id', addToCart)
router.get('/cart', showCart)
router.put('/editCart/:id', EditCart)
router.delete('/deleteCart/:id', DeleteCart)

router.post('/CreateOrder', createOrder)
router.get('/Order', showOrder)



// User details 
router.put('/Edit/:id', upload.single('image'), EditUser)
router.delete('/deleteMe', deleteUser)
router.get('/Logout', Logout)



export default router