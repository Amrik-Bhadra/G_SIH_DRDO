import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterationForm from './pages/RegisterationForm/RegisterationForm';

const routes = createBrowserRouter([
  { path: '/', element: <RegisterationForm /> },
]);


const App = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App