import { Link } from "react-router-dom"
import React from "react"
import { useSelector } from "react-redux"

const MyAccout = () => {
    const user = useSelector(({ Auth }) => Auth.user)
    

    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Tài khoản của tôi</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="contact-main-page mt-60 mb-40 mb-md-40 mb-sm-40 mb-xs-40">

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12" >
                            <h6>Tài Khoản Của Tôi</h6>
                            <p style={{ borderBottom: "1px solid #ccc", paddingBottom: 8 }}>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                        </div>
                        <div style={{ marginTop: 20 }} className="col-md-4 col-sm-12" >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }} className="avatar_profile">
                                <h5 style={{ marginBottom:10}}>{user.fullName}</h5>
                                <img style={{ width: 100, height: 100, borderRadius: "50%" }} src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lphihlglcmk5ee_tn" />
                                <input hidden type="file" id="chooseImg" />
                                <label style={{ padding: "2px 5px", border: "1px solid black", backgroundColor: "#ccc", margin: "10px 0" }}>Chọn ảnh</label>
                            </div>
                            <div>
                                <ul>
                                    <li style={{marginBottom:10}}><Link to="/changepassword">
                                    <svg width="20" height="20" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" ><path d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48" fill="#9B9B9B" fill-rule="evenodd"></path></svg>
                                        Đổi mật khẩu</Link></li>
                                    <li style={{marginBottom:10}}> <Link to="/order"><img style={{ width: 20, height: 20 }} src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" />Đơn mua</Link>
                                    </li>
                                    <li style={{marginBottom:10}}> <Link to="/zzz">
                                    <img style={{width:20,height:20}} src="https://down-vn.img.susercontent.com/file/e10a43b53ec8605f4829da5618e0717c"/>
                                        Thông báo</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div style={{ marginTop: 20 }} className="col-md-6 col-sm-12" >
                            <div className="infor_profile">
                                <div>
                                    <label>Tên đầy đủ</label>
                                    <input type="text" value={user.fullName} />
                                </div>
                                <div style={{ margin: "20px 0" }}>
                                    <label>Email</label>
                                    <input type="text" value={user.email} />
                                </div>
                                <button style={{ padding: "5px 15px", margin: "20px 0", backgroundColor: "#fed700", color: "black", cursor: "pointer" }}>LƯU</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default MyAccout