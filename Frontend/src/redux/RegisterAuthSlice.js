import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from'axios'

export const registeruser=  createAsyncThunk(
    '/register',
    async (userdata,{rejectWithValue})=>{
        try {
            const res = await axios.post('http://localhost:3000/register',userdata,{withCredentials:true})
            return res.data
        } catch (error) {
            return rejectWithValue(error.response.data)
            
        }
    }
)

const RegisterSlice = createSlice({
    name:'RegisterAuth',
    initialState:{
        user:null,
        loading:false,
        error:null,
        message:null
    },
    extraReducers:(builder)=>{
        builder.addCase(registeruser.pending,(state)=>{
            state.loading =true
            state.error = null
        })
        builder.addCase(registeruser.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.data
            state.message = action.payload.message
        })
        builder.addCase(registeruser.rejected,(state,action)=>{
            state.loading = false,
            state.error =action.payload.message
        })
    }
})
export default RegisterSlice.reducer