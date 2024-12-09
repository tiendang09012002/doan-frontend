import { Routes,Route } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import User from "../../../../pages/admin/User/User"
import CreateUser from "../../../../pages/admin/User/CreateUser"
import EditUser from "../../../../pages/admin/User/EditUser"
import Product from "../../../../pages/admin/Product/Product"
import CreateProduct from "../../../../pages/admin/Product/CreateProduct"
import EditProduct from "../../../../pages/admin/Product/EditProduct"
import Category from "../../../../pages/admin/Category/Category"
import EditCategory from "../../../../pages/admin/Category/EditCategory"
import CreateCategory from "../../../../pages/admin/Category/CreateCategory"
import Comment from "../../../../pages/admin/Comment/Comment"
import Order from "../../../../pages/admin/Order/Order"
import DetailOrder from "../../../../pages/admin/Order/DetailOrder"
import Home from "../../../../pages/admin/DashBoard/dashboard"
import CommentBlog from "../../../../pages/admin/CommentBlog/CommentBlog"
import Blog from "../../../../pages/admin/Blog/Blog"
import EditBlog from "../../../../pages/admin/Blog/EditBlog"
import CreateBlog from "../../../../pages/admin/Blog/CreateBlog"

const Admin  = ()=>{
    return (
        <>
            <Header/>
            <Sidebar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<User />} />
                <Route path="/users/create" element={<CreateUser/>}/>
                <Route path="/users/edit/:id" element={<EditUser/>}/>
                <Route path="/products" element={<Product />} />
                <Route path="/products/create" element={<CreateProduct/>} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/categories" element={<Category/>}/>
                <Route path="/categories/edit/:id" element={<EditCategory />} />
                <Route path="/categories/create" element={<CreateCategory />} />
                <Route path="/categories/edit/:id" element={<EditCategory />} />
                <Route path="/comments" element={<Comment />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/orders/:id" element={<DetailOrder />} />
                <Route path="/commentblog" element={<CommentBlog />} />
                <Route path='/blogs' element={<Blog />} />
                <Route path='/blogs/create' element={<CreateBlog />} />
                <Route path='/blogs/edit/:id' element={<EditBlog />} />
            </Routes>
            
        </>
    )
}

export default Admin