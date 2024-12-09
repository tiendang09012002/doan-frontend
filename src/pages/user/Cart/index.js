import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { useSelector } from "react-redux"
import { bankingAPi, deleteProToCart, getCartUser, orderApi, updateCart, deleteCart } from "../../../services/Api"
import { VND, checkEmail, checkPhone, getImageProduct } from "../../../shared/ultils"

const Cart = () => {
    const navigate = useNavigate()
    const [cart, setCart] = React.useState([])
    const [inputs, setInputs] = React.useState({})
    const [message, setMessage] = React.useState("");

    const [quantity, setQuantity] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const user = useSelector(({ Auth }) => Auth.user)

    const update = (data) => {
        console.log(data);
        updateCart(data, {}).then(() => {
            getData()
            navigate("/cart")
        })
    }

    const downQty = (pid, id) => {
        const inputQty = document.getElementById(id)
        if (inputQty.value > 1) {
            inputQty.value = Number(inputQty.value) - 1
            update({
                user_id: user._id,
                product_id: pid,
                quantity: Number(inputQty.value)
            });
        } else {
            const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
            if (isConfirm) {
                deleteProToCart(id, {}).then(() => {
                    getData()
                    navigate("/cart")
                })
            }
        }
    }
    const upQty = (pid, id, quantity) => {
        const inputQty = document.getElementById(id)
        if (Number(inputQty.value) < quantity) {
            inputQty.value = Number(inputQty.value) + 1
            update({
                user_id: user._id,
                product_id: pid,
                quantity: Number(inputQty.value)
            });
        }
    }
    const handleDeleteToCart = (e, id) => {
        e.preventDefault();
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteProToCart(id, {}).then(() => {
                getData()
                navigate("/cart")

            })
        }
    }
    const getData = () => {
        getCartUser(user._id, {}).then(({ data }) => {
            setCart(data.data)
            const qty = data.data.reduce((sum, item) => sum + item.quantity, 0)
            setQuantity(qty)
            const sumPrice = data.data.reduce((sum, item) =>
                sum + (item.product_id.price - (item.product_id.price * item.product_id.promotion) / 100) * item.quantity, 0)
            setTotal(sumPrice)
        })
    }

    React.useEffect(() => {

        if (user._id) {
            getData()
        }
        console.log("giỏ hàng")
    }, [])


    const handleClickPay = (e) => {
        if (e.target.classList.contains("active")) {

        } else {
            document.querySelector(".pttt.active").classList.remove("active")
            e.target.classList.add("active")
            e.target.querySelector("input[type=radio]").checked = "true"
        }

    }
    const handleClickParent = (e) => {
        e.stopPropagation()
        e.target.parentElement.click()
    }

    const handleOrder = () => {

        if (inputs.fullName && inputs.address && inputs.city && inputs.phone && inputs.email) {
            if (checkPhone(inputs.phone.trim())) {
                if (checkEmail(inputs.email)) {
                    const newItem = cart.map((item) => ({ prd_id: item.product_id._id, qty: item.quantity }))
                    const data = {
                        items: newItem,
                        ...inputs, user_id: user._id
                    }
                    if (document.getElementById("cod").checked) {
                        orderApi(data, {}).then(() => {
                            document.getElementById("close_model").click()
                            deleteCart(user._id).then(()=>{

                            })
                            .catch((error) => {console.log(error.message)})
                            navigate("/status")
                        }).catch(() => {
                            navigate("/status?vnp_ResponseCode==11")
                        })

                    } else {
                        bankingAPi({
                            amount: total,
                            bankCode: "",
                            language: "vn",
                            data: data
                        }).then(({ data }) => {
                            window.location.href = data
                        })
                    }
                } else {
                    setMessage(<div className="alert alert-danger">Email không hợp lệ!</div>)
                }
            } else {
                setMessage(<div className="alert alert-danger">Số điện thoại không hợp lệ!</div>)
            }

        } else {
            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ thông tin!</div>)
        }
    }
    const onChangeInput = (e) => {
        setMessage("")
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value })
    }

    return (
        <>



            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Giỏ hàng</li>
                        </ul>
                    </div>
                </div>
            </div>

            {!cart.length ? <>
                <div style={{ textAlign: 'center', width: '100%' }} className="mt-40">
                    <img src="https://bizweb.dktcdn.net/100/416/931/themes/806831/assets/empty-cart.png?1616484068897
                          17" alt style={{ width: '30%' }} className="heading__cart-not-img" />
                </div>
                <div className="error-button text-center mb-40">
                    <Link to="/products">Thêm sản phẩm ngay !</Link>
                </div></>
                :
                <div className="Shopping-cart-area pt-60 pb-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <form action="#">
                                    <div className="table-content table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="li-product-remove"></th>
                                                    <th className="li-product-thumbnail">Hình ảnh</th>
                                                    <th className="cart-product-name">Tên sản phẩm</th>
                                                    <th className="li-product-price">Giá </th>
                                                    <th className="li-product-quantity">Số lượng</th>
                                                    <th className="li-product-subtotal">Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map((item) => {
                                                    const giagiam = (item.product_id.price) - (item.product_id.price * item.product_id.promotion) / 100
                                                    return (

                                                        <tr>
                                                            <td className="li-product-remove"><a onClick={(e) => handleDeleteToCart(e, item._id)} href="#" ><i className="fa fa-times" style={{ fontSize: 24 }} /></a></td>
                                                            <td className="li-product-thumbnail"><Link to={`/product/${item.product_id._id}`}><img style={{ width: 200 }} src={getImageProduct(item.product_id.images[0])} /></Link></td>
                                                            <td className="li-product-name"><Link to={`/product/${item.product_id._id}`}>{item.product_id.name}</Link></td>
                                                            <td className="li-product-price"><span className="amount">{VND.format(giagiam)}</span></td>
                                                            <td className="quantity">
                                                                <label>Quantity</label>
                                                                <div className="cart-plus-minus">
                                                                    <input id={item._id} className="cart-plus-minus-box" value={item.quantity} type="text" />
                                                                    <div onClick={() => downQty(item.product_id, item._id)} className="dec qtybutton"><i className="fa fa-angle-down" /></div>
                                                                    <div onClick={() => upQty(item.product_id._id, item._id, item.product_id.quantity)} className="inc qtybutton"><i className="fa fa-angle-up" /></div>
                                                                </div>
                                                            </td>
                                                            <td className="product-subtotal"><span className="amount">{VND.format(item.quantity * giagiam)}</span></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-5 ml-auto">
                                            <div className="cart-page-total">
                                                <h2>Tổng giỏ hàng</h2>
                                                <ul>
                                                    <li>Tổng tiền <span>{VND.format(total)}</span></li>
                                                    <li>Thành tiền <span>{VND.format(total)}</span></li>
                                                </ul>
                                                <a href="#" data-toggle="modal" data-target="#exampleModal">Mua hàng</a>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="modal fade modal-wrapper" id="exampleModal">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span id="close_model" aria-hidden="true">×</span>
                            </button>
                            <h3 className="review-page-title" >Thanh toán</h3>
                            <div className="modal-inner-area row">
                                <div className="col-lg-6 col-12">
                                    <form action="#" style={{ paddingTop: 30 }}>
                                        <div className="checkbox-form">
                                            <h3>Thông tin đặt hàng</h3>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {message}
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Họ tên<span className="required">*</span></label>
                                                        <input name="fullName" onChange={onChangeInput} placeholder="Họ và tên (bắt buộc)" type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="checkout-form-list">
                                                        <label>Số điện thoại  <span className="required">*</span></label>
                                                        <input name="phone" onChange={onChangeInput} placeholder="Số điện thoại (bắt buộc)" type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Email Address <span className="required">*</span></label>
                                                        <input name="email" onChange={onChangeInput} placeholder="Email (bắt buộc)" type="email" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Thành phố <span className="required">*</span></label>
                                                        <input name="city" onChange={onChangeInput} placeholder="Thành phố (bắt buộc)" type="text" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="checkout-form-list">
                                                        <label>Địa chỉ <span className="required">*</span></label>
                                                        <input name="address" onChange={onChangeInput} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="different-address">
                                                <div className="order-notes">
                                                    <div className="checkout-form-list">
                                                        <label>Ghi chú</label>
                                                        <textarea id="checkout-mess" onChange={onChangeInput} cols={30} rows={10} placeholder="Notes about your order, e.g. special notes for delivery." name="notes" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="your-order">
                                        <h3>Sản phẩm</h3>
                                        <div className="your-order-table table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th className="cart-product-name">Sản phẩm</th>
                                                        <th className="cart-product-total">Tổng tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cart.map((item) => {
                                                        const giagiam = (item.product_id.price) - (item.product_id.price * item.product_id.promotion) / 100
                                                        return (
                                                            <tr className="cart_item">
                                                                <td className="cart-product-name"> {item.product_id.name}<strong className="product-quantity"> × {item.quantity}</strong></td>
                                                                <td className="cart-product-total"><span className="amount">{VND.format(item.quantity * giagiam)}</span></td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    <tr className="cart-subtotal">
                                                        <th>Tổng tiền</th>
                                                        <td><span className="amount">{VND.format(total)}</span></td>
                                                    </tr>
                                                    <tr className="order-total">
                                                        <th>Thành tiền</th>
                                                        <td><strong><span className="amount">{VND.format(total)}</span></strong></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="payment-method">
                                            <div className="payment-accordion">
                                                <div id="accordion">
                                                    <div className="card">
                                                        <h5 className="panel-title">
                                                            Phương thức thanh toán
                                                        </h5>

                                                    </div>

                                                    <div onClick={handleClickPay} className="pttt active">
                                                        <input onClick={handleClickParent} style={{ cursor: "pointer" }} checked type="radio" id="cod" name="pay" value="cod" className="pttt_check" />
                                                        <img onClick={handleClickParent} src="https://cdn-icons-png.flaticon.com/512/9442/9442701.png" alt="ảnh" />
                                                        <div onClick={handleClickParent} className="pttt_title" >
                                                            <p>
                                                                <b>
                                                                    COD
                                                                </b>
                                                            </p>
                                                            <p>Thanh toán khi nhận hàng</p>
                                                        </div>

                                                    </div>
                                                    <div onClick={handleClickPay} className="pttt">
                                                        <input onClick={handleClickParent} style={{ cursor: "pointer" }} type="radio" name="pay" value="vnpay" className="pttt_check" />
                                                        <img onClick={handleClickParent} src="https://1office.vn/wp-content/uploads/2020/06/logo_vnpay.png" alt="ảnh" />
                                                        <div onClick={handleClickParent} className="pttt_title" >
                                                            <p>
                                                                <b>

                                                                    VNPay
                                                                </b>
                                                            </p>
                                                            <p>Thanh toán chuyển khoản VNPAY</p>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="order-button-payment">
                                                    <input value="ĐẶT HÀNG" onClick={handleOrder} type="submit" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>





        </>
    )
}

export default Cart