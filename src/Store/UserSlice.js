import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'User',
    initialState:{
        value: null
    },
    reducers:{
        addUser : (state,action)=>{
            state.value = action.payload
        },
        deleteUser : (state,action)=>{
             state.value = null
        } 
    }
})

export const {addUser,deleteUser} = userSlice.actions
export default userSlice.reducer