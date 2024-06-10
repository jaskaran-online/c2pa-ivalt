import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Logo.jsx/App.jsx'
import {NextUIProvider} from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Success from './components/Success.jsx';
import Verified from './components/Verified.jsx';
 const router = createBrowserRouter([
  {
    
      path : '/',
      element : <Success/>
     },
     {
          path : '/success',
          element : <Success/>
     },
     {
      path : '/app',
      element : <App/>
    },
    {
      path : '/verified',
      element : <Verified/>
    },
 
       
 ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} > 
    <React.StrictMode>
     <NextUIProvider>
      <App />
     </NextUIProvider>
   </React.StrictMode>,
  </RouterProvider> 
)
