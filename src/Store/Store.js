import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './UserSlice'
import  RecipieSlice from './Recipie'
import AddToFavouriteSlice from './AddToFavouriteSlice'
const Store = configureStore({
    reducer:{
        user : UserSlice,
        recipie : RecipieSlice,
        favourite : AddToFavouriteSlice
    }
})

export default Store