import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addItem } from './Store/AddToFavouriteSlice'

const RecipiePage = () => {
    const [data,setData] = useState(null)
    const favouriteItem = useSelector(store => store.favourite.value)
    const params = useParams()
    const {id} = params
    console.log(id);
    const dispatch = useDispatch()
    const getRecipe = async () => {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`)
        const data = await response.json()
        console.log(data);
        setData(data)
    }
    const checkExist =favouriteItem.some((item)=>data?.id === item?.id)
    console.log('checkExist',checkExist);
    
      
    useEffect(()=>{
        getRecipe()
    },[id])
    if(!data) return <div className='pt-20 text-center'>Loading .....</div>
  return (
    <div className='pt-22 px-16 max-w-screen overflow-y-scroll container mx-auto bg-amber-100 flex flex-col gap-2 items-center justify-center'>
       <h1 className='font-bold text-2xl'>{data?.name}</h1>
       <h3 className='font-semibold'>{data?.difficulty}</h3>
       <div className='w-56 h-56'>
         <img className='w-full h-full object-cover rounded-xl' alt='recipie-image' src={data?.image} />
       </div>

       <div className='flex items-center gap-2 justify-center'>
         <h1 className='font-bold'>Meal-Type:-</h1>
         <h1>{data?.mealType}</h1>
       </div>

       <div className='flex items-center gap-2 justify-center'>
         <h1 className='font-bold'>Calorie Per Serving:-:-</h1>
         <h1>{data?.caloriesPerServing} kps</h1>
       </div>

       <div className='flex items-center gap-2 justify-center'>
         <h1 className='font-bold'>Cuisine-Type:-</h1>
         <h1>{data?.prepTimeMinutes} min</h1>
       </div>

       <div className='flex items-center gap-2 justify-center'>
         <h1 className='font-bold'>Preparation-Time:-</h1>
         <h1>{data?.cuisine}</h1>
       </div>

       <div>
          <h1 className='text-center font-bold'>Ingredients:-</h1>
          <div className='mt-1.5'>
            {
                data?.ingredients?.join(',')
             }
          </div>

          <div className='mt-3'>
            <h1 className='text-center font-bold'>Instructions:-</h1>
            <ul className='list-disc px-8 mt-2'>
            {
                data?.instructions?.map((item,index)=><li key={index}>{item}</li>)
            }
            </ul>
          </div>
       </div>

       <button disabled={checkExist} onClick={()=>dispatch(addItem(data))} className={`px-4 py-0.5 ${checkExist?"bg-gray-300":"bg-amber-400"} rounded-xl cursor-pointer mt-4 mb-10`}>{checkExist?"Already in Favourite":"Add To Favourite"}</button>
    </div>
  )
}

export default RecipiePage