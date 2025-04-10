import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Body from './Body'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainBody from './MainBody'
import LoginSignUp from './assets/LoginSignUp'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <MainBody/>,
    children:[
      {
        path: '/',
        element : <LoginSignUp/>
      },
      {
        path:'/recipie',
        element : <Body/>
      }
    ]
  },
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
