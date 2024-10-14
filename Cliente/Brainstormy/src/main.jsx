
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {RouterProvider } from "react-router-dom"
import routes from "./routes"

import Lobby from './Lobby/Lobby'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={routes}>
        <Lobby />
      </RouterProvider>
  </StrictMode>
)