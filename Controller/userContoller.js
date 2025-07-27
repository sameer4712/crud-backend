
import userDetails from "../models/userModel.js";
import bcrypt from 'bcrypt';

// Registering A User 

export const register = async (req, res) => {
    let p = ""
    if (req.file) {
        p = req.file.filename
    }
    const { name, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10)
    const user = new userDetails({
        name: name,
        email: email,
        password: hashedPass,
        image: p
        
    })
    await user.save()
    res.json({ message: "User registered successfully" })
}

// Login a user

export const Login = async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await userDetails.findOne({ email: email })
        if (!check) {
            res.json({ message: "user not found" })
        }
        const hashedPass = await bcrypt.compare(password, check.password)
        if (!hashedPass) {
            res.json({ messge: "email and password is not matching" })
        }
        else {
            req.session.user = {
                id: check._id,
                name: check.name,
                email: check.email,
            }
            res.json({ message: "User Found" })
        }

    }
    catch (err) {
        console.log(err)
    }
}
// Edit user
export const EditUser = async (req, res) => {
    try {
        console.log(req.body);
        
        const userId = req.params.id
        const oldUser = await userDetails.findById(userId)
        if (!oldUser) {
            return res.json({ message: "Your are  not logged in" })
        }
        const UpdateData = {
            name: oldUser.name,
            email: oldUser.email,
            password: oldUser.password,
            image: oldUser.image
        }
        if (req.body.name) {
            UpdateData.name = req.body.name
        }
        if (req.body.email) {
            UpdateData.email = req.body.email
        }
        if (req.body.password) {
            UpdateData.password = req.body.pasword
        }
        if (req.file) {
            UpdateData.image = req.file.filename
        }

        const userUpdate = await userDetails.findByIdAndUpdate(userId, UpdateData)
        res.json({message:"Updated successfully",userId:userUpdate})

    }
    catch (err) {
        res.json(err)
    }
}

// Logout 
export const Logout = (req, res) => {
    req.session.user=null;
    if(req.session.user==null)
    {
        res.json("Logout as user")
    }
    res.json("Failed")
} 