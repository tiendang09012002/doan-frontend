import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import React from "react"
import { LOGIN_SUCCESS } from "../../../shared/constants/action-type"
import { apiLogin, apiLoginGoogle, getUser } from "../../../services/Api"
import { toast } from "react-toastify"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id")
    const [message, setMessage] = React.useState("")

    const [inputs, setInputs] = React.useState({})
    const onChangeInput = (e) => {
        setMessage("")
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    const onClickLogin = (e) => {
        if (inputs.email && inputs.password) {
            e.preventDefault()
            apiLogin(inputs)
                .then(({ data }) => {
                    if (data) {
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: data.data
                        })
                        navigate('/')
                    } 
                })
                .catch((error)=>{
                    toast.error("Tài khoản hoặc mật khẩu không chính xác !")
                    setMessage(<div className="alert alert-danger">Tài khoản hoặc mật khẩu không chính xác !</div>)

                })
        }
    }

    const loginByFacebook = (e) => {
        e.preventDefault()
        window.location.href = "http://localhost:8000/api/v1/auth/facebook"
    }
    const loginByGoogle = (e) => {
        e.preventDefault()
        window.location.href = "http://localhost:8000/api/auth/google"
    }
    React.useEffect(() => {
        if (id) {
            const user_id = id.split("@@")[0]
            console.log(user_id);
            getUser(user_id).then(({ data }) => {
                console.log(data);
                apiLogin({ email: data.data.email, password: id.split("@@")[1] })
                    .then(({ data }) => {
                        
                            navigate('/')
                            dispatch({
                                type: LOGIN_SUCCESS,
                                payload: data.data
                            })
                        
                    })
            })
        }
    }, [])
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Đăng nhập</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="page-section mb-60 mt-40">
                <div className="container">
                    <div className="row">
                        <div style={{ margin: "auto" }} className="col-sm-12 col-md-12 col-xs-12 col-lg-6 mb-30">
                            {/* Login Form s*/}
                            <form action="#">
                                {message}
                                <div className="login-form">
                                    <h4 className="login-title">Đăng nhập</h4>
                                    <div className="row">
                                        <div className="col-md-12 col-12 mb-20">
                                            <label>Email Address*</label>
                                            <input className="mb-0" onChange={onChangeInput} name="email" type="text" placeholder="Email Address" required />
                                        </div>
                                        <div className="col-12 mb-20">
                                            <label>Mật khẩu</label>
                                            <input className="mb-0" onChange={onChangeInput} name="password" type="password" placeholder="Password" required />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="check-box d-inline-block ml-0 ml-md-2 mt-10">
                                                <input type="checkbox" id="remember_me" />
                                                <Link to="/forgotpassword">Quên mật khẩu</Link>

                                            </div>
                                        </div>
                                        <div className="col-md-4 mt-10 mb-20 text-left text-md-right">
                                            <Link to="/register"> Đăng kí ngay!</Link>
                                        </div>
                                        <div className="col-md-12">
                                            <button onClick={onClickLogin} className="register-button mt-0">Đăng nhập</button>
                                        </div>
                                        <div className="footer-block col-12" style={{ display: 'flex', justifyContent: 'center' }}>
                                            <ul className="social-link">

                                                <li className="google-plus">
                                                    <a onClick={(e) => loginByGoogle(e)} href="https://www.plus.google.com/discover" data-toggle="tooltip" target="_blank" title data-original-title="Google Plus">
                                                        <i className="fa fa-google-plus" />
                                                    </a>
                                                </li>
                                                <li className="facebook">
                                                    <a onClick={(e) => loginByFacebook(e)} href="https://www.facebook.com/" data-toggle="tooltip" target="_blank" title data-original-title="Facebook">
                                                        <i className="fa fa-facebook" />
                                                    </a>
                                                </li>

                                            </ul>
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
export default Login