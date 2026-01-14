import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loginUser = createAsyncThunk(
    '/login',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:3000/login', userData, { withCredentials: true })
            return res.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }

)
export const logoutuser = createAsyncThunk(
    '/logout',
    async (_,{rejectWithValue}) => {
        try {
            const res = await axios.get('http://localhost:3000/logout',{withCredentials:true})
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data) 
        }
    }
)
export const profileupdate = createAsyncThunk(
    '/profileupdate',
    async (formdata,{rejectWithValue})=>{
        try {
            const res = await axios.post('http://localhost:3000/profileupdate', formdata, { withCredentials: true })
            return res.data
            
        } catch (error) {
            return rejectWithValue(error.response.message)
            
        }
    }
)
const UserAuth = createSlice({
    name: 'UserAuth',
    initialState: {
        user: null,
        isAuthorized: false,
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        logout: (state) => {
            state.user = null,
            state.isAuthorized = false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true,
                state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false,
                state.user = action.payload.data,
                state.isAuthorized = true,
                state.message = action.payload.message
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload.message
        })
        builder.addCase(logoutuser.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        builder.addCase(logoutuser.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = null,
            state.isAuthorized = false,
            state.message = action.payload.message
        })
        builder.addCase(logoutuser.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload.message
        })
        builder.addCase(profileupdate.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        builder.addCase(profileupdate.fulfilled,(state,action)=>{
            state.loading = false,
            state.user = action.payload.data,
            state.message = action.payload.message
        })
        builder.addCase(profileupdate.rejected,(state,action)=>{
            state.loading = false,
            state.error= action.payload.message
        })

    }
})
export const { logout} = UserAuth.actions
export default UserAuth.reducer