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
      </Routes>
    </BrowserRouter>
  )
}