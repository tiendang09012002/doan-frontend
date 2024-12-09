import React from "react"
import { createCart, deleteOrder, editOrder, getOrderUser } from "../../../services/Api"
import { useSelector } from "react-redux"
import { VND, getImageProduct } from "../../../shared/ultils"
import { Link, useNavigate } from "react-router-dom"

const Order = () => {
    const navigate = useNavigate()
    const user = useSelector(({ Auth }) => Auth.user)
    const [orderpending, setOrderpending] = React.useState([])
    const [ordershipping, setOrdershipping] = React.useState([])
    const [orderdone, setOrderdone] = React.useState([])
    console.log(orderpending);
    const getData = async () => {
        try {
            const [pendingResponse, shippingResponse, doneResponse] = await Promise.all([
                getOrderUser(user?._id, { params: { status: 2 } }),
                getOrderUser(user?._id, { params: { status: 1 } }),
                getOrderUser(user?._id, { params: { status: 0 } })
            ]);

            setOrderpending(pendingResponse.data.data);
            setOrdershipping(shippingResponse.data.data);
            setOrderdone(doneResponse.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    React.useEffect(() => {
        const line = document.querySelector(".line_line")
        const listLi = document.querySelectorAll('.nav-item.clickline')
        line.style.transition = "all 0.2s ease"
        line.style.left = listLi[0].offsetLeft + "px"
        line.style.width = listLi[0].offsetWidth + "px"
        listLi.forEach(element => {
            element.onclick = function () {
                line.style.left = element.offsetLeft + "px"
                line.style.width = element.offsetWidth + "px"

            }
        });
        getData();
    }, [])
    const handleViewAll = (id) => {
        if (document.getElementById(id).style.display == "none") {
            document.getElementById(id).style.display = "block"
        } else {
            document.getElementById(id).style.display = "none"
        }
    }
    const handleHuy = (id) => {
        const isConfirm = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng?");
        if (isConfirm) {
            deleteOrder(id, {}).then(() => {
                getData();
            })
        }
    }
    const handleReBuy = (items) => {
        items.forEach((item, index) => {
            if (index == items.length - 1) {
                createCart({
                    user: user._id,
                    product: item.product._id,
                    quantity: item.quantity
                }, {}).then(() => {
                    navigate("/cart")
                })
            } else {
                createCart({
                    user: user._id,
                    product: item.product._id,
                    quantity: item.quantity
                }, {}).then(() => { })
            }
        })
    }
    const handleDone = (id) => {
        editOrder(id, {
            status: 0
        }, {}).then(() => {
            getData();
        })
    }
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Đơn mua</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mt-40">
                <div className="row">
                    <div className="col-lg-12">
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{ position: "relative" }}>
                            <li className="nav-item clickline">
                                <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Chờ lấy hàng</a>
                            </li>
                            <li className="nav-item clickline">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Đang giao hàng</a>
                            </li>
                            <li className="nav-item clickline">
                                <a className="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Đã giao</a>
                            </li>
                            <div className="line_line"></div>
                        </ul>
                    </div>
                </div>
                <div className="row mt-40 mb-40">
                    <div className="col-lg-12">
                        <div style={{}} className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                {orderpending.length == 0 &&
                                    <div style={{ textAlign: 'center', background: "white" }}>
                                        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png" alt="trong" />
                                        <p className="clearmagin" style={{ color: "black", fontSize: 20, marginTop: 10 }}>Chưa có đơn hàng nào. <Link to="/products">Shopping now !</Link></p>

                                    </div>
                                }
                                {orderpending?.map((item) => {
                                    const qty = item.items.reduce((total, item) => total + item.qty, 0)
                                    return (
                                        <div className="order_item">
                                            <div className="addressinfor">
                                                <h6>
                                                    <svg style={{ width: 12, marginRight: 8 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                                    Thông tin nhận hàng
                                                </h6>
                                                <p className="clearmagin">Họ và tên: {item.user_id.fullName}</p>
                                                <p className="clearmagin">Số điện thoại:{item.phone}</p>
                                                <p className="clearmagin">Email: {item.email}</p>
                                                <p className="clearmagin">Địa chỉ: {item.address}</p>
                                            </div>
                                            <div className="order_item_product">
                                                <Link to={`/product/${item.items[0].prd_id._id}`} >
                                                    <img src={getImageProduct(item.items[0].prd_id.images[0])} alt="anh" />
                                                </Link>
                                                <div className="order_item_body">
                                                    <h6 className="order_item_name">
                                                        <Link to={`/product/${item.items[0].prd_id._id}`}>
                                                            {item.items[0].prd_id.name}
                                                        </Link>
                                                    </h6>
                                                    <p className="order_item_qty">
                                                        x<b>
                                                            {item.items[0].qty}
                                                        </b>
                                                    </p>
                                                    {item.items[0].prd_id.promotion ? <>
                                                        <p className="order_item_price clearmagin" style={{ textDecoration: "line-through" }}>
                                                            {VND.format(item.items[0].prd_id.price)}
                                                        </p>
                                                        <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                            {VND.format(item.items[0].prd_id.price - item.items[0].prd_id.price * item.items[0].prd_id.promotion / 100)}
                                                        </p>
                                                    </> : <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                        {VND.format(item.items[0].prd_id.price - item.items[0].prd_id.price * item.items[0].prd_id.promotion / 100)}
                                                    </p>

                                                    }
                                                </div>
                                            </div>
                                            <div style={{ display: "none" }} id={item._id}>
                                                {
                                                    item.items.map((product, index) => {
                                                        if (index == 0) {
                                                            return
                                                        }
                                                        return (
                                                            <div className="order_item_product">
                                                                <Link to={`/product/${product.prd_id._id}`}>
                                                                    <img src={getImageProduct(product.prd_id.images[0])} alt="anh" />
                                                                </Link>
                                                                <div className="order_item_body">
                                                                    <h6 className="order_item_name">
                                                                        <Link to={`/product/${product.prd_id._id}`}>
                                                                            {product.prd_id.name}
                                                                        </Link>
                                                                    </h6>
                                                                    <p className="order_item_qty">
                                                                        x<b>
                                                                            {product.qty}
                                                                        </b>
                                                                    </p>
                                                                    {product.prd_id.promotion ? <>
                                                                        <p className="order_item_price clearmagin" style={{ textDecoration: "line-through" }}>
                                                                            {VND.format(product.prd_id.price)}
                                                                        </p>
                                                                        <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                                            {VND.format(product.prd_id.price - product.prd_id.price * product.prd_id.promotion / 100)}
                                                                        </p>
                                                                    </> : <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                                        {VND.format(product.prd_id.price - product.prd_id.price * product.prd_id.promotion / 100)}
                                                                    </p>

                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            {item.items.length > 1 && <div className="viewallorder">
                                                <p className="clearmagin" onClick={() => handleViewAll(item._id)} style={{ cursor: "pointer" }}>Xem tất cả sả phẩm
                                                    <svg style={{ width: 14, marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                                </p>
                                            </div>

                                            }
                                            <div className="totalprice">
                                                <p className="clearmagin">{qty} sản phẩm</p>
                                                {item.pay === "cod" ?
                                                    <p className="clearmagin">Thanh toán khi nhận hàng</p>
                                                    :
                                                    <p className="clearmagin">Thanh toán chuyển khoản VNPAY:Đã thanh toán</p>

                                                }
                                                <p className="clearmagin" style={{ color: 'black' }}><b>Thành tiền : {VND.format(item.items.reduce((total, item) => total + item.qty * (item.prd_id.price - item.prd_id.price * item.prd_id.promotion / 100), 0))}</b></p>
                                            </div>
                                            <div className="totalprice" style={{ padding: "8px 20px" }}>
                                                <p className="clearmagin" style={{ color: "green" }}>Đơn hàng đang được chuẩn bị</p>
                                                {
                                                    item.pay == "cod" ?
                                                        <button type="button" onClick={() => handleHuy(item._id)} style={{ paddingLeft: 20, paddingRight: 20 }} class="btn btn-danger">Hủy</button>
                                                        :
                                                        <button type="button" disabled style={{ paddingLeft: 20, paddingRight: 20 }} class="btn btn-danger">Hủy</button>

                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                {ordershipping.length == 0 &&
                                    <div style={{ textAlign: 'center', background: "white" }}>
                                        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png" alt="trong" />
                                        <p className="clearmagin" style={{ color: "black", fontSize: 20, marginTop: 10 }}>Chưa có đơn hàng nào. <Link to="/products">Shopping now !</Link></p>
                                    </div>
                                }
                                {ordershipping?.map((item) => {

                                    const qty = item.items.reduce((total, item) => total + item.qty, 0)
                                    return (
                                        <div className="order_item">
                                            <div className="addressinfor">
                                                <h6>
                                                    <svg style={{ width: 12, marginRight: 8 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                                    Thông tin nhận hàng
                                                </h6>
                                                <p className="clearmagin">Họ và tên: {item.user_id.fullName}</p>
                                                <p className="clearmagin">Số điện thoại:{item.phone}</p>
                                                <p className="clearmagin">Email: {item.email}</p>
                                                <p className="clearmagin">Địa chỉ: {item.address}</p>
                                            </div>
                                            <div className="order_item_product">
                                                <Link to={`/product/${item.items[0].prd_id._id}`}>
                                                    <img src={getImageProduct(item.items[0].prd_id.images[0])} alt="anh" />
                                                </Link>
                                                <div className="order_item_body">
                                                    <h6 className="order_item_name">
                                                        <Link to={`/product/${item.items[0].prd_id._id}`}>
                                                            {item.items[0].prd_id.name}
                                                        </Link>
                                                    </h6>
                                                    <p className="order_item_qty">
                                                        x<b>
                                                            {item.items[0].qty}
                                                        </b>
                                                    </p>
                                                    {item.items[0].prd_id.promotion ? <>
                                                        <p className="order_item_price clearmagin" style={{ textDecoration: "line-through" }}>
                                                            {VND.format(item.items[0].prd_id.price)}
                                                        </p>
                                                        <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                            {VND.format(item.items[0].prd_id.price - item.items[0].prd_id.price * item.items[0].prd_id.promotion / 100)}
                                                        </p>
                                                    </> : <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                        {VND.format(item.items[0].prd_id.price - item.items[0].prd_id.price * item.items[0].prd_id.promotion / 100)}
                                                    </p>

                                                    }
                                                </div>
                                            </div>
                                            <div style={{ display: "none" }} id={item._id}>
                                                {
                                                    item.items.map((product, index) => {
                                                        if (index == 0) {
                                                            return
                                                        }
                                                        return (
                                                            <div className="order_item_product">
                                                                <Link to={`/product/${product.prd_id._id}`}>
                                                                    <img src={getImageProduct(product.prd_id.images[0])} alt="anh" />
                                                                </Link>
                                                                <div className="order_item_body">
                                                                    <h6 className="order_item_name">
                                                                        <Link to={`/product/${product.prd_id._id}`}>
                                                                            {product.prd_id.name}
                                                                        </Link>
                                                                    </h6>
                                                                    <p className="order_item_qty">
                                                                        x<b>
                                                                            {product.qty}
                                                                        </b>
                                                                    </p>
                                                                    {product.prd_id.promotion ? <>
                                                                        <p className="order_item_price clearmagin" style={{ textDecoration: "line-through" }}>
                                                                            {VND.format(product.prd_id.price)}
                                                                        </p>
                                                                        <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                                            {VND.format(product.prd_id.price - product.prd_id.price * product.prd_id.promotion / 100)}
                                                                        </p>
                                                                    </> : <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                                        {VND.format(product.prd_id.price - product.prd_id.price * product.prd_id.promotion / 100)}
                                                                    </p>

                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            {item.items.length > 1 && <div className="viewallorder">
                                                <p className="clearmagin" onClick={() => handleViewAll(item._id)} style={{ cursor: "pointer" }}>Xem tất cả sả phẩm
                                                    <svg style={{ width: 14, marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                                </p>
                                            </div>

                                            }
                                            <div className="totalprice">
                                                <p className="clearmagin">{qty} sản phẩm</p>
                                                {item.pay === "cod" ?
                                                    <p className="clearmagin">Thanh toán khi nhận hàng</p>
                                                    :
                                                    <p className="clearmagin">Thanh toán chuyển khoản VNPAY:Đã thanh toán</p>

                                                }
                                                <p className="clearmagin" style={{ color: 'black' }}><b>Thành tiền : {VND.format(item.items.reduce((total, item) => total + item.qty * (item.prd_id.price - item.prd_id.price * item.prd_id.promotion / 100), 0))}</b></p>
                                            </div>
                                            <div className="totalprice" style={{ padding: "8px 20px" }}>
                                                <p className="clearmagin" style={{ color: "green" }}>Đơn hàng đang được giao đến bạn</p>
                                                <button type="button" onClick={() => handleDone(item._id)} style={{ paddingLeft: 20, paddingRight: 20 }} class="btn btn-danger">Đã nhận được hàng</button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                {orderdone.length == 0 &&
                                    <div style={{ textAlign: 'center', background: "white" }}>
                                        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png" alt="trong" />
                                        <p className="clearmagin" style={{ color: "black", fontSize: 20, marginTop: 10 }}>Chưa có đơn hàng nào. <Link to="/products">Shopping now !</Link></p>
                                    </div>
                                }
                                {orderdone?.map((item) => {

                                    const qty = item.items.reduce((total, item) => total + item.qty, 0)
                                    return (
                                        <div className="order_item">
                                            <div className="addressinfor">
                                                <h6>
                                                    <svg style={{ width: 12, marginRight: 8 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                                    Thông tin nhận hàng
                                                </h6>
                                                <p className="clearmagin">Họ và tên: {item.user_id.fullName}</p>
                                                <p className="clearmagin">Số điện thoại:{item.phone}</p>
                                                <p className="clearmagin">Email: {item.email}</p>
                                                <p className="clearmagin">Địa chỉ: {item.address}</p>
                                            </div>
                                            <div className="order_item_product">
                                                <Link to={`/product/${item.items[0].prd_id._id}`}>
                                                    <img src={getImageProduct(item.items[0].prd_id.images[0])} alt="anh" />
                                                </Link>
                                                <div className="order_item_body">
                                                    <h6 className="order_item_name">
                                                        <Link to={`/product/${item.items[0].prd_id._id}`}>
                                                            {item.items[0].prd_id.name}
                                                        </Link>
                                                    </h6>
                                                    <p className="order_item_qty">
                                                        x<b>
                                                            {item.items[0].qty}
                                                        </b>
                                                    </p>
                                                    {item.items[0].prd_id.promotion ? <>
                                                        <p className="order_item_price clearmagin" style={{ textDecoration: "line-through" }}>
                                                            {VND.format(item.items[0].prd_id.price)}
                                                        </p>
                                                        <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                            {VND.format(item.items[0].prd_id.price - item.items[0].prd_id.price * item.items[0].prd_id.promotion / 100)}
                                                        </p>
                                                    </> : <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                        {VND.format(item.items[0].prd_id.price - item.items[0].prd_id.price * item.items[0].prd_id.promotion / 100)}
                                                    </p>

                                                    }
                                                </div>
                                            </div>
                                            <div style={{ display: "none" }} id={item._id}>
                                                {
                                                    item.items.map((product, index) => {
                                                        if (index == 0) {
                                                            return
                                                        }
                                                        return (
                                                            <div className="order_item_product">
                                                                <Link to={`/product/${product.prd_id._id}`}>
                                                                    <img src={getImageProduct(product.prd_id.images[0])} alt="anh" />
                                                                </Link>
                                                                <div className="order_item_body">
                                                                    <h6 className="order_item_name">
                                                                        <Link to={`/product/${product.prd_id._id}`}>
                                                                            {product.prd_id.name}
                                                                        </Link>
                                                                    </h6>
                                                                    <p className="order_item_qty">
                                                                        x<b>
                                                                            {product.qty}
                                                                        </b>
                                                                    </p>
                                                                    {product.prd_id.promotion ? <>
                                                                        <p className="order_item_price clearmagin" style={{ textDecoration: "line-through" }}>
                                                                            {VND.format(product.prd_id.price)}
                                                                        </p>
                                                                        <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                                            {VND.format(product.prd_id.price - product.prd_id.price * product.prd_id.promotion / 100)}
                                                                        </p>
                                                                    </> : <p className="order_item_price clearmagin " style={{ color: "red" }}>
                                                                        {VND.format(product.prd_id.price - product.prd_id.price * product.prd_id.promotion / 100)}
                                                                    </p>

                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>

                                            {item?.items.length > 1 && <div className="viewallorder">
                                                <p className="clearmagin" onClick={() => handleViewAll(item._id)} style={{ cursor: "pointer" }}>Xem tất cả sả phẩm
                                                    <svg style={{ width: 14, marginLeft: 8 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                                                </p>
                                            </div>

                                            }
                                            <div className="totalprice">
                                                <p className="clearmagin">{qty} sản phẩm</p>
                                                {item.pay === "cod" ?
                                                    <p className="clearmagin">Thanh toán khi nhận hàng</p>
                                                    :
                                                    <p className="clearmagin">Thanh toán chuyển khoản VNPAY:Đã thanh toán</p>

                                                }
                                                <p className="clearmagin" style={{ color: 'black' }}><b>Thành tiền : {VND.format(item.items.reduce((total, item) => total + item.qty * (item.prd_id.price - item.prd_id.price * item.prd_id.promotion / 100), 0))}</b></p>
                                            </div>
                                            <div className="totalprice" style={{ padding: "8px 20px" }}>
                                                <p className="clearmagin" style={{ color: "green" }}>Đơn hàng đã được giao thành công</p>
                                                <button type="button" onClick={() => handleReBuy(item.items)} style={{ paddingLeft: 20, paddingRight: 20 }} class="btn btn-danger">Mua lại</button>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Order