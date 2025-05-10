
import Navbar from "./Components/Navbar"


import {Loader} from "lucide-react"
import HomePage from "./Pages/HomePage"
import SignUpPage from "./Pages/SignUpPage"
import LoginPage from "./Pages/LoginPage"
import SettingsPage from "./Pages/SettingsPage"
import ProfilePage from "./Pages/ProfilePage"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"


//---------------------------------------------------------------------------------------------

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spi size-10 " />
        
      </div>
    )
  }

  console.log("Auth User: ", authUser)
  return (
    <div >
      {authUser?<Navbar />: ''}
      <Routes>
        <Route path="/" element={authUser? <HomePage/>: <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser?<SignUpPage/>: <Navigate to="/" />  } />
        <Route path="/login" element={!authUser?<LoginPage/>: <Navigate to="/" />  } />
        <Route path="/settings" element={authUser?<SettingsPage/>: <Navigate to="/login"/>} />        
        <Route path="/profile" element={authUser?<ProfilePage/>: <Navigate to="/login" /> } />



      </Routes>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}  
        
        toastOptions={{
          
          className: '',
          duration: 400,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />

    </div>
  )
}

export default App