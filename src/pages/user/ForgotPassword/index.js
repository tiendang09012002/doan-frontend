import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { checkCode, checkEmail } from "../../../shared/ultils";
import { apiChangePassword, apiGetCode } from "../../../services/Api";

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = React.useState({});
    const [message, setMessage] = React.useState("");
    const [btnCode, setBtnCode] = React.useState(false)
    const [count, setCount] = React.useState(60)
    const clearCount = React.useRef()
    const code = React.useRef()




    const onChangeInput = (e) => {
        setMessage("")
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })

    }

    const submitLayMa = (e) => {
        e.preventDefault();
        if (inputs.email && inputs.password && inputs.rePassword) {
            if (checkEmail(inputs.email)) {
                if (inputs.password === inputs.rePassword) {
                    apiGetCode({ email: inputs.email })
                        .then(({ data }) => {
                            code.current = data
                            setCount(60)
                            setBtnCode(!btnCode)
                            clearCount.current = setInterval(() => {
                                setCount(count => count - 1)
                            }, 1000)
                        })

                } else {
                    setMessage(<div className="alert alert-danger">Mật khẩu nhập lại phải trùng nhau!</div>);
                }
            } else {
                setMessage(<div className="alert alert-danger">Email không đúng định dạng!</div>);

            }
        } else {
            setMessage(<div className="alert alert-danger">Vui lòng nhập đủ thông tin!</div>);

        }

    }
    const submitUpdatePassword = (e) => {
        e.preventDefault()
        if (inputs.email && inputs.password && inputs.rePassword && inputs.ma) {
            if (checkEmail(inputs.email)) {
                if (inputs.password === inputs.rePassword) {
                    if (checkCode(inputs.ma)) {
                        if (inputs.email === code.current?.email && inputs.ma == code.current?.code) {
                            apiChangePassword({ email: inputs.email, password: inputs.password })
                                .then(({ data }) => {
                                    if (data.success) {
                                        setMessage(<div className="alert alert-success">Thiết lập lại mật khẩu thành công!</div>);
                                        setTimeout(()=>{
                                            navigate("/login")
                                        },3000)
                                    }else{
                                        setMessage(<div className="alert alert-success">Tài khoản không tồn tại!</div>);

                                    }
                                })
                        } else {
                            setMessage(<div className="alert alert-danger">Mã xác nhận không đúng!</div>);

                        }
                    } else {
                        setMessage(<div className="alert alert-danger">Mã xác nhận là số gồm 6 kí tự!</div>);

                    }
                } else {
                    setMessage(<div className="alert alert-danger">Mật khẩu nhập lại phải trùng nhau!</div>);
                }
            } else {
                setMessage(<div className="alert alert-danger">Email không đúng định dạng!</div>);

            }
        } else {
            setMessage(<div className="alert alert-danger">Vui lòng nhập đủ thông tin!</div>);
        }
    }
    React.useEffect(() => {
        if (count < 0) {
            setBtnCode(!btnCode)
            clearInterval(clearCount.current)
        }
    }, [count])


    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Quên mật khẩu</li>
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
                                    <h4 className="login-title">Đặt lại mật khẩu</h4>
                                    <div className="row">
                                        <div className="col-md-12 mb-20">
                                            <label for="email">Email Address*</label>
                                            <input required id="email" onChange={onChangeInput} className="mb-0" type="email" name="email" placeholder="Email Address" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label for="password">Mật khẩu mới</label>
                                            <input required id="password" onChange={onChangeInput} className="mb-0" type="password" name="password" placeholder="Password" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label for="rePassword">Nhập lại mật khẩu</label>
                                            <input required id="rePassword" onChange={onChangeInput} className="mb-0" type="password" name="rePassword" placeholder="Confirm Password" />
                                        </div>
                                        <div className="col-md-8 mb-20">
                                            <label for="fullName">Mã xác nhận</label>
                                            <div style={{ position: "relative" }}>
                                                <input id="fullName" onChange={onChangeInput} className="mb-0" type="text" name="ma" placeholder="Mã xác nhận ..." />
                                                {btnCode ? <button className="btn-forgotcount">
                                                    {count}</button> :
                                                    <button onClick={submitLayMa} className="btn-forgot">Lấy mã</button>}


                                            </div>

                                        </div>
                                        <div className="col-12">
                                            <button onClick={submitUpdatePassword} className="register-button mt-0">Đặt lại</button>
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

export default ForgotPassword