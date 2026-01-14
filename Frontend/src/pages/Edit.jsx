import React, { useEffect, useState } from 'react'
import { Paperclip } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { getproducts } from '../redux/ProductSlice';


const Edit = () => {
  const [Formcaption, setFormcaption] = useState('')
  const [image, setimage] = useState('')
  const navigate = useNavigate()
  const postid = useParams().postId
 
  const fetchpost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/getpost/${postid}`, { withCredentials: true })
      setFormcaption(res.data.data.desc)
      setimage(res.data.data.image)

    } catch (error) {
      console.log(error);


    }
  }
  useEffect(() => {
    fetchpost()   
  }, [postid])

  const editformsubmit = async (e) => {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append('desc',Formcaption);
    formdata.append('image',image)
    await axios.put(`http://localhost:3000/updatepost/${postid}`,formdata,{withCredentials:true})
    .then((res)=>{
      toast.success(res.data.message)
      navigate('/')
      setFormcaption('')
      setimage('')

    }).catch((err)=>{
      toast.error(err.response?.data?.message || 'Error in updating post')
    })
  }
  const deletepost = async ()=>{
    await axios.delete(`http://localhost:3000/deletepost/${postid}`,{withCredentials:true})
    .then((res)=>{
      toast.success(res.data.message)
      navigate('/')
    }).catch((err)=>{
      toast.error(err.response?.data?.message || 'Error in deleting post')
    })
  }

  return (
    <div className='flex flex-col justify-center items-center mt-30 sm:mt-15 pt-20'>
      <button onClick={() => navigate(-1)} className='self-start mb-4 flex gap-1 active:scale-95 hover:bg-green-600 cursor-pointer items-center border-0 outline-0 py-2 px-3 bg-green-500 rounded-xl text-white mr-3'>
        <ArrowBigLeft />
        <p>Back</p>
      </button>
      <div className='sm:w-1/2 w-full rounded-3xl relative flex flex-col gap-3 p-3 h-100 bg-gray-50'>
        <div className='w-full flex justify-between gap-3 h-1/4 px-1 items-center'>
          <div className='flex gap-3 items-center'>
            <img className='w-8 aspect-square object-cover rounded-full' src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="" />
            <div className='text-sm text-gray-500'>
              <p className='text-black font-semibold leading-4'>Aryan Kashyap</p>
              <p><span className='font-semibold'>@</span>aryankp_17</p>
            </div>
          </div>
          <div>
            <button onClick={()=>deletepost()} className='py-2 px-5 bg-red-700 text-white active:scale-95 hover:scale-105 cursor-pointer rounded-3xl font-medium'>Delete</button>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <img className='w-full h-40 cursor-pointer object-cover' src={image} alt="" />

        </div>
        <div className='flex flex-col gap-2'>
          <div>
            <form onSubmit={(e) => editformsubmit(e)}>
              <textarea autoFocus value={Formcaption} onChange={(e) => setFormcaption(e.target.value)} placeholder='Edit your caption...' className='w-full placeholder:text-sm text-sm font-medium outline-0 h-25 min-h-10 max-h-30 p-2 bg-gray-200 rounded-xl'></textarea>
              <div className='flex text-sm text-gray-500 p-1 items-center justify-end gap-1'>
                <label title="Edit Image" className='cursor-pointer active:scale-95 flex gap-1 items-center'>
                  <Paperclip />
                  <input type="file" accept='image/*' className='hidden' onChange={(e) => setimage(e.target.files[0])}  />
                </label>
                <button className='py-2 px-5 bg-yellow-400 text-black active:scale-95 hover:scale-105 cursor-pointer rounded-3xl font-medium'>Update</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Edit