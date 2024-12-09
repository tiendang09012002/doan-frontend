import { Link, useNavigate } from "react-router-dom";
import React from "react"
import { LOGIN_SUCCESS } from "../../../shared/constants/action-type";
import { useDispatch } from "react-redux";
import { createUser } from "../../../services/Api";
import { checkEmail } from "../../../shared/ultils";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [inputs, setInputs] = React.useState({});
    const [message, setMessage] = React.useState("");

    console.log(inputs)
    const submitCreateUser = (e) => {
        if (inputs.email && inputs.password && inputs.rePassword && inputs.fullName) {
            e.preventDefault();
            if (checkEmail(inputs.email)) {
                if (inputs.password === inputs.rePassword) {
                    const newData = { ...inputs }
                    console.log(newData)
                    delete newData.rePassword;
                    createUser(newData, {}).then(({ data }) => {

                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: data.data
                        })
                        navigate("/")
                    })
                        .catch(() => {
                            setMessage(<div className="alert alert-danger">Email này đã tồn tại!</div>)
                        })
                } else {
                    setMessage(<div className="alert alert-danger">Mật khẩu nhập lại phải trùng nhau!</div>);
                }
            } else {
                setMessage(<div className="alert alert-danger">Email không đúng định dạng!</div>);

            }
        }

    }
    const onChangeInput = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })

    }

    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Đăng kí</li>
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
                                    <h4 className="login-title">Đăng kí</h4>
                                    <div className="row">
                                        <div className="col-md-12 mb-20">
                                            <label for="fullName">Tên đầy đủ</label>
                                            <input required onChange={onChangeInput} id="fullName" className="mb-0" type="text" name="fullName" placeholder="Full Name" />
                                        </div>
                                        <div className="col-md-12 mb-20">
                                            <label for="email">Email Address*</label>
                                            <input required onChange={onChangeInput} id="email" className="mb-0" type="email" name="email" placeholder="Email Address" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label for="password">Mật khẩu</label>
                                            <input required onChange={onChangeInput} id="password" className="mb-0" type="password" name="password" placeholder="Password" />
                                        </div>
                                        <div className="col-md-6 mb-20">
                                            <label for="rePassword">Nhập lại mật khẩu</label>
                                            <input required onChange={onChangeInput} id="rePassword" className="mb-0" type="password" name="rePassword" placeholder="Confirm Password" />
                                        </div>
                                        <div className="col-md-8 mt-10 mb-20">
                                            <Link to="/login"> Bạn đã có tài khoản!</Link>
                                        </div>
                                        <div className="col-12">
                                            <button onClick={submitCreateUser} className="register-button mt-0">Đăng kí</button>
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

export default Register