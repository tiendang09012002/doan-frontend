import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { apiChangePasswordNext } from "../../../services/Api";

const ChangePassword = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = React.useState({});
    const [message, setMessage] = React.useState("");
    const user = useSelector(({ Auth }) => Auth.user)


    const onChangeInputs = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    const onSubmitUpdate = (e) => {
        e.preventDefault()
        if (inputs.pwold && inputs.password && inputs.rePassword) {
            if (inputs.password === inputs.rePassword) {
                console.log(inputs);
                apiChangePasswordNext({ email: user.email, password: inputs.pwold, newPassword: inputs.password })
                    .then(({ data }) => {
                        if (data.success) {
                            setMessage(<div className="alert alert-success">Đổi mật khẩu thành công!</div>);
                            setTimeout(() => {
                                navigate("/myaccout")
                            }, 3000)
                        }else{
                            setMessage(<div className="alert alert-danger">Mật khẩu không chính xác!</div>);
                        }
                    })
            } else {
                setMessage(<div className="alert alert-danger">Mật khẩu nhập lại phải trùng nhau!</div>);
            }
        } else {
            setMessage(<div className="alert alert-danger">Vui lòng nhập đủ thông tin!</div>);
        }
    }
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Đổi mật khẩu</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="page-section mb-60 mt-40">
                <div className="container">
                    <div className="row">

                        <div style={{ margin: "auto" }} className="col-sm-12 col-md-12 col-lg-6 col-xs-12">
                            {message}
                            <form action="#">
                                <div className="login-form">
                                    <h4 className="login-title">Đổi mật khẩu</h4>
                                    <div className="row">
                                        <div className="col-md-12 mb-20">
                                            <label for="email">Email Address*</label>
                                            <input style={{ backgroundColor: "#ccc" }} disabled id="email" className="mb-0" type="email" value={user.email} name="email" placeholder="Email Address" />
                                        </div>
                                        <div className="col-md-12 mb-20">
                                            <label for="fullName">Mật khẩu</label>
                                            <input required onChange={onChangeInputs} id="fullName" className="mb-0" type="password" name="pwold" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label for="password">Mật khẩu mới</label>
                                            <input required onChange={onChangeInputs} id="password" className="mb-0" type="password" name="password" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label for="rePassword">Nhập lại mật khẩu mới</label>
                                            <input required onChange={onChangeInputs} id="rePassword" className="mb-0" type="password" name="rePassword" />
                                        </div>
                                        <div className="col-md-8 mt-10 mb-20">
                                            <Link to="/forgotpassword">Quên mật khẩu</Link>
                                        </div>
                                        <div className="col-12">
                                            <button onClick={onSubmitUpdate} style={{ cursor: "pointer" }} className="register-button mt-0">CẬP NHẬT</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword