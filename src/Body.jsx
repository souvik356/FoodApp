import { useEffect, useState } from "react"
import RecipieCard from "./RecipieCard"

const Body = ()=>{
  const PAGE_SIZE = 8
  const [recepie,setReciepe] = useState([])
  const [pageNo,setPageNo] = useState(0)
  const getRecipe = async()=>{
    const response = await fetch('https://dummyjson.com/recipes?limit=0')
    const jsonData = await response.json()
    setReciepe(jsonData.recipes)
  }
  useEffect(()=>{
   getRecipe()
  },[])
  // console.log(recepie[1])
  const totalPages = Math.ceil(recepie.length/PAGE_SIZE)
  console.log('totalPages',totalPages)
  const start = pageNo * PAGE_SIZE
  const end = start + PAGE_SIZE
  const array = [...Array(totalPages).keys()]
  // console.log(array)
  const handleNext = ()=>{
    setPageNo(pageNo+1)
  }
  const handlePrevious = ()=>{
    setPageNo(pageNo-1)
  }
  const handlePageChange = (page)=>{
     setPageNo(page)
  }
  return(
    <>
      <div className='body-container'>
         {
           recepie.slice(start,end).map((data)=> <RecipieCard key={data.id} name={data.name} image={data.image}/>)
         }
      </div>
      <div className='btn-div'>
        <button disabled={pageNo+1<=1?true:false} onClick={handlePrevious}>previous</button>
        {pageNo+1}/{totalPages}
        <button disabled={pageNo+1===totalPages? true:false} onClick={handleNext}>Next</button>
      </div>
      <div className='pagination-div'>
        {
          array.map((data)=><span key={data} onClick={()=>handlePageChange(data)} className='num-container'>{data+1}</span>)
        }
      </div>
    </>
  )
}

export default Body