import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Protectedroute = () => {
    const navigate = useNavigate()
    const {isAuthorized} = useSelector((state)=>state.UserAuth)
  return (
    <>
    {isAuthorized ? <Outlet /> : <Link to="/login">Please <span className="text-blue-500 text-lg font-medium underline"> login</span> to access this page</Link>}
    </>
  )
}

export default Protectedroute