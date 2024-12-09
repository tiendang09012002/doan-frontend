import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../../services/Api";
const CreateUser = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = React.useState({});
    const [message, setMessage] = React.useState("");
    const onChangeInput = (e) => {
        try {
            setMessage("");
            const { name, value } = e.target;
            return setInputs({ ...inputs, [name]: value });
        } catch (error) {
            return setMessage(error.message);
        }
    }

    const submitCreateUser = (e) => {
        e.preventDefault();
        try {
            if (inputs.email && inputs.password && inputs.rePassword && inputs.fullName) {
                
                if (inputs.password !== inputs.rePassword) {
                    return setMessage("Mật khẩu không khớp");
                }
                const newData = { ...inputs }
                delete newData.rePassword;
                createUser(newData, {}).then(({ data }) => {
                    if (data.status) {
                        return navigate("/users")
                    }
                }).catch(err => {
                    if (err.response && err.response.data) {
                        return setMessage(err.response.data.message);
                    } else {
                        return setMessage("Có lỗi xảy ra");
                    }
                })
            }
        } catch (error) {
            return setMessage(error.message);
        }
    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/users">Quản lý thành viên</Link></li>
                        <li className="active">Thêm thành viên</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm thành viên</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    {message ? <div className="alert alert-danger">{message}</div> : ""}

                                    <form role="form" method="post">
                                        <div className="form-group">
                                            <label>Họ &amp; Tên</label>
                                            <input onChange={onChangeInput} value={inputs.fullName || ""} name="fullName" required className="form-control" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input onChange={onChangeInput} value={inputs.email || ""} name="email" required type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input onChange={onChangeInput} value={inputs.phone || ""} name="phone" required type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Mật khẩu</label>
                                            <input onChange={onChangeInput} value={inputs.password || ""} name="password" required type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Nhập lại mật khẩu</label>
                                            <input onChange={onChangeInput} value={inputs.rePassword || ""} name="rePassword" required type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Quyền</label>
                                            <select onChange={onChangeInput} name="isAdmin" className="form-control">
                                                <option value={false}>Member</option>
                                                <option value={true}>Admin</option>
                                            </select>
                                        </div>
                                        <button name="sbm" onClick={submitCreateUser} type="submit" className="btn btn-success">Thêm mới</button>
                                        <button type="reset" className="btn btn-default">Làm mới</button>
                                    </form></div>
                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>{/* /.row */}
            </div>
        </>
    )
}

export default CreateUser;