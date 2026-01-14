import { mongo } from "mongoose";
import mongoose from "../config/mongodb-connection.js";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    username:{
        type:String,
        unique:true
    },
    title:{
        type:String
    },
    profilepic:{
        type:Buffer,
        default:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'
    },
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'posts'
        }
    ],
},{timestamps:true})
const UserModel = mongoose.model('users',userSchema)
export default UserModel;