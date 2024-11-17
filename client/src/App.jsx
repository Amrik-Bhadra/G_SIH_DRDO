import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ResetPassword from './pages/LoginForm/ResetPassword';
import { Toaster } from 'react-hot-toast';

const routes = createBrowserRouter([
  { path: '/', element: <ResetPassword /> },
]);


const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </>
  )
}

export default App