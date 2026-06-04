import { Navigate, Route, Routes } from "react-router";
import Homepage from "./pages/homepage.jsx";
import Login from "./pages/login.jsx";
import Signin from "./pages/signin.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthuser.js";
import useThemeStore from "./hooks/useThemeStore.js";

import Layout from "./components/Layout.jsx";
const App = () => {
 const{isLoading,authUser}=useAuthUser()
const {theme}=useThemeStore()

const isAuthenticated =Boolean(authUser)
const isOnboarded = authUser?.isOnboarded


if(isLoading) return <PageLoader/>;


return (<div className="h-screen " data-theme={theme}>
 <Routes>
  <Route path="/" element=
  {isAuthenticated && isOnboarded ? (
    <Layout showSidebar={true}>
      <Homepage/>
    </Layout>
   ):(
  <Navigate to={!isAuthenticated ? "/login":"/onboarding"}/>
)}
/>
  <Route path="/login" element={
    !isAuthenticated?<Login/> : <Navigate to={isOnboarded ?"/":"/onboarding"} />}/>
  <Route path="/signin" element=
  {!isAuthenticated ?<Signin/> :<Navigate to={isOnboarded ?"/":"/onboarding"}/>}/>
  <Route path="/onboarding" element={
    isAuthenticated ?(
      !isOnboarded ?(
        <OnboardingPage/>

      ):(
        <Navigate to="/" />
      )
    ):(
      <Navigate to="/login"/>
    ) }/>
  <Route path="/call" element={isAuthenticated ?<CallPage/> : <Navigate to="/login" />}/>
  <Route path="/chat/:id" element={isAuthenticated ? (
    <Layout>
      <ChatPage/>
    </Layout>
  ) : <Navigate to="/login" />}/>
  <Route
   path="/notifications"
   element={
    isAuthenticated && isOnboarded ? (
     <Layout showSidebar={true}>
      <NotificationPage />
     </Layout>
    ) : (
     <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
    )
   }
  />
 </Routes>
 </div>
)
}

export default App;
