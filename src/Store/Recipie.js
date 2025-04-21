import { createSlice } from "@reduxjs/toolkit";

const recipieSlice = createSlice({
    name : 'recipie',
    initialState:{
        value : null
    },
    reducers:{
        addRecipie: (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {addRecipie} = recipieSlice.actions
export default recipieSlice.reducer