import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm';

const routes = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App