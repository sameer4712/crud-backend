
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import productDetails from '../models/productModel.js'
import OrderDetails from '../models/OrderModel.js'
import userDetails from '../models/userModel.js'
import CategoryDetails from '../models/categoryModel.js'

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const data = "mongodb://localhost:27017/MiniEcommerce"
    const datas = await mongoose.connect(data)
    const db = datas.connection.db;
    let adminFound = await db.collection("admin").findOne({ email: email })
    // console.log(adminFound);

    if (!adminFound) {
      return res.json({ message: "Email is not matched", success: false })
    }
    const hashed = await bcrypt.compare(password, adminFound.password)
    if (!hashed) {
      return res.json({ message: "Password not matched", success: false })
    }
    if (hashed) {
      req.session.admin = adminFound;
      return res.json({ message: "You loggedIn as admin", adminFound, success: true })
    }
  }
  catch (error) {
    console.log(error);

  }

}

export const DashBoardCount = async (req, res) => {
  try {
    const [products, orders, users, categories] = await Promise.all([
      productDetails.countDocuments(),
      OrderDetails.countDocuments(),
      userDetails.countDocuments(),
      CategoryDetails.countDocuments()
    ])
    return res.json({ products, orders, users, categories })
  }
  catch (err) {
    return res.json({ message: err })
  }
}


export const adminLogout = (req, res) => {
  req.session.admin = null
  if (req.session.admin == null) {
    res.json("Logout as admin")
  }
  else {

    res.json("Failed to logout")
  }
}