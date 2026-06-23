import React from 'react'
import { RouterProvider } from 'react-router'
import { routing } from './routes/routes'


const App = () => {
  return (
    <RouterProvider router={routing}/>
  )
}

export default App
