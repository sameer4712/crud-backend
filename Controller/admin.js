
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


export const adminLogin = async (req, res) => {
    const { email, password } = req.body
    const data = "mongodb://localhost:27017/MiniEcommerce"
    const datas = await mongoose.connect(data)
    const db = datas.connection.db;
    let adminFound = await db.collection("admin").findOne({ email: email })
    console.log(adminFound);

    if (!adminFound) {
        res.json({ message: "Email is not matched" })
    }
    const hashed = await bcrypt.compare(password, adminFound.password)
    if (!hashed) {
        res.json({ message: "password not matched" })
    }
    if (hashed) {
        req.session.admin = adminFound;
        res.json({ message: "you loggedIn as admin",adminFound })
    }
}


export const adminLogout = (req,res)=>{
  req.session.admin=null
  if(req.session.admin==null)
  {
    res.json("Logout as admin")
  }
  res.json("Failed to logout")
}