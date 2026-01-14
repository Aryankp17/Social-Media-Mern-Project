import UserModel from '../models/Usermodel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const registeruser = async (req, res) => {
    try {
        let { name, password, email, username } = req.body
        if (!name || !password || !email || !username) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User Already Exists",
                success: false
            })
        }
        const passwordhash = await bcrypt.hash(password, 10)
        const newuser = await UserModel.create({
            name, password: passwordhash, email, username
        })
        const token = jwt.sign({ userid: newuser._id, email: newuser.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.cookie('token', token, {
            httpOnly: true,
        })
        return res.status(201).json({
            message: "User Registered Successfully",
            success: true,
            token,
            data:{
                id:newuser._id,
                name:newuser.name,
                email:newuser.email,
                username:newuser.username
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: ' Internal Server Error',
            error: error.message
        })
    }
}

export const loginuser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false, 
                message: "All fields are required"
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {

            return res.status(400).json({
                success: false,
                message: "User not Exists"
            })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Credentials"
                })
            }
            if (result) {
                const token = jwt.sign({ userid: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
                res.cookie('token', token, {
                    httpOnly: true,
                })
                return res.status(200).json({
                    success: true,
                    message: "Login Successful",
                    token,
                    data:{
                        id:user._id,
                        name:user.name,
                        email:user.email,
                        username:user.username,
                        profilepic:user.profilepic ? `data:image/png;base64,${user.profilepic.toString('base64')}` : null,
                        title:user.title || ""
                    }
                })
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }

}
