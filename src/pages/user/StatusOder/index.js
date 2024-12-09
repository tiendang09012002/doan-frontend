import React from "react";
import { Link, useSearchParams ,useNavigate } from "react-router-dom"
import { getCartUser, orderApi, deleteCart } from "../../../services/Api";
import { useSelector } from "react-redux";
const StatusOder = () => {
    const user = useSelector(({ Auth }) => Auth.user)

    const navigate=useNavigate()
    const [message,setMessage] = React.useState(<h3>Loading ... !</h3>)
    const [searchParams] = useSearchParams();
    const info = JSON.parse(searchParams.get("vnp_OrderInfo"))
    React.useEffect( ()=>{
        if (searchParams.get("vnp_ResponseCode")) {
            if (searchParams.get("vnp_ResponseCode") == "00") {
                setMessage(<h3>bạn đã đặt hàng thành công !</h3>)
                getCartUser(user._id,{}).then(({data})=>{

                    const newItem = data.data.map((item) => ({ prd_id: item.product_id._id, qty: item.quantity }))
                    orderApi({
                        items:newItem,
                        ...info,user_id:user._id,pay:"vnpay"
                    },{}).then(()=>{
                        deleteCart(user._id).then(()=>{})
                        navigate("/status")
                    }).catch(()=>{
                        navigate("/status?vnp_ResponseCode==11")
                    })
                    
                })
                
            } else {
                setMessage(<h3 style={{color: "red"}}>Thanh toán thất bại !</h3>)
            }
        } else {
            setMessage(<h3>Bạn đã đặt hàng thành công !</h3>)
        }
    },[])
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Trạng thái đặt hàng </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-wraper  pb-60">
                <div className="container">
                    {/* <div className="row">
                        <div className="col-lg-12">
                            <div className="single-banner shop-page-banner">
                                <a href="#">
                                    <img src="./Asset/User/images/bg-banner/2.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>

                    </div> */}
                    <div id="order-success">
                        <div class="row">
                            <div id="order-success-img" style={{
                                background: "url('./Asset/User/images/img-ship.png') top left no-repeat"
                            }} class="col-lg-3 col-md-3 col-sm-12"></div>
                            <div id="order-success-txt" class="col-lg-9 col-md-9 col-sm-12">
                                {message}
                                <p>Vui lòng kiểm tra email để xem lại thông tin đơn hàng của mình.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default StatusOder