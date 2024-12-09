import About from "../../../../pages/user/About"
import AllProduct from "../../../../pages/user/AllProduct"
import Cart from "../../../../pages/user/Cart"
import Category from "../../../../pages/user/Category"
import Error from "../../../../pages/user/Error"
import Home from "../../../../pages/user/Home"
import Login from "../../../../pages/user/Login"
import ProductDetail from "../../../../pages/user/ProductDetail"
import Register from "../../../../pages/user/Register"
import Search from "../../../../pages/user/Search"
import Footer from "./Footer"
import HeaderMiddle from "./HeaderMiddle"
import HeaderTop from "./HeaderTop"
import HeaderBottom from "./HederBottom"
import LinkCssUser from "./LinkCssUser"
import { useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import React from "react"
import StatusOder from "../../../../pages/user/StatusOder"
import Order from "../../../../pages/user/Order/order"
import ForgotPassword from "../../../../pages/user/ForgotPassword"
import MyAccout from "../../../../pages/user/MyAccout"
import ChangePassword from "../../../../pages/user/ChangePassword"
import Aos from "aos"
import "aos/dist/aos.css"
import { ToastContainer } from "react-toastify"
import BlogDetail from "../../../../pages/user/BlogDetail"
import Blog from "../../../../pages/user/Blog"

const User = () => {
    const user = useSelector(({ Auth }) => Auth.user)

    const [show, setShow] = React.useState(false)


    React.useEffect(() => {
        var script = document.createElement('script');
        script.src = './Asset/User/js/main.js';
        script.async = true;
        var script2 = document.createElement('script');
        script2.src = './Asset/User/js/vendor/jquery-1.12.4.min.js';
        script2.async = true;
     
       
       
        
        script.onload = () => {
            // Hàm jQuery đã được thực hiện sau khi tệp script bên ngoài đã được tải
        };

        setTimeout(() => {
            setShow(true)
        }, 400)
        setTimeout(() => {
            document.getElementById("script")?.appendChild(script,script2)
        }, 500)
        Aos.init()
        Aos.refresh()
    }, [])

    return (
        <>
            <LinkCssUser />
            {show &&
                <div className="body-wrapper">
                    <header>
                        <HeaderTop />
                        <HeaderMiddle />
                        <HeaderBottom />
                    </header>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/products" element={<AllProduct />} />
                        <Route path="/category/:id" element={<Category />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/status" element={<StatusOder />} />
                        <Route path="/order" element={<Order />} />
                        {!user._id&&
                        <Route path="/login" element={<Login />} />}
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                        {!user._id&&
                        <Route path="/register" element={<Register />} />}
                        {user._id&&
                        <Route path="/myaccout" element={<MyAccout />} />}
                        {user._id&&
                        <Route path="/changepassword" element={<ChangePassword />} />}
                        <Route path="/blogs" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    <Footer />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                    {/* Same as */}
                    <ToastContainer />
                </div>}
            <div id="script"></div>

        </>
    )
}

export default User