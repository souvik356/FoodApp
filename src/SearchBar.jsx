import { useEffect, useState } from 'react';

const SearchBar = () => {
  const [recipie, setRecipie] = useState('');
  const [data,setData] = useState([])
  const [recommendationBox,setRecommendationBox] = useState(false)
  const getRecommendation = async () => {
      const data = await fetch(`https://dummyjson.com/recipes/search?q=${recipie}`)
      const jsonData = await data.json()
      setData(jsonData.recipes)
      setRecommendationBox(true)
  };
  useEffect(()=>{
    const timer = setTimeout(getRecommendation,500)
    return()=>{
      clearTimeout(timer)
    }
  },[recipie])
  return (
    <>
    <div className='search-bar'>
    <input
        onChange={(e) => setRecipie(e.target.value)}
        value={recipie}
        type="text"
        className="input-box"
        placeholder="Enter your favourite food"
        onFocus={()=>setRecommendationBox(true)}
        onBlur={()=>setRecommendationBox(false)}
      />
      {recommendationBox &&(<div className="recipie-recommendation">
           {
            data.length===0 ?'No Item found' :(data.map((data)=><span className='span-row'>{data.name}</span>))
           }
      </div>)}
    </div>
    </>
  );
};

export default SearchBar;
