import React from 'react'
import { Image } from 'lucide-react';
import { useState } from 'react'
import Postcard from '../components/Postcard';

const Home = () => {


  const [forminput, setforminput] = useState('')
  const handlefomsubmit = (e) => {
    e.preventDefault();
    setforminput('')
  }
  return (
    <div>
      <div className='sm:px-20 px-5 flex flex-col sm:flex-row justify-around pt-20 sm:pt-0 sm:mt-30 mt-5 items-start w-full'>
        <div className='flex gap-2 items-center'>
          <img className='w-10 aspect-square object-cover rounded-full' src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="" />
          <div className='flex flex-col h-fit text-sm'>
            <h1 className='text-xl font-semibold'>Aryan kashyap</h1>
            <p><span className='font-semibold'>@</span>aryankp_17</p>
            <p>Frontend Developer</p>
            <div className='flex gap-3 mt-1 text-sm text-gray-600'>
              <p className='py-1 px-3 bg-slate-200 rounded-2xl font-medium'>Total Posts:6</p>
              <p className='py-1 px-3 bg-slate-200 rounded-2xl font-medium'>Total Likes:50</p>
            </div>
          </div>
        </div>

        <div className='w-full sm:w-[30vw] mt-10 sm:mt-0'>
          <form onSubmit={(e) => handlefomsubmit(e)} className=' relative'>
            <textarea value={forminput} onChange={(e) => setforminput(e.target.value)} placeholder='Start a post...' className='w-full placeholder:text-sm text-sm font-medium relative outline-0 sm:h-30 h-50 min-h-20 max-h-30 p-2 bg-slate-200 rounded-xl'></textarea>
            <button className=' absolute bottom-2 active:scale-95 active:bg-blue-700 cursor-pointer left-1 bg-blue-500 text-white py-1 px-3 rounded-full font-semibold'>Share</button>
            <label className=' absolute p-2 bg-gray-300 hover:scale-105 rounded-full bottom-2 right-2 cursor-pointer'>
              <Image size={20} className=' active:scale-95' />
              <input type="file" className='hidden' />
            </label>

          </form>

        </div>

      </div>
      {/* recent posts */}
      <div className='flex flex-col mt-5'>
         <div className='flex justify-center border-b border-gray-300 pb-3'>
          <h1 className='text-4xl font-[Arial]'>Recent Posts </h1>
         </div>
         <div className='sm:px-20 px-3 py-5 justify-items-center grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-y-5 lg:grid-cols-3 '>
          <Postcard />
         </div>

      </div>
    </div>
  )
}

export default Home