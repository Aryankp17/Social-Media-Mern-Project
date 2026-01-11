
import Navbar from './components/Navbar'
import Edit from './pages/Edit';
import Home from './pages/Home';
import { Routes,Route } from 'react-router-dom';
import Profile from './pages/Profile';

const App = () => {
  
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit/:postId' element={<Edit />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App