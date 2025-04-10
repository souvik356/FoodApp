import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import foodology from './assets/Foodology.png'
import userIcon from './assets/User.png'

const Header = ()=>{
 
  return(
    <>
      <div className='w-full h-22 flex items-center justify-between bg-amber-200'>
        <Link to='/recipie'>
           <img className='w-24' src={foodology}/>
        </Link>
        <div> 
            <SearchBar/>
        </div>
        <img className='user-logo' src={userIcon} />
      </div>
    </>
  )
}

export default Header