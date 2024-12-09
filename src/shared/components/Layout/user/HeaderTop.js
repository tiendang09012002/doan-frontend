import { Link, useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { LOGOUT_SUCCESS } from "../../../constants/action-type"
const HeaderTop = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(({ Auth }) => Auth.user)
    console.log(user);
    const onClickLogOut=(e)=>{
        e.preventDefault();
        dispatch({
            type:LOGOUT_SUCCESS
        })
        navigate("/")
    }
    return (
        <>
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        {/* Begin Header Top Left Area */}
                        <div className="col-lg-3 col-md-4">
                            <div className="header-top-left">
                                <ul className="phone-wrap">
                                    <li><span>Số điện thoại:</span><a href="#">(+84) 869759743</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* Header Top Left Area End Here */}
                        {/* Begin Header Top Right Area */}
                        <div className="col-lg-9 col-md-8">
                            <div className="header-top-right">
                                <ul className="ht-menu">
                                    {/* Begin Setting Area */}
                                    {/* <li>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                                                Dropdown button
                                            </button>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </li> */}


                                    {/* Setting Area End Here */}
                                    {/* Begin Currency Area */}
                                    <li>
                                        <span className="currency-selector-wrapper">Tiền tệ :</span>
                                        <div className="ht-currency-trigger"><span>VNĐ</span></div>
                                    </li>
                                    {/* Currency Area End Here */}
                                    {/* Begin Language Area */}
                                    <li>
                                        <span className="language-selector-wrapper">Ngôn ngữ :</span>
                                        <div className="ht-language-trigger"><span>Tiếng việt</span></div>
                                        <div className="language ht-language" style={{ display: 'none' }}>
                                            <ul className="ht-setting-list">
                                                <li className="active"><a href="#"><img src="images/menu/flag-icon/1.jpg" alt />English</a></li>
                                                <li><a href="#"><img src="images/menu/flag-icon/2.jpg" alt />Français</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    {user?._id ?
                                        <li>

                                            <div className="ht-language-trigger"><span >
                                                <img class="shopee-avatar__img" style={{height:21,width:21,borderRadius:50,marginRight:4}} alt="ảnh đại diện" src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lphihlglcmk5ee_tn"/>
                                                    {user.fullName}
                                                </span>
                                                <ul id="user_infor">
                                                    <li><a href="" onClick={()=>{navigate("/myaccout")}}>Tài khoản của tôi</a></li>
                                                    <li><a href="" onClick={()=>{navigate("/order")}}>Đơn mua</a></li>
                                                    <li><a onClick={onClickLogOut} href="">Đăng xuất</a></li>

                                                </ul>

                                            </div>
                                        </li>
                                        :
                                        <>
                                            <li>
                                                <div className="ht-language-trigger"><span onClick={() => { navigate("/login") }}>Đăng nhập</span></div>
                                            </li>
                                            <li>
                                                <div className="ht-language-trigger"><span onClick={() => { navigate("/register") }}>Đăng kí</span></div>
                                            </li>
                                        </>
                                    }
                                    {/* Language Area End Here */}

                                </ul>

                            </div>
                        </div>
                        {/* Header Top Right Area End Here */}
                    </div>
                </div>
            </div>



        </>
    )
}

export default HeaderTop