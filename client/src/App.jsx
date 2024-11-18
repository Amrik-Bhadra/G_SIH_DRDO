import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/LoginForm/ForgotPassword';
import VerifyOTP from './pages/LoginForm/VerifyOTP';
import RegistrationForm from './pages/RegistrationForm/RegistrationForm';
import ResetPassword from './pages/LoginForm/ResetPassword';

const routes = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
  { path: '/verifyOtp', element: <VerifyOTP /> },
  { path: '/register', element: <RegistrationForm /> },
  { path: '/resetpassword', element: <ResetPassword /> },
]);


const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <RouterProvider router={routes} />
    </>
  )
}

export default App