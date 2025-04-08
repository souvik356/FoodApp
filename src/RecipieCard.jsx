const RecipieCard = ({name,image})=>{
  return(
    <>
      <div className='recipie-Card'>
          <div className='recipie-div'>
            <img className='recipie-img' src={image} />
          </div>
          <h3 className='recipie-name'>{name}</h3>
      </div>
    </>
  )
}

export default RecipieCard