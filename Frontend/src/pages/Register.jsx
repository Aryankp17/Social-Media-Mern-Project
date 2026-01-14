import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { registeruser } from '../redux/RegisterAuthSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [name, setname] = useState('')
  const [username, setusername] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleSubmit = (e) => {

    e.preventDefault();
    dispatch(registeruser({ name, username, email, password }))
      .unwrap()
      .then((res) => {
        toast.success(res.message)
        setemail('')
        setpassword('')
        setname('')
        setusername('')
        navigate('/login');
      }).catch((err) => {
        toast.error(err.message)
      })

  }
  return (
    <div className=' flex bg-black/40  justify-center items-center h-screen'>
      <div className='flex rounded-md flex-col gap-3 bg-slate-100 shadow-2xl shadow-black p-10'>
        <h1 className='text-2xl text-start font-semibold text-blue-600'><span className='text-lg font-semibold text-black'>Welcome you in ,&nbsp;</span><span className='text-2xl font-bold text-black'>Look</span>UP</h1>
        <h1 className='text-center font-semibold text-2xl'>Sign Up Your Account</h1>
        <form className='flex flex-col gap-2' onSubmit={(e) => handleSubmit(e)}>
          <input value={name} onChange={(e) => setname(e.target.value)} className='py-3 text-gray-500 font-medium placeholder:text-gray-400 border-0 outline-0 border-b border-gray-400 px-3' type="text" placeholder='Name' />
          <input value={email} onChange={(e) => setemail(e.target.value)} className='py-3 text-gray-500 font-medium placeholder:text-gray-400 border-0 outline-0 border-b border-gray-400 px-3' type="email" placeholder='Email' />
          <input value={password} onChange={(e) => setpassword(e.target.value)} className='py-3 text-gray-500 font-medium placeholder:text-gray-400 border-0 outline-0 border-b border-gray-400 px-3' type="password" placeholder='Password' />
          <input value={username} onChange={(e) => setusername(e.target.value)} className='py-3 text-gray-500 font-medium placeholder:text-gray-400 border-0 outline-0 border-b border-gray-400 px-3' type="text" placeholder='Username' />
          <button className='bg-blue-500 text-white font-semibold active:scale-95 text-lg hover:bg-blue-600 py-2 px-3 rounded-xl cursor-pointer' type='submit'>Sign Up</button>
        </form>
        <p className='text-sm mt-4 leading-4 text-gray-500'>Already have an account? Sign in here.&nbsp;<Link className='text-blue-500 font-semibold hover:underline' to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register