import React, { useState } from 'react'
import { EllipsisVertical } from 'lucide-react';
import { ThumbsUp } from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const Postcard = () => {
    const [postedit, setpostedit] = useState(false)
    const navigate = useNavigate();
    return (
        <>
            <div className='sm:w-80 w-full gap-y-5 rounded-3xl relative flex flex-col gap-2 p-3 sm:min-h-60 bg-slate-100'>
                <div className='w-full flex justify-between gap-3 h-1/4 px-1 items-center'>
                    <div className='flex gap-3 items-center'>
                        <img className='w-8 h-8 object-cover rounded-full' src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="" />
                        <div className='text-sm text-gray-500'>
                            <p className='text-black font-semibold leading-4'>Aryan Kashyap</p>
                            <p><span className='font-semibold'>@</span>aryankp_17</p>
                        </div>
                    </div>
                    {/* i have to change this part */}
                    <div>
                        <EllipsisVertical onClick={() => setpostedit(!postedit)} className=' cursor-pointer ' size={18} />
                        <div className={`py-3 text-sm flex flex-col font-[Arial] gap-1 text-center  absolute bg-white rounded-lg top-10 right-2 w-32 ${postedit ? '' : 'hidden'}`}>
                            <p onClick={()=> navigate('/edit/:1')} className='w-full hover:bg-slate-300 py-1 cursor-pointer'>EDIT</p>
                            <p  className='w-full hover:bg-slate-300 py-1 cursor-pointer'>DELETE</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img className='w-full h-30 rounded-xl hover:scale-105 transition-all cursor-pointer object-cover' src="https://images.unsplash.com/photo-1761839257789-20147513121a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <p className='text-sm mt-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
                <div>
                    <div className='flex text-sm text-gray-500 p-1 items-center gap-1'>
                        <ThumbsUp className='cursor-pointer hover:scale-110 active:scale-95 hover:text-black text-gray-500 transition-colors' />
                        <p className='font-medium'>1.2K</p>
                    </div>
                </div>

            </div>


        </>
    )
}

export default Postcard