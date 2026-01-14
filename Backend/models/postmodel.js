import { Types } from "mongoose";
import mongoose from "../config/mongodb-connection.js";

const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    image:{
        type:Buffer
    },
    desc:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ]
})
const PostModel = mongoose.model('posts',postSchema)
export default PostModel;