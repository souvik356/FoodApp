import React, { useEffect, useRef, useState } from 'react'
import { client,account } from './Appwrite/Appwrite'
import { ID } from 'appwrite'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser, deleteUser } from './Store/UserSlice'

const LoginSignUp = () => {
  const [login,setLogin] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const handleRegister = ()=>{
   //  console.log(name.current.value,email.current.value,password.current.value);
    const promise = account.create(ID.unique(),email.current.value,password.current.value,name.current.value)
    promise.then((response)=>{
      console.log(response);
      account.createEmailPasswordSession(email.current.value,password.current.value)
      .then((result)=>{
         console.log('registered and logged in successfully',result);
         const user = account.get()
           user.then((loggedInUser)=>{
              dispatch(addUser({name:loggedInUser.name,email:loggedInUser.email,id:loggedInUser.$id}))
           })
         navigate('/recipie')
      })
    },function(error){
       console.log(error);
    })
  }
  const handleLogin = ()=>{
   // console.log(email.current.value,password.current.value);
   const promise = account.createEmailPasswordSession(email.current.value,password.current.value)
   promise.then((response)=>{
      console.log('response from login',response);
      const user = account.get()
           user.then((loggedInUser)=>{
              dispatch(addUser({name:loggedInUser.name,email:loggedInUser.email,id:loggedInUser.$id}))
           })
      navigate('/recipie')
   },(error)=>{
      console.log(error);
   })
  }
  const toggleLogin = ()=>{
     setLogin(!login)
  }

  return (
    <div className='w-full h-screen bg-amber-100 flex items-center justify-center'>
       <div className='container w-3/12 bg-amber-400/80 flex flex-col gap-6 p-6 rounded-lg'>
              <h1 className='text-xl text-center'>{login ?"Login":"Register"}</h1>
              {!login &&(<div>
                 <input ref={name} placeholder='Enter Your Name' type='text' className='bg-white w-full p-1.5 rounded outline-none'/>
              </div>)}
              <div>
                 <input ref={email} placeholder='Enter Your email' type='email' className='bg-white w-full p-1.5 rounded outline-none'/>
              </div>
              <div>
                 <input ref={password} placeholder='Enter Your Password' type='password' className='bg-white w-full p-1.5 rounded outline-none'/>
              </div>

              <button onClick={login?handleLogin:handleRegister} className='bg-white p-1.5 rounded cursor-pointer'>{login ?"Login":"Register"}</button>
              <button onClick={toggleLogin} className='cursor-pointer'>{login?"Not a Member? Register Now":"Already a member? Log In Now"}</button>
       </div>
    </div>
  )
}

export default LoginSignUp