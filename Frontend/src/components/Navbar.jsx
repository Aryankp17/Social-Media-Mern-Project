import React, { useState } from 'react'
import { House } from 'lucide-react';
import { Users } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import { Bell } from 'lucide-react';
import { TvMinimal } from 'lucide-react';
import { Search } from 'lucide-react';
import { MessageSquareText } from 'lucide-react';
import { NavLink } from 'react-router-dom'
import { ChartNoAxesGantt } from 'lucide-react';
import { X } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logoutuser} from '../redux/UserAuthSlice'
import { toast } from 'react-toastify';


const Navbar = () => {

    const [Sidebar, setSidebar] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {user} = useSelector((state)=> state.UserAuth)

    const handleLogout = () => {
        dispatch(logoutuser())
        navigate('/login')
        toast.success("Logged out successfully")
    }
    return (
        <div className='w-full py-5 h-20 z-10 top-0 left-0 px-1 bg-slate-100 sm:px-20 border-b fixed border-gray-300 flex justify-between items-center'>
            <div className='px-3 text-black'>
                <p className='text-3xl font-semibold'>Look<span className='text-xl text-blue-500 font-semibold'>UP</span></p>
            </div>
            <div className='flex gap-6 hidden sm:flex p-2'>
                <NavLink to='/'><House className='cursor-pointer active:scale-95' size={20} /></NavLink>
                <Users className='cursor-pointer active:scale-95' size={20} />
                <CirclePlus className='cursor-pointer active:scale-95' size={20} />
                <Bell className='cursor-pointer active:scale-95' size={20} />
                <TvMinimal className='cursor-pointer active:scale-95' size={20} />
            </div>
            <div className='flex gap-2 text-sm text-gray-600 items-center py-1 px-2'>
                <form className='hidden sm:block'>
                    <div className='border flex gap-2 bg-slate-100 items-center py-1 px-2 rounded-2xl border-gray-500'>
                        <input className='border-0 w-30 text-black outline-0 placeholder:text-gray-500' type="search" placeholder='Search...' />
                        <Search size={18} />
                    </div>
                </form>
                <MessageSquareText color='grey' size={20} />
                <NavLink to={'/profile'}><img className='w-8 h-8 cursor-pointer active:scale-95 hover:scale-105 object-cover rounded-full' src={user.profilepic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"} alt="" /></NavLink>
                <ChartNoAxesGantt className='sm:hidden' onClick={() => setSidebar(!Sidebar)} color='black' />
                <LogOut onClick={()=> handleLogout()} className='hidden sm:block active:scale-95 cursor-pointer hover:invert-100' />

            </div>


            {/* Navbar for mobile view */}
            <div className={`sm:hidden flex flex-col justify-between py-10 absolute w-full h-screen bg-gray-300 top-0 bottom-0 left-0 ${Sidebar ? '' : 'hidden'} `}>
                <div><div className=' flex justify-end' >
                    <X size={38} className=' p-1 active:scale-95 rounded-full transition-all active:bg-gray-400 m-4 cursor-pointer' onClick={() => setSidebar(false)} />
                </div>
                <form className='sm:hidden'>
                    <div className='border flex justify-between bg-slate-100 items-center py-1 px-5 rounded-xl border-gray-500'>
                        <input className='border-0 w-full py-2 text-lg text-black outline-0 placeholder:text-gray-500' type="search" placeholder='Search...' />
                        <Search size={24} className=' mx-1' />
                    </div>
                </form>
                <div className='flex flex-col mt-10 gap-6 sm:hidden p-2'>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b py-1 border-gray-400' to={'/'}><p>Home</p></NavLink>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b py-1 border-gray-400'>Friendlist</NavLink>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b py-1 border-gray-400'>Create</NavLink>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b py-1 border-gray-400'>Notification</NavLink>
                    <NavLink onClick={()=>setSidebar(false)} className='border-b py-1 border-gray-400'>Your Posts</NavLink>
                </div></div>
                <div className=' border-t flex flex-col gap-4 pt-5 border-gray-400'>
                    <div onClick={()=>setSidebar(false)} className='w-full items-center flex justify-between py-2 px-3'>
                        <NavLink to={'/profile'} className=' text-lg  font-medium flex items-center gap-3 ml-5'>Profile</NavLink>
                        <img className='w-10 aspect-square object-cover rounded-full' src={user.profilepic || "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"} alt="" />
                    </div>
                    <button onClick={()=> handleLogout()} className='bg-red-500 self-end active scale-95 text-white border-0 mx-auto rounded-2xl mx-auto text-lg font-semibold outline-0 w-full py-4 px-3'>Logout</button>
                </div>

            </div>

        </div>
    )
}

export default Navbar