import dotenv from 'dotenv';
dotenv.config()
import './config/mongodb-connection.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express'
import { registeruser, loginuser } from './controllers/auth-controller.js';
import { getallpost, createpost, getpost, updatepost, deletepost,likepost } from './controllers/post-controller.js';
import { getuser, updateuser } from './controllers/user-controller.js';
import { isloggedin } from './middleware/isloggedin.js'
import upload from './config/multer-config.js'
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/register', registeruser)
app.post('/login', loginuser)

app.post('/createpost', isloggedin, upload.single('image'), createpost)
app.get('/getallpost', isloggedin, getallpost)
app.get('/getpost/:id', isloggedin, getpost)
app.put('/updatepost/:id', isloggedin, upload.single('image'), updatepost)
app.delete('/deletepost/:id', isloggedin, deletepost)

app.get('/userprofile', isloggedin, getuser)
app.post('/profileupdate', isloggedin, upload.single('image'), updateuser)
app.get('/like/:id',isloggedin,likepost)

app.get('/logout', (req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({
      success: true,
      message: "Logout Successful"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    })

  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})