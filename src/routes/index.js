import { checkLogged, checkNotLogged } from "../shared/authRequired";
import Home from "../pages/Home";
import Category from "../pages/Category";
import ProductDetails from "../pages/ProductDetails";
import Search from "../pages/Search";
import Cart from "../pages/Cart";
import Success from "../pages/Success";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Customer from "../pages/Customer";
import NotFound from "../pages/NotFound";
import Order from "../pages/Order";
import OrderDetails from "../pages/Order Details";

const publicRoutes = [
    {
        path: "/",
        element: Home
    },
    {
        path: "/Category-:id",
        element: Category
    },
    {
        path: "/ProductDetails-:id",
        element: ProductDetails
    },
    {
        path: "/Search",
        element: Search
    },
    {
        path: "/Cart",
        element: Cart
    },
    {
        path: "/Success",
        element: Success
    },
    {
        path: "/Login",
        element: checkLogged(Login)
    },
    {
        path: "/Register",
        element: checkLogged(Register)
    },
    {
        path: "/Customer",
        element: checkNotLogged(Customer)
    },
    {
        path: "/Order-:id",
        element: checkNotLogged(Order)
    },
    {
        path: "/OrderDetails-:id",
        element: checkNotLogged(OrderDetails)
    },
    {
        path: "*",
        element: NotFound
    },
]

export default publicRoutes