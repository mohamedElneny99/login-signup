// import './App.css';
// import { BrowserRouter as Router, Routes, Route  , Navigate} from 'react-router-dom';
// import Login from './login/login';
// import Signup from './signup/signup';
// import Home from './home/home';
// import ForgetPassword from './forget-password/forget-password';
// import ResetPassword from './resetPassword/resetPassword';
// import VerifyResetCode from './VerifyResetCode/VerifyResetCode';

// import './axiosConfig';
// import 'bootstrap/dist/css/bootstrap.min.css'; 

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/forget-pass" element={<ForgetPassword />} />
//         <Route path="/verify-reset-code" element={<VerifyResetCode />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;



import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/login';
import Signup from './signup/signup';
import Home from './home/home';
import ForgetPassword from './forget-password/forget-password';
import ResetPassword from './resetPassword/resetPassword';
import VerifyResetCode from './VerifyResetCode/VerifyResetCode';
import ResetSuccess from './ResetSuccess/ResetSuccess';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter basename="/chatify">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/verify-code" element={<VerifyResetCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-success" element={<ResetSuccess />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
