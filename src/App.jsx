import React from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from "./pages/Contact";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./components/PrivateRoutes";
import UserDashboard from "./pages/user-routes/UserDashboard";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import "./App.css"
import PostPage from "./pages/PostPage";
import Categories from "./pages/Categories";
export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="bottom-center"/>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<Home/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="posts/:postId" element={<PostPage />}/>
        <Route path="categories/:categoryId" element={<Categories />} />
        <Route path="/user" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile-info" element={<ProfileInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}