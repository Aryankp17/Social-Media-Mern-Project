import mongoose from 'mongoose'
import PostModel from '../models/postmodel.js'
import UserModel from '../models/Usermodel.js'

export const getallpost = async (req, res) => {
  try {
    const Posts = await PostModel.find()
    return res.status(200).json({
      success: true,
      message: 'All Posts fetched Successfully',
      data: {
        posts: Posts.map(post => {
          return {
            _id: post._id,
            desc: post.desc,
            image: post.image ? `data:image/png;base64,${post.image.toString('base64')}` : null,
            user: post.user,
            likes:post.likes.length,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt
          }
        })
      }
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching all posts',
      error: error.message
    })

  }

}

export const createpost = async (req, res) => {
  try {
    let { desc } = req.body
    const postdata = {
      desc,
      user: req.user.userid
    }
    if (req.file) {
      postdata.image = req.file.buffer
    }
    const post = await PostModel.create(postdata)
    const user = await UserModel.findOne({ _id: req.user.userid })
    const alreadyExists = user.post.some(
      (id) => id.toString() === post._id.toString()
    );
    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: 'Post already exists'
      })
    }
    user.post.push(post._id)
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Post Created Successfully',
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in creating post',
      error: error.message
    })

  }

}

export const getpost = async (req, res) => {
  try {
    let postid = req.params.id
    const post = await PostModel.findById({ _id: postid })
    if (!post) {
      return res.status(400).json({
        success: false,
        message: 'Post not found',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Post fetched Successfully',
      data: {
        _id:post._id,
        desc:post.desc,
        image: post.image ? `data:image/png;base64,${post.image.toString('base64')}`: null,
        user:post.user,
      }
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in fetching post',
      error: error.message
    })

  }
}

export const updatepost = async (req, res) => {
  try {
    let { desc } = req.body
    const postdata = {
      desc: desc
    }
    if (req.file) {
      postdata.image = req.file.buffer
    }
    console.log(postdata);

    const post = await PostModel.findOneAndUpdate({ _id: req.params.id }, postdata, { new: true })
    if (!post) {
      return res.status(400).json({
        success: false,
        message: 'Post not found'
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Post Updated Successfully',
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in updating post',
      error: error.message
    })
  }
}

export const deletepost = async (req, res) => {
  try {
    const post = await PostModel.findById({ _id: req.params.id })
    if (!post) {
      return res.status(400).json({
        success: false,
        message: 'Post not found'
      })
    }
    const deletedpost = await PostModel.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({
      success: true,
      message: 'Post Deleted Successfully',
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in deleting post',
      error: error.message
    })

  }
}

export const likepost = async (req,res)=>{
  try {
    const post = await PostModel.findById({_id:req.params.id})
    if(!post){
      return res.status(404).json({
        success:false,
        message:"Post not Found"
      })
    }
    const user = req.user.userid
    const likeindex = post.likes.indexOf(user)
    if(likeindex === -1){
      post.likes.push(user)
      await post.save()
      return res.status(200).json({  
        success:true,
        message:'Post Liked',
        data:post.likes.length,
        isLiked:true
      })
    }else{
      post.likes.splice(likeindex,1)
      await post.save()
      return res.status(200).json({
        success:true,
        message:'Post Unliked',
        data:post.likes.length,
        isLiked:false
      })
    }
    
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:'Error in liking post'
    })
  }
}