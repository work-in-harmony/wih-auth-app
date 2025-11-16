import React from "react";
import "./index.css";
import "@fontsource/inter";
import CheckMailPage from "./page/CheckMail/CheckMailPage";
import { ThemeProvider } from "./Context/ThemeContext"; 
import { Routes, Route } from "react-router-dom";
import VerifyOtpPage from './page/verifyOtp/VerifyOtpPage';
import SignUpPage from "./page/SignUp/SignUpPage";
import PublicRoutes from "./Routes/PublicRoutes";
import LoginPage from "./page/LoginPage/LoginPage";
import JwtTest from "./components/JwtTest";
import OAuthRoutes from "./Routes/OAuthRoutes"
function App() {
  return (
    <>
      <ThemeProvider>
        {/* <Routes>
          <Route path="/" element={
            <>
              <PublicRoutes > */}
                <CheckMailPage />
              {/* </PublicRoutes>
            </>
            } />
          <Route path="/sign-up" element={
            <>
              <PublicRoutes >
                <SignUpPage />
              </PublicRoutes>
            </> } />
          <Route path="/verify-otp" element={
              <>
              <PublicRoutes >
                <VerifyOtpPage/>
              </PublicRoutes>
            </>
          } />
          <Route path="/login" element={
              <>
              <PublicRoutes >
                <LoginPage/>
              </PublicRoutes>
            </>
          } />
        <Route path="/jwt/test" element={<JwtTest />} />
        <Route path="/oauth2/redirect" element={<OAuthRoutes />} />
        
        </Routes> */}
      </ThemeProvider>
    </>
  );
}

export default App;
