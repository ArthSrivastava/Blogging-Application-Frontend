import React from "react"
import CustomNavbar from "./CustomNavbar"
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Base({children}) {
    return (
        <div className="container-fluid p-0 m-0">
            <CustomNavbar />
             {children}
             {/* <footer className="footer">This is the footer</footer> */}
        </div>
    )
}