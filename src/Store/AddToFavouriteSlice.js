import { createSlice } from "@reduxjs/toolkit";

const AddToFavouriteSlice = createSlice({
    name:'Favorite',
    initialState:{
        value: []
    },
    reducers : {
        addItem : (state,action)=>{
            state.value.push(action.payload)
        },
        removeItem : (state,action)=>{
            state.value = state.value.filter((item) => item.id !== action.payload)
        },
        removeAllItem : (state,action)=>{
            state.value = []
        }
    }
})

export const { addItem,removeItem,removeAllItem } = AddToFavouriteSlice.actions
export default AddToFavouriteSlice.reducer