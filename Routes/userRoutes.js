import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router();

import { register, Login, Logout, EditUser } from '../Controller/userContoller.js'
import { oneCategory,showCategory} from '../Controller/categoryController.js';
import { showProduct } from '../Controller/productController.js';


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
router.get('/category',showCategory)
router.get('/category/:id',oneCategory)
router.get('/products',showProduct)

router.use((req, res, next) => {
    if (req.session.user) {
        next()
    }
    else {
        res.json({ message: "You are not Logged in" })
    }
})

router.put('/Edit/:id', upload.single('image'), EditUser)
router.get('/Logout', Logout)



export default router