import { useState } from "react"
import SearchBar from "./SearchBar"

const Header = ()=>{
 
  return(
    <>
      <div className='nav-bar'>
        <img className='nav-logo' src='https://th.bing.com/th/id/OIP.a9D49yunB3aSNAu62ZmE2gHaHa?rs=1&pid=ImgDetMain'/>
        <div> 
            <SearchBar/>
        </div>
        <img className='user-logo' src='https://th.bing.com/th/id/OIP.OmJICjo6Xt-Ay8oWfxkGNQHaHa?rs=1&pid=ImgDetMainD' />
      </div>
    </>
  )
}

export default Header