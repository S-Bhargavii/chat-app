import Navbar from "./components/Navbar"
import {Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  // this is the parent component 
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  }, [checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser) return (
    // display loading while it the backend is checking if 
    // the user is authenticated or not
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    <div>
      <Navbar/>
      <Routes>
        {/* this is to add protection to the routes on the frontend also */}
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/> }/>
        <Route path="/signup" element={!authUser ? <SignUpPage/>: <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <LoginPage/>: <Navigate to="/"/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>  
  )
}

export default App