import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer} from "react-toastify"
import 'react-toastify/ReactToastify.css'
const Layout = (props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <ToastContainer/>
                {props.children}</main>
            <Footer />
        </div>
    )
}

export default Layout