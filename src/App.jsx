import './App.css'
import Body from './Body'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainBody from './MainBody'
import LoginSignUp from './LoginSignUp'
import RecipiePage from './RecipiePage'
import ProtectedRoute from './ProtectedRoute'

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
        path:'recipie',
        element : <ProtectedRoute><Body/></ProtectedRoute>
      },
      {
        path:'recipie/:id',
        element : <ProtectedRoute><RecipiePage /></ProtectedRoute>
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
