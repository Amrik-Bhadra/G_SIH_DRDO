import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './pages/LoginForm/ForgotPassword';
import VerifyOTP from './pages/LoginForm/VerifyOTP';
import RegistrationForm from './pages/RegistrationForm/CandidateRegistration';
import ResetPassword from './pages/LoginForm/ResetPassword';
import RacHeadDashboard from './pages/RacHeadPages/RacHeadDashboard';
import RacHeadAnalytics from './pages/RacHeadPages/RacHeadAnalytics';
import RacHeadPannels from './pages/RacHeadPages/RacHeadPannels';
import CandidateCompleteDetail from './pages/RegistrationForm/CandidateCompleteDetail';
import ExpertCompleteDetail from './pages/RegistrationForm/ExpertCompleteDetail';
import ExpertRegistrationForm from './pages/RegistrationForm/ExpertRegistration';
import ExpertRegistration from './pages/RegistrationForm/ExpertRegistration';
import CandidateRegistration from './pages/RegistrationForm/CandidateRegistration';
import RegistrationChoice from './pages/RegistrationForm/RegistrationChoice';
import TwoFactorAuthentication from './pages/LoginForm/TwoFactorAuthentication';

const routes = createBrowserRouter([
  { path: '/', element: <LoginForm /> },
  { path: '/forgotPassword', element: <ForgotPassword /> },
  { path: '/verifyOtp', element: <VerifyOTP /> },
  { path: '/twofactorauthentication', element: <TwoFactorAuthentication/>},
  { path: '/registrationchoice', element: <RegistrationChoice /> },
  { path: '/register/candidateregister', element: <CandidateRegistration /> },
  { path: '/register/expertregister', element: <ExpertRegistration /> },
  { path: '/register/expert', element: <ExpertRegistrationForm /> },
  { path: '/register/candidatecompletedetail', element: <CandidateCompleteDetail/> },
  { path: '/register/expertcompletedetail', element: <ExpertCompleteDetail/> },
  { path: '/resetpassword', element: <ResetPassword /> },
  { path: '/rachead/', element: <RacHeadDashboard/> },
  { path: '/rachead/analytics', element: <RacHeadAnalytics/> },
  { path: '/rachead/pannels', element: <RacHeadPannels/> },
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
