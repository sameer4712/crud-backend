import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router();

import { register,Login,Logout,EditUser } from '../Controller/userContoller.js'


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



router.post('/Login',Login)
router.post('/register', upload.single('image'), register)

router.put('/Edit/:id',upload.single('image'),EditUser)
router.get('/Logout',Logout)

export default router