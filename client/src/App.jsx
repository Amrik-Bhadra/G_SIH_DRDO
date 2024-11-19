import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/LoginForm/ForgotPassword';
import VerifyOTP from './pages/LoginForm/VerifyOTP';
import ResetPassword from './pages/LoginForm/ResetPassword';
import ExpertCompleteDetail from './pages/RegistrationForm/ExpertCompleteDetail';
import RegistrationChoice from './pages/RegistrationForm/RegistrationChoice';
import ExpertRegistration from './pages/RegistrationForm/ExpertRegistration';
import CandidateRegistration from './pages/RegistrationForm/CandidateRegistration';
import CandidateCompleteDetail from './pages/RegistrationForm/CandidateCompleteDetail';

const routes = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
  { path: '/verifyOtp', element: <VerifyOTP /> },
  { path: '/registrationchoice', element: <RegistrationChoice /> },
  { path: '/register/candidateregister', element: <CandidateRegistration /> },
  { path: '/register/expertregister', element: <ExpertRegistration /> },
   { path: '/register/candidatecompletedetail', element: <CandidateCompleteDetail/> },
  { path: '/register/expertcompletedetail', element: <ExpertCompleteDetail/> },
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

export default App;
