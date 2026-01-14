import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getproducts = createAsyncThunk(
    '/getallpost',
    async (_,{rejectWithvalue})=>{
        try {
            const res = await axios.get('http://localhost:3000/getallpost',{withCredentials:true})
            return res.data
            
        } catch (error) {
            return rejectWithvalue(error.response.data.message)
            
        }
    }
)

const ProductSlice = createSlice({
    name:'Product',
    initialState:{
        product:[],
        Loading:false,
        error:null,

    },
    extraReducers:(builder)=>{
        builder.addCase(getproducts.pending,(state)=>{
            state.Loading =true
        })
        builder.addCase(getproducts.fulfilled,(state,action)=>{
            state.Loading = false,
            state.product = action.payload.data.posts,
            state.error = null
        })
        builder.addCase(getproducts.rejected,(state,action)=>{
            state.Loading = false,
            state.error = action.payload,
            state.product = []
        })

    }
})
export default ProductSlice.reducer