const RecipieCard = ({name,image})=>{
  return(
    <>
      <div className='w-[10rem] h-[14rem] shadow-xl mb-6 rounded '>
          <div className=''>
            <img className='w-full h-full rounded' src={image} />
          </div>
          <h3 className='text-center text-sm overflow-hidden mt-1 mb-1'>{name}</h3>
      </div>
    </>
  )
}

export default RecipieCard