import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import UpdateUser from './UpdateUser.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path : '/updateUser/:id',
    element : <UpdateUser></UpdateUser>,
    loader : ({params}) => fetch(`/updateUser/${params.id}`)
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
