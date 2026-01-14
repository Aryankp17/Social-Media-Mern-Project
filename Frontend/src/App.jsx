
import Edit from './pages/Edit';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register'
import Mainlayout from './pages/Mainlayout'
import Authlayout from './pages/Authlayout'
import Tostify from './components/Tostify';
import { useSelector } from 'react-redux';
import Protectedroute from './pages/Protectedroute';
import { useEffect } from 'react';

const App = () => {

  return (
    <div className=''>
      <Tostify />
      <Routes>
        <Route element={<Protectedroute />} >
          <Route element={<Mainlayout />} >
            <Route path='/' element={<Home />} />
            <Route path='/edit/:postId' element={<Edit />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
        <Route element={<Authlayout />} >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App