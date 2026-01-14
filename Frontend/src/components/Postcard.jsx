import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { EllipsisVertical } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getproducts } from '../redux/ProductSlice';
import { useDispatch } from 'react-redux';


const Postcard = ({ post, idx,user }) => {
    
    const [postedit, setpostedit] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [Likecount, setLikecount] = useState(post.likes)
    const [isLiked, setisLiked] = useState(false)
    const deletepost = async () => {
        await axios.delete(`http://localhost:3000/deletepost/${post._id}`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message)
                dispatch(getproducts());
                navigate('/')
            }).catch((err) => {
                toast.error(err.response?.data?.message || 'Error in deleting post')
            })
    }

    const handlelike = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/like/${post._id}`, { withCredentials: true })
            setisLiked(res.data.isLiked)
            setLikecount(res.data.data)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error in liking post')
        }

    }
    useEffect(()=>{
        handlelike()
    },[])
    return (
        <>
            <div key={idx} className='sm:w-80 w-full gap-y-5 rounded-3xl relative flex flex-col gap-2 p-3 sm:min-h-60 bg-slate-100'>
                <div className='w-full flex justify-between gap-3 h-1/4 px-1 items-center'>
                    <div className='flex gap-3 items-center'>
                        <img className='w-8 h-8 object-cover rounded-full' src={user.profilepic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"} alt="" />
                        <div className='text-sm text-gray-500'>
                            <p className='text-black font-semibold leading-4'>{user.name}</p>
                            <p><span className='font-semibold'>@</span>{user.username}</p>
                        </div>
                    </div>
                    {/* i have to change this part */}
                    
                    {post.user === user.id && (
                        <div>
                        <EllipsisVertical onClick={() => setpostedit(!postedit)} className=' cursor-pointer ' size={18} />
                        <div className={`py-3 text-sm flex flex-col font-[Arial] gap-1 text-center  absolute bg-white rounded-lg top-10 right-2 w-32 ${postedit ? '' : 'hidden'}`}>
                            <p onClick={() => navigate(`/edit/${post._id}`)} className='w-full hover:bg-slate-300 py-1 cursor-pointer'>EDIT</p>
                            <p onClick={() => deletepost()} className='w-full hover:bg-slate-300 py-1 cursor-pointer'>DELETE</p>
                        </div>
                    </div>)}
                </div>
                <div>
                    <img className='w-full h-30 rounded-xl transition-all cursor-pointer object-top-center object-contain' src={post.image} alt="" />
                    <p className='text-sm font-medium mt-2'>{post.desc}</p>
                </div>
                <div>
                    <div className='flex text-sm text-gray-500 p-1 items-center gap-1'>
                        <ThumbsUp color='black' onClick={() => handlelike()} className={`cursor-pointer hover:scale-110 active:scale-95 hover:text-black  transition-colors ${isLiked ? 'fill-black' : ''}`} />
                        <p className='font-medium'>{Likecount}</p>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Postcard