import UserModel from "../models/Usermodel.js";
import bcrypt from 'bcrypt'


export const getuser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user.userid })
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "User profile fetched successfully",
            success: true,
            data:{
                _id:user._id,
                name:user.name,
                email:user.email,
                username:user.username,
                title:user.title,
                profilepic: user.profilepic ? `data:image/png;base64,${user.profilepic.toString('base64')}`: null
            }
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error in fetching user profile",
            error: error.message
        })

    }

}

export const updateuser = async (req, res) => {
    try {
        let { name, email, username, title } = req.body
        const userdata = {
            name,
            email,
            username,
            title:title.length>0 ? title : ""
        }
        
        if(typeof(req.body.password) === "string" && req.body.password.length > 0){
            userdata.password = await bcrypt.hash(req.body.password, 10)
        }
        if (req.file) {
            userdata.profilepic = req.file.buffer
        }
        const updateduser = await UserModel.findByIdAndUpdate({ _id: req.user.userid }, userdata, { new: true })
        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data:{
                _id:updateduser._id,
                name:updateduser.name,
                email:updateduser.email,
                username:updateduser.username,
                title:updateduser.title,
                profilepic: updateduser.profilepic ? `data:image/png;base64,${updateduser.profilepic.toString('base64')}`: null
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in updating user profile",
            error: error.message
        })

    }

}